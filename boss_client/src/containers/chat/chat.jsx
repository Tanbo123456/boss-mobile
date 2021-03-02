import React, { PureComponent } from 'react'
import { NavBar, List, InputItem, Icon } from 'antd-mobile'
import { connect } from "react-redux";

// import Header from "../../components/header/header";
import { sendMsg, readMsg } from "../../redux/actions"; // {from,to,content}



const Item = List.Item
class Chat extends PureComponent {
    state = {
        content: ''
    }

    handleSendMsg = () => {
        const { content } = this.state
        const to = this.props.match.params.userid
        const from = this.props.user._id
        // console.log(from, to, content);
        this.props.sendMsg({ from, to, content })

        this.setState({ content: '' })
    }
    componentDidMount() {
        // 初始化消息列表滑到底部
        window.scrollTo(0, document.body.scrollHeight)
        this.props.readMsg(this.props.match.params.userid)

    }
    componentDidUpdate() {
        // 更新消息时 消息列表滑到底部
        window.scrollTo(0, document.body.scrollHeight)
        console.log('更新');
        // 
    }
    componentWillUnmount() {
        this.props.readMsg(this.props.match.params.userid)
    }
    render() {
        const { content } = this.state
        const { user, chat } = this.props
        const targetid = this.props.match.params.userid
        const { users, chatMsgs } = chat
        if (!users[targetid]) {
            return null
        }

        // 定义chatId from_to to_from
        // 根据chatId过滤chatMsgs里面的消息
        const meid = user._id
        const chatId = [meid, targetid].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetIcon = require(`../../assets/images/${users[targetid].header ? users[targetid].header : '头像1'}.png`).default
        const targetName = users[targetid] ? users[targetid].username : null
        return (
            <div id='chat-page'>
                <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 999 }}>
                    <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                        mode="dark"
                    >{targetName}</NavBar>
                </div>
                <List>
                   
                        {msgs.map(msg => {
                            if (msg.to === meid) {
                                return (
                                    <Item
                                        key={msg._id}
                                        thumb={targetIcon}
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            } else {
                                return (
                                    <Item
                                        key={msg._id}
                                        className='chat-me'
                                        extra=' 我'
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })}
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder=" 请输入"
                        value={content}
                        onChange={value => this.setState({ content: value })}
                        onExtraClick={this.handleSendMsg}
                        extra={
                            <span>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        chat: state.chat
    }),
    { sendMsg, readMsg }
)(Chat)