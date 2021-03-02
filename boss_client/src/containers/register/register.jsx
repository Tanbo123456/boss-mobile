import React, { Component } from 'react'
import { Button, List, InputItem, Radio, WingBlank, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "../../components/header/header";
import Logo from "../../components/logo/logo";
import { register } from "../../redux/actions";


const { Item } = List

class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'employer'
    }
    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    handleRegister = () => {
        this.props.register(this.state)
        this.setState({
            username: '',
            password: '',
            password2: '',
            type: ''
        })
        // this.props.history
    }
    render() {
        const user = this.props.user
        if (user.username&&user.type) {
            const info_path = `/${user.type}info` 
            return <Redirect to={info_path}/>
        }
        const { username, password, password2} = this.state
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
                        {/* <WhiteSpace /> */}
                        <InputItem
                            value={password2}
                            type='password'
                            onChange={value => this.handleChange('password2', value)}
                        >确认密码：</InputItem>
                        {/* <WhiteSpace /> */}
                        <Item>
                            <span style={{ marginRight: '10px' }}>用户类型：</span>
                            <Radio
                                checked={this.state.type === 'employer'}
                                onChange={() => this.handleChange('type', 'employer')}

                            >求职者</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}
                            >老板</Radio>
                        </Item>
                        <WhiteSpace />
                        <WingBlank>
                            <Button type='primary' onClick={this.handleRegister}>注册</Button>
                            {/* <Button type='primary' onClick={()=>this.setState({username:''})}>注册</Button> */}
                        </WingBlank>
                        <WhiteSpace />
                        <WingBlank>
                            <Button onClick={() => this.props.history.replace('/login')}>已有账户</Button>
                        </WingBlank>
                    </List>

                </WingBlank>

            </div>
        )
    }
}

export default connect(
    // state=>({user:state.user}),
    state => ({user:state.user}),
    { register }
)(Register)
