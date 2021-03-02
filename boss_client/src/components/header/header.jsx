import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';


export default class Header extends Component {
    render() {
        const title = this.props.title
        return (
            <div style={{ position: 'fixed', width: '100%', top: 0 ,zIndex:999}}>
                <NavBar
                    mode="dark"
                >{title ? title : 'Boss 直 聘'}</NavBar>
            </div>
        )
    }
}
