const db =require('../db/index');
//对用户密码进行加密
const bcrypt = require('bcryptjs');
// 导入配置文件
const config = require('../config')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
exports.regUser = (req,res)=>{
    const userinfo = req.body;
    // console.log(userinfo);
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不能为空！');
    }
    const sql = `select * from ev_users where username=?`
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            // console.log(111111);
            return res.cc(err.message);
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！');
        }

        // console.log(userinfo);
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
       /*  加密之后的密码，无法被逆向破解
        同一明文密码多次加密，得到的加密结果各不相同，保证了安全性 */
        userinfo.password = bcrypt.hashSync(userinfo.password,10);

        // console.log(userinfo);
        const sql = 'insert into ev_users set ?';

        db.query(sql,{username:userinfo.username , password:userinfo.password},function(err,results){
            if(err) return res.cc(err.message);
            // SQL 语句执行成功，但影响行数不为 1
            if(results.affectedRows !== 1){
                return res.cc('注册用户失败，请稍后再试');
            }
            res.cc('注册成功！',0);
        })
    })

}

exports.login = (req,res)=>{
    const userinfo = req.body;
    console.log(userinfo);
    const sql =  `select * from ev_users where username=?`;
    db.query(sql,userinfo.username,function(err,results){
        if(err) return res.cc(err);
        if(results.length !== 1) return res.cc('登陆失败')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password);
        if(!compareResult){
            return res.cc('密码错误');
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {...results[0],password:'',user_pic:''};
        //生成token字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            // token 有效期为 10 个小时
            expiresIn:'10h'
        })
        res.send({
            status:0,
            message:'登陆成功',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token:'Bearer ' + tokenStr
        })
    })
}
