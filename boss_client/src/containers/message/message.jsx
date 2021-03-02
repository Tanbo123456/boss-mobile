import React, { Component } from 'react'
import { connect } from "react-redux";
import { List, Badge } from 'antd-mobile';

import { readMsg } from "../../redux/actions";


const Item = List.Item;
const Brief = Item.Brief;

// 得到所有聊天最后一条msg组成的数组，渲染[msgb,msgb]
function getLastMsgList(meId, chatMsgs) {
    // 根据chatId对所有信息进行分组{chatId：lastMsg}
    const Messages = {} // 根据chatId得到的分组对象
    chatMsgs.forEach(msg => {
        msg.unReadCount = 0

        const chatId = msg.chat_id
        const lastMsg = Messages[chatId] // 获取已保存的chatId；lastMsg
        if (!lastMsg) {
            // 不存在lastMsg,将msg保存为lastmsg
            Messages[chatId] = msg
            //赋值unReadCount
            if (msg.to === meId && !msg.read) {
                msg.unReadCount = 1
            }
        } else {
            // 存在lastMsg 根据创建时间进行替换
            if (msg.create_time > lastMsg.create_time) {
                Messages[chatId] = msg
                msg.unReadCount = lastMsg.unReadCount
            }
            if (msg.to === meId && !msg.read) {
                msg.unReadCount++
            }
        }

    });
    // 得到后一个msg组成新数组
    const lastMsgList = Object.values(Messages)

    // 根据create_time进行排序
    lastMsgList.sort((m1, m2) => {
        return m2.create_time - m1.create_time
    })
    return lastMsgList
}

class Message extends Component {
    hanleGoChat=(targetId)=>{
        // this.props.readMsg(targetId)
        this.props.history.push(`/chat/${targetId}`)
    }
    render() {
        const { user, chat } = this.props
        const meId = user._id
        const { users, chatMsgs } = chat

        // 获取lastMsgList数组
        // console.log('render message');
        const lastMsgList = getLastMsgList(meId, chatMsgs)
        // console.log(lastMsgList);
        return (
            <div>
                <List>
                    {
                        lastMsgList.map(msg => {
                            const targetId = msg.to === meId ? msg.from : msg.to
                            const targetUser = users[targetId]
                            const avatar = require(`../../assets/images/${targetUser.header ? targetUser.header : '头像1'}.png`).default
                            return (
                                <Item
                                    key={msg._id}
                                    arrow="horizontal"
                                    extra={<Badge text={msg.unReadCount} />}
                                    onClick={() =>this.hanleGoChat(targetId)}
                                    thumb={avatar}
                                >
                                    {targetUser.username}
                                    <Brief>{msg.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {readMsg}
)(Message)