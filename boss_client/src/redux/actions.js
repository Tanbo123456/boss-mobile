// 封装actions creater的模块
import { Toast} from 'antd-mobile' 
// 引入socket.io
import io from "socket.io-client"; //必须是npm install socket.io-client@2.2.0 -S版本才行,server端也是

import { reqRegister,reqLogin,reqUpdate,reqUser,reqChatMsgList,reqReadMsg} from "../api/index";
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER, RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from "./action-type";

// 认证成功
const authSuccess = (user)=>({type:AUTH_SUCCESS,data:user}) 
// 认证失败
const errorMsg = (msg)=>{
    Toast.fail(`${msg}`, 1) 
    return{type:ERROR_MSG,data:msg} 
}

// 更新用户
const receiveUser = (user)=>({type:RECEIVE_USER,data:user})
// 重置用户
export const resetUser = (msg)=>({type:RESET_USER,data:msg})

// 获取消息列表
export const receiveMsgList = ({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
// 实时获取消息
export const receiveMsg = (msg,isToMe)=>({type:RECEIVE_MSG,data:{msg,isToMe}})
// 阅读消息
const msgRead = ({from,to,count})=>({type:MSG_READ,data:{from,to,count}})

// 给io绑定初始化函数
const initIO = function (dispatch,userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:8080') // 连接server
        console.log('连接上服务器端')
        io.socket.on('server2client',(msg)=>{
            // 过滤消息是否与本人有关,有关的话则触发redux管理接收的消息状态
            // console.log(111);
            if (msg.from===userid || msg.to===userid) {
                dispatch(receiveMsg(msg,msg.to===userid))
            }
        })
    }
}

// 异步请求注册的函数
export function register({username,password,password2,type}){
    if (!username||!password||!type) {
        // 必须有
        return errorMsg('用户名密码类型必须输入')
    }
    if (password!==password2) {
        // 验证密码
        return errorMsg('密码和确认密码不同')
    }
    return async dispatch=>{
        const response =await reqRegister({username,password,type})
        const result = response.data
        if (result.code===0) {
            // 响应成功
            const {username,type,_id} = result.data
            dispatch(authSuccess({username,type,_id}))
            getMsgList(dispatch,_id)
        }else{ 
            // 响应失败
            dispatch(errorMsg(result.msg))
        }

    }
}
// 异步请求登录
export function login({username,password}){
    if (!username||!password) {
        return errorMsg('请输入用户名和密码')
    }
    return async dispatch=>{
        const response = await reqLogin({username,password})
        const result = response.data
        if (result.code===0) {
            //请求登录成功
            dispatch(authSuccess(result.data))
            getMsgList(dispatch,result.data._id)
        } else {
            // 请求登录失败
            dispatch(errorMsg(result.msg))
        }

    }
}

// 更新用户
export function updateUser(user){
    return async dispatch=>{
        const result = await reqUpdate(user)
        const data = result.data
        if (data.code===0) {
            // 请求成功
            dispatch(receiveUser(data.data))
        }
    }
}
// 根据cookie.userid获取用户,自动登录
export function getUser(){
    return async dispatch=>{
        const response = await reqUser()
        const result = response.data
        if (result.code===0) {
            dispatch(receiveUser(result.data))
            getMsgList(dispatch,result.data._id)
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 接收用户所有相关的消息
// 时机：登录，注册，自动登录（cookie）
async function getMsgList(dispatch,userid) {
    initIO(dispatch,userid)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code===0) { 
        const {users,chatMsgs} = result.data
        // 分发用户消息里列表
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}

// 发送消息
export function sendMsg({from,to,content}) {
    return async dispatch=>{
        // 触发发送消息
        io.socket.emit('client2server',{from,to,content})
    }
}

export function readMsg(targetId) {
    return async (dispatch,getState)=>{
        const response = await reqReadMsg(targetId)
        const result = response.data
        if (result.code===0) {
            const count = result.data
            const from = targetId
            const to = getState().user._id
            dispatch(msgRead({from,to,count}))
        }
    }
}