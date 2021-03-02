import React, { Component } from 'react'
import { Result, List, WhiteSpace, Button, Modal, WingBlank } from 'antd-mobile';
import { connect } from "react-redux";
import Cookies from "js-cookie";

import { resetUser } from "../../redux/actions";


const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class Personal extends Component {

    loginOut = () => {
        // console.log('ttt');
        alert('退出', 'Are you sure?', [
            { text: '取消', onPress: () => { } },
            {
                text: '确定', onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            },
        ])
    }
    render() {
        const { user } = this.props
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${user.header}.png`).default} style={{ height: 60, width: 60 }} alt="" />}
                    title={user.username}
                    message={user.company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{user.post}</Brief>
                        <Brief>简介：{user.info}</Brief>
                        {user.salary ? <Brief>薪水：{user.salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button type='primary'
                        onClick={this.loginOut}
                    >退出登录</Button>
                </WingBlank>

            </div>
        )
    }
}


export default connect(
    state => ({ user: state.user }),
    { resetUser }
)(Personal)
