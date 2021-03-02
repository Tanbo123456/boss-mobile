import React, { Component } from 'react'
import { TabBar} from 'antd-mobile';
import { withRouter } from "react-router-dom";


class NavFooter extends Component {
    constructor(props) {
        super(props)
        this.navList = props.navList.filter(nav=>!nav.hide) || []
        this.state = {
            hidden:this.navList.length>0
        }
    }
    render() {
        
        const unReadCount = this.props.unReadCount
        const {pathname} = this.props.location
        return (
            <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
                <TabBar
                    barTintColor='#FF99CC'
                    tabBarPosition='bottom'
                    hidden={!this.state.hidden}
                >
                    {this.navList.map(nav => 
                        <TabBar.Item
                            icon={{uri:require(`../../assets/nav/${nav.icon}.png`).default}}
                            selectedIcon={{uri:require(`../../assets/nav/${nav.icon}-selected.png`).default}}
                            title={nav.text}
                            key={nav.path}
                            selected={pathname === nav.path}
                            badge={nav.path==='/message'?unReadCount:0}
                            onPress={() => {
                                this.props.history.replace(nav.path)
                            }}
                        >
                        </TabBar.Item>
                    )}
                </TabBar>
            </div>
        )
    }
}

export default withRouter(NavFooter)
