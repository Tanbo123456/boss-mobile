// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库 (URL 只有数据库是变化的 )
mongoose.connect('mongodb://localhost:27017/boss_db',{ useNewUrlParser: true , useUnifiedTopology: true })

// 一、创建用户的表，集合模型
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听 ( 用来提示连接成功 
conn.on('connected',()=>{
    console.log('连接数据库成功'); 
})

// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema( 描述文档结构 )
const userSchema =mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true}, // 类型employer，boss
    header:{type:String},// 头像名称
    post:{type:String},// 职位
    info:{type:String},// 个人或者职位简介
    company:{type:String}, // 公司名称
    salary:{type:String} // 薪水
})
// 2.2. 定义 Model( 与集合对应 , 可以操作集合 
const UserModel = mongoose.model('user',userSchema)



// 二、创建聊天记录的表，集合的模型

// 定义集合力文档的规范
const chatSchema =mongoose.Schema({
    from:{type:String,required:true}, // 来自谁
    to:{type:String,required:true}, // 发给谁
    chat_id:{type:String,required:true}, // from+to
    content:{type:String,required:true}, // 信息内容
    read:{type:Boolean,default: false}, // 是否已读
    create_time:{type:Number,required:true}, // 消息记录时间
})

// 集合的模型
const ChatModel = mongoose.model('chat',chatSchema)




// 将usermodel暴露出去 
exports.UserModel = UserModel

// 将chatModel暴露出去
exports.ChatModel = ChatModel