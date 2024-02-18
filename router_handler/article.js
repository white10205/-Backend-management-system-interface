// 文章的处理函数模块
const path = require('path')
const db = require('../db/index')
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    // if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    // cover_img: path.join('/uploads', req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }

  const sql = `insert into ev_articles set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    res.cc('发布文章成功！', 0)
  })
}

//获取文章函数
exports.getArticle = (req,res)=>{
  let sql = "select e1.id,e1.title,e1.title,e1.pub_date,e1.state,e1.author_id,e2.name from ev_articles as e1 join ev_article_cate as e2 on e1.cate_id = e2.id where 1=1"
  if(req.query.cate_id != '' ) {
    sql += " and cate_id =" + req.query.cate_id
  }
  if(req.query.state != '') {
    sql += " and state = '" + req.query.state + "'"
  }
  db.query(sql,(err,results)=>{
    if(err){
      return res.cc(err)
    }
    if(res.length === 0) return res.cc('数据为空!');
    const total = results.length;
    const articleList = []
    const start = (req.query.pagenum - 1) * req.query.pagesize;
    for(let i = start ; i < req.query.pagenum * req.query.pagesize && i < total;i++){
      articleList.push(results[i]);
    }
    res.send({
      status:0,
      message:'获取文章成功!',
      data:articleList,
      total
    })
  })
}

//获取文章信息
exports.getArticleInfo = (req,res)=>{
  const sql = "select * from ev_articles where id = ?"
  db.query(sql,req.query.id,(err,results) =>{
    if(err) return res.cc(err)
    if(results.length !== 1) res.cc('获取文章信息失败！')
    res.send({
      status:0,
      message:'获取成功',
      data:results[0]
    })
  })
}

//编辑文章信息
exports.updateArticle = (req,res)=>{
  const sql = 'update ev_articles set title=?,content=?,pub_date=?,state=?,cate_id=? where id = ?'
  db.query(sql,[req.body.title,req.body.content,req.body.pub_date,req.body.state,req.body.cate_id,req.body.id],(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新文章失败!')
    res.send({
      status:0,
      message:'更新文章成功!'
    })
  })
}

//删除文章
exports.deleteArticle = (req,res)=>{
  const sql = 'delete from ev_articles where id = ?'
  db.query(sql,req.query.id,(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除失败，请稍后再试')
    res.send({
      status:0,
      message:'删除成功'
    })
  })
}
    