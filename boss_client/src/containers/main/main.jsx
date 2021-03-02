import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { getUser } from '../../redux/actions'

import BossInfo from "../boss-info/boss-info";
import EmployerInfo from "../employer-info/employer-info";
import BossMain from "../boss-main/boss-main";
import EmployerMain from "../employer-main/employer-main";
import Message from "../message/message";
import Personal from "../personal/personal";
import Header from "../../components/header/header";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";


class Main extends Component {

    navList = [
        {
            path: '/bossmain', // 路由路径
            component: BossMain,
            title: 'Employer 列表',
            icon: 'dashen',
            text: '应聘者',
        },
        {
            path: '/employermain', // 路由路径
            component: EmployerMain,
            title: 'Boss 列表',
            icon: 'laoban',
            text: ' 老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: ' 消息列表',
            icon: 'message',
            text: ' 消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '我的',
        }
    ]
    componentDidMount() {
        //记录用户cookie的userid,如果存在，则获取用户信息
        const userid = Cookies.get('userid')
        const user = this.props.user
        if (userid && !user._id) {
            this.props.getUser()
        }
    }
    render() {
        let pathname = this.props.history.location.pathname
        const userid = Cookies.get('userid')
        if (!userid) {
            return <Redirect to='/login' />
        }
        const user = this.props.user

        if (!user._id) {
            return null
        } else {
            if (pathname === '/') {
                pathname = `/${user.type}main`
                return <Redirect to={pathname} />
            }
        }
        // 根据路由判断头部信息，传给Header，以及判断nav的隐藏与否
        if (user.type==='boss') {
            this.navList[1].hide=true
        }else{
            this.navList[0].hide=true
        }

        const CurrentNav = this.navList.find(v=>v.path===pathname)

        // 得到未读消息数目
        const unReadCount = this.props.unReadCount
        return (
            <div style={{padding:'7vh 0'}}>
                {CurrentNav?<Header title={CurrentNav.title} />:null} 
                <Switch>
                    <Route path='/bossinfo' component={BossInfo} />
                    <Route path='/employerinfo' component={EmployerInfo} />
                    <Route path='/bossmain' component={BossMain} />
                    <Route path='/employermain' component={EmployerMain} />
                    <Route path='/message' component={Message} />
                    <Route path='/personal' component={Personal} />
                    <Route path='/chat/:userid' component={Chat}/>
                </Switch>
                {CurrentNav?<NavFooter unReadCount={unReadCount} navList={this.navList}/>:null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user,unReadCount:state.chat.unReadCount }),
    { getUser }
)(Main)
