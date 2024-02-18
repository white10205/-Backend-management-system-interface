const express = require('express');
const app = express();
//导入路由
const userRouter = require('./router/user');
const userinfoRouter = require('./router/userinfo');
const artCateRouter = require('./router/artcate');
const articleRouter = require('./router/article')

//解决跨域问题
const cors = require('cors')
const joi = require('joi')
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
//响应数据的中间件
app.use(function(req,res,next){
    res.cc = function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next();
})
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
//配置解析表单数据的中间件,只能解析 application/x-www-form-urlencoded这种格式的表单数据
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use('/api',userRouter);
app.use('/my',userinfoRouter);
app.use('/my/article',artCateRouter);
app.use('/my/article', articleRouter)

//定义错误级别的中间件
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) {
        console.log(req.body);
        return res.cc(err);
    }
    // 捕获身份认证失败的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    //未知错误
    res.cc(err);
})
app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007');
})