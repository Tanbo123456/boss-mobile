module.exports = function(server){
    // 引入消息model
    const {ChatModel}= require('../db/db_boss')
    // 获取io对象
    const io = require('socket.io')(server)
    // io.listen(8000)
    // 绑定监听客户端的连接
    io.on('connection',function(socket){ // socket为连接上的连接对象
        console.log('有客户端连接io');
        // 绑定监听，接收客户端的数据
        socket.on('client2server',function ({from,to,content}) {
            console.log('client2server',{from,to,content});
            // 将数据保存到数据库
            // 准备chatMsg数据对象
            const chat_id = [from,to].sort().join('_')
            const create_time = Date.now()
            const chatdoc = new ChatModel({from,to,chat_id,content,create_time})
            chatdoc.save(function (err,chatMsg) {
                if (!err) {
                    io.emit('server2client',chatMsg)
                    console.log('server2client',chatMsg);
                }
            })
        })
    })
}