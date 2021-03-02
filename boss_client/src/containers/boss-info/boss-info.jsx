import React, { Component } from 'react'
import { Button, List, InputItem, WingBlank, WhiteSpace, TextareaItem } from "antd-mobile";
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

import Header from "../../components/header/header";
import HeaderSelector from "../../components/header-selector/header-selector";
import { updateUser } from "../../redux/actions";


class BossInfo extends Component {
    state = {
        header: '',
        info: '',
        post: '',
        company: '',
        salary: '',
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
    handleSave = () => {
        this.props.updateUser(this.state)
        this.props.history.replace('/bossmain')
    }
    render() {
        const {info, post, company, salary } = this.state
        // 如果用户信息更新完毕，跳转到主页面
        if (this.props.user.header) {
            return <Redirect to='/bossmine'/>
        }
        return (
            <div>
                <Header />
                <HeaderSelector setHeader={this.setHeader}/>
                <List>
                    
                    <InputItem
                        value={post}
                        onChange={value => this.handleChange('post', value)}
                        clear
                    >职位名称：</InputItem>
                    <WhiteSpace />
                    <InputItem
                        value={company}
                        onChange={value => this.handleChange('company', value)}
                        clear
                    >公司名称：</InputItem>
                    <WhiteSpace />
                    <InputItem
                        value={salary}
                        onChange={value => this.handleChange('salary', value)}
                        clear
                    >工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资&nbsp;：</InputItem>
                    <WhiteSpace />
                    <TextareaItem
                        title="职位简介："
                        autoHeight
                        value={info}
                        onChange={value => this.handleChange('info', value)}
                        clear
                    />
                    <WhiteSpace />
                    <WingBlank>
                        <Button type='primary' onClick={this.handleSave}>保存</Button>
                    </WingBlank>
                </List>

            </div>
        )
    }
}


export default connect(
    state=>({user:state.user}),
    {updateUser}
)(BossInfo)