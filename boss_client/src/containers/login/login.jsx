import React, { Component } from 'react'
import { Button, List, InputItem, WingBlank, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


import Header from '../../components/header/header';
import Logo from "../../components/logo/logo";
import { login } from "../../redux/actions";

class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    handleLogin = async () => {
        this.props.login(this.state)
        this.setState({
            username: '',
            password: ''
        })
    }
    render() {
        const user = this.props.user
        // 状态设置成功，跳转页面到user.typemine页面
        if (user.username&&user.type) {
            const url = `/${user.type}main`
            return <Redirect to={url} />
            // console.log('cc');
        }
        const { username, password } = this.state
        return (
            <div style={{paddingTop:'7vh'}}>
                <Header />
                <Logo />
                <WingBlank>
                    <List>
                        {/* <WhiteSpace /> */}
                        <InputItem
                            value={username}
                            onChange={value => this.handleChange('username', value)}
                            clear
                        >用户名：</InputItem>
                        {/* <WhiteSpace /> */}
                        <InputItem
                            value={password}
                            type='password'
                            onChange={value => this.handleChange('password', value)}
                        >密&nbsp;&nbsp;&nbsp;码：</InputItem>

                        <WhiteSpace />
                        <WingBlank>
                            <Button type='primary' onClick={this.handleLogin}>登录</Button>
                        </WingBlank>
                        <WhiteSpace />
                        <WingBlank>
                            <Button onClick={() => this.props.history.replace('/register')}>还没有账户</Button>
                        </WingBlank>
                    </List>
                </WingBlank>
            </div>
        )
    }
}


export default connect(
    state => ({ user: state.user }),
    { login }
)(Login)