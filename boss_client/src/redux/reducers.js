import { combineReducers } from "redux";

import { AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, RECEIVE_MSG_LIST, RECEIVE_MSG,MSG_READ } from "./action-type";

const initUser = {
    username: '',
    type: ''
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return action.data
        case ERROR_MSG:
            return { ...initUser, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}


const initChatMsgs = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
// 消息列表
function chat(state = initChatMsgs, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs,userid } = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((pre,msg)=>{
                    return pre+(!msg.read&&msg.to===userid?1:0)
                },0) // 别人发给我的未读消息
            }
        case RECEIVE_MSG:
            const {msg,isToMe} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, msg],
                unReadCount: state.unReadCount+(!msg.read&&isToMe?1:0)
            }
        case MSG_READ:
            const {from,to,count} = action.data
            // console.log(from,to,count);
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg=>{
                    if (msg.from===from&&msg.to===to&&!msg.read) {
                        // console.log('read true');
                        return {...msg,read:true}
                        
                    } else {
                        // console.log('read false');
                        return msg
                       
                    }
                }),
                unReadCount: state.unReadCount-count
            }
        default:
            return state;
    }
}

export default combineReducers({
    user,
    chat
})