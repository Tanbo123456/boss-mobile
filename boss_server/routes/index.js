var express = require('express');
var router = express.Router(); // 路由模块
const md5 = require('blueimp-md5') // 加密模块

const {UserModel,ChatModel} = require('../db/db_boss'); // 数据库boss_db中users集合的模型model,其实例为文档

// 注册用户的路由
router.post('/register', (req, res) => {
  const { username, password, type } = req.body
  if (username === 'admin') {
    //admin用户已存在
    res.send({ code: 1, msg: '用户已存在！' })
  } else { //数据库查询用户
    UserModel.findOne({ username },{password:0}, function (err, user) {
      // 判断用户是否存在
      if (user) {
        // 存在
        res.send({code:1,msg:'用户已存在！'})
      } else {
        //不存在
        // 保存用户
        new UserModel({username,password:md5(password),type}).save((err,user)=>{
          // 生成cookie（userid:user._id）
          res.cookie('userid',user._id,{maxAge:1000*60*60*24})
          // 返回数据
          res.send({code:0,data:{_id:user._id,username,type}})
        })

      }
    })

  }
})

// 登录用户的路由
router.post('/login',(req,res)=>{
  const {username,password} = req.body
  //数据库中查找用户 username,password,结果过滤密码password
  UserModel.findOne({username,password:md5(password)},{password:0},(err,user)=>{
    if (!user) {
      res.send({code:1,msg:'用户名或密码错误'})
    }else{
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }
  })

})

// 修改用户的路由
router.post('/update',(req,res)=>{
    const userid = req.cookies.userid
    if (!userid) {
      return res.send({code:1,msg:'请先登录'})
    }
    UserModel.findByIdAndUpdate({_id:userid},req.body,function(err,result){
      if (!err) {
        const {_id,username,type} = result
        const data = Object.assign(req.body,{_id,username,type})
        res.send({code:0,data})
      }else{
        res.send({code:1,msg:'更新失败'})
      }
    })
})

// 获取用户主列表页面bossmine，employermine
router.get('/user',(req,res)=>{
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findOne({_id:userid},{password:0},(err,result)=>{
    if (!err) {
      return res.send({code:0,data:result})
    }else{
      return res.send({code:1,msg:'查询用户失败'})
    }
  })
})

// 获取用户列表
router.get('/userlist',(req,res)=>{
  const {type}= req.query;
  
  UserModel.find({type:type},{password:0},(err,result)=>{
    if (!err) {
      return res.send({code:0,data:result})
    }else{
      return res.send({code:1,msg:'查询用户列表失败'})
    }
  })
})



// 聊天开始
// 获取用户全部的聊天记录
router.get('/msglist',(req,res)=>{
  const userid = req.cookies.userid
  // 获取用户user 文档数组
  UserModel.find(function(err1,result){
    const users={}
    result.forEach(doc=>{
      users[doc._id]={username:doc.username,header:doc.header}
    })
    // 把查询的聊天信息放到回调函数里，
    // 查询条件，过滤条件，回调函数
    ChatModel.find({'$or':[{from:userid},{to:userid}]},function(err2,chatMsgs){
      if (!err2) {
        res.send({code:0,data:{users,chatMsgs}})
      } else {
        res.send({code:1,msg:'消息获取失败'})
      }
    })
  })

})

// 更改消息阅读状态
router.post('/readmsg',(req,res)=>{
  const from = req.body.from
  const to = req.cookies.userid
  // 更新数据库chat集合里的数据
  // 查询条件、更新指定的数据对象、是否1次更新多条默认只更新一条、回调函数
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
    if (!err) {
      console.log('读信息',doc);
      res.send({code:0,data:doc.nModified})
    } else {
      res.send({code:1,msg:'读消息失败'})
    }
  })
})

module.exports = router;
