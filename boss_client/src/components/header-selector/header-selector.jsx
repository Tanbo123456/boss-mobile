import React, { Component } from 'react'
import { Grid } from 'antd-mobile';


import './header-select.less'

// const image = require('../../assets/images/头像1.png').default;

export default class HeaderSelector extends Component {
    state = {
        header:''
    }
    constructor(props) {
        super(props)
        // 初始化头像列表
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            const text = `头像${i + 1}`
            this.headerList.push({ text, icon:require(`../../assets/images/${text}.png`).default}) // 需要require('xxx').default
        }
    }
    handleClick = (el, index) => {
        this.props.setHeader(el.text)
        this.setState({ header: el.icon})
    }
    render() {
        return (
            <div>
                <p className='header-title'>&nbsp;&nbsp;&nbsp;请选择头像:&nbsp;&nbsp;<span><img src={this.state.header} alt='header'/></span></p>
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
                
            </div>
        )
    }
}
