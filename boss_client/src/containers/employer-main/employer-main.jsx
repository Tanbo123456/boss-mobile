import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import QueueAnim from "rc-queue-anim";

import { reqUserList } from "../../api/index";

class EmployerMain extends Component {
    state = {
        userList: []
    }

    getUserList = async () => {
        const result = await reqUserList('boss')
        // console.log(result);
        const data = result.data
        if (data.code === 0) {
            this.setState({ userList: data.data })
        }

    }
    componentDidMount() {
        this.getUserList()

    }
    render() {
        const { userList } = this.state
        return (
            <WingBlank>
                <QueueAnim type='scale' delay={100}>
                    {
                        userList.map(user => {
                            const header = user.header ? user.header : '头像1'
                            return (
                                <div key={user._id}>
                                    <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}
                                    >
                                        <Card.Header
                                            thumb={require(`../../assets/images/${header}.png`).default}
                                            extra={<span>{user.username}</span>}
                                        />
                                        <Card.Body>
                                            <div>职位：{user.post}</div>
                                            <div>简介：{user.info}</div>
                                            <div>薪水：{user.salary}</div>
                                            <div>公司：{user.company}</div>
                                        </Card.Body>
                                    </Card>
                                    <WhiteSpace />
                                </div>
                            )
                        })
                    }
                </QueueAnim>

            </WingBlank>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(EmployerMain)