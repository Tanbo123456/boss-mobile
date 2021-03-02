# 源码项目说明:
	boss_client: 前台项目
	boss_server: 后台项目
	

# react项目-boss_client的运行说明
## 1. 准备
	1) 确保安装了node环境
		查看是否已经安装: node -v

	2) 确保安装了mongodb, 并启动了对应的服务
		查看是否安装并启动了服务: 右键-->任务管理器-->服务-->MongoDB
		
	
## 2. 启动后台应用
	1). 进入boss_client
	2). 执行命令: npm start

## 3. 启动前台应用并访问
	1). 进入boss_server
	2). 执行命令: npm start


# 项目描述
### 此项目为前后台分离的招聘类SPA项目，包括前端应用和后端应用

## 1. 前端：使用react全家桶+antd_mobile+webpack等技术实现
### 两个登录入口 boss、employer
	1） 登录、注册页面
	2） 个人中心、消息列表、boss列表/employer列表
	3） 聊天页面（基于socket.io实现）



## 2. 后端：使用NodeJS+express+MongoDB+socket.io等技术实现
### 配置的API接口：
	1） 注册
	2） 登录
	3） 更新用户信息
	4） 获取当前用户信息（基于cookie实现自动登录）
	5） 获取用户列表
	6） 获取当前用户的聊天消息列表
	7） 修改指定消息为已读

### 注意：（踩过的坑）
	1） socket.io务必使用2.x版本！！！3.x版本存在跨域问题
	2） 前端应用动态导入图片等资源的时候使用require（img）.default方式获取，否则报错，显示会[object Module]
	原因：由file-loader版本过高引发的兼容问题，esModule选项已在4.3.0版本的文件加载器中引入，而在5.0.0版本中，默认情况下已将其设置为true。

