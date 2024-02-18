// 导入定义验证规则的模块
const joi = require('joi')
// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
const pagenum = joi.number().integer().required()
const pagesize = joi.number().integer().required()
const id = joi.number().integer().required()
const pub_date = joi.date().required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        pub_date,
        content,
        state
    },
}
//验证规则对象 - 获取文章
exports.get_article_schema = {
    param:{
        pagenum,
        pagesize,
        cate_id,
        state
    }
}
//验证规则对象 - 获取文章信息
exports.get_articleInfo_schema = {
    param:{
        id
    }
}

// 验证规则对象 - 更新文章
exports.update_article_schema = {
    body: {
        title,
        cate_id,
        pub_date,
        content,
        state,
        id
    },
}