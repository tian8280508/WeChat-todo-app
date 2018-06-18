var userModel = require('../tools/mysql.js')
module.exports = {
  //查询
  query: async ctx => {
    await userModel.selectAll().then(result => {
      ctx.body = result
    })
  },
  //上传数据
 testdb: async ctx => {
   const { title, detail, time, date, vaindex, imindex, address, imgpath, host, host_avatar, id, sharestate } = ctx.request.body
   await userModel.testdb([title, detail, time, date, vaindex, imindex, address, imgpath, host, host_avatar, id, sharestate]).then(result => {
      ctx.response.body = result
      //userModel.postmark([result.insertId, latitude, longitude])
    })
  },
 getbookinfo: async (ctx, next) => {
   var host = ctx.params.host
   await userModel.getbookinfo(host).then(result => {
     ctx.body = result
   })
 },
 deleteBook: async ctx => {
   const { host } = ctx.request.body
   await userModel.deleteBook(host)
   ctx.response.body = { host}
 },
editbookinfo: async ctx => {
  const { host, title } = ctx.request.body
  await userModel.editbookinfo(host, title)
  ctx.response.body = { host, title }
 }
}