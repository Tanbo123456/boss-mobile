import ajax from "./ajax";

// 请求注册
export const reqRegister = (user)=>ajax('/register',user,'POST')

// 请求登录
export const reqLogin =(user)=>ajax('/login',user,'POST')

// 修改用户信息
export const reqUpdate=(user)=>ajax('/update',user,'POST') 

// 获取用户
export const reqUser = ()=>ajax('/user')

// 获取用户列表
export const reqUserList=(type)=>ajax('/userlist',{type},'GET')


// 获取消息列表
export const reqChatMsgList = ()=>ajax('/msglist')

// 标识查看了指定用户发送给我的聊天信息
export const reqReadMsg = (from)=>ajax('/readmsg',{from},'POST')