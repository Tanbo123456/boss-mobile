import React, { Component } from 'react'
import { Button, List, InputItem, WingBlank, WhiteSpace,TextareaItem } from "antd-mobile";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

import Header from "../../components/header/header";
import HeaderSelector from "../../components/header-selector/header-selector";
import { updateUser } from "../../redux/actions";


class EmployerInfo extends Component {
    state = {
        header: '',
        info: '',
        post: ''
    }
    handleChange = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    // 请求修改
    setHeader=(text)=>{
        this.setState({
            header:text
        })
    }
    handleSave=()=>{
        this.props.updateUser(this.state)
        this.props.history.replace('/employermain')
    }
    render() {
        const { info, post } = this.state
        if (this.props.user.header) {
            return <Redirect to='/employermain'/>
        }
        return (
            <div>
                <Header />
                <HeaderSelector setHeader={this.setHeader}/>
                <List>
                    {/* <WhiteSpace /> */}
                    <InputItem
                        value={post}
                        onChange={value => this.handleChange('post', value)}
                        clear
                    >求职岗位：</InputItem>
                    <WhiteSpace />
                    <TextareaItem
                        title="个人介绍："
                        autoHeight
                        value={info}
                        onChange={value => this.handleChange('info', value)}
                        clear
                    />
                    <WhiteSpace />
                    <WingBlank>
                        <Button type='primary' onClick={this.handleSave}>保存</Button>
                        {/* <Button type='primary' onClick={()=>this.setState({username:''})}>注册</Button> */}
                    </WingBlank>
                </List>

            </div>
        )
    }
}


export default connect(
    state=>({user:state.user}),
    {updateUser}
)(EmployerInfo)