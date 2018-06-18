var mysql = require('mysql');
var config = require('../config.js')

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'zxc54576688.',
  database: 'cAuth',
  char: 'utf8mb4'
});


let query = function (sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
let testdb = function (value) {
  let _sql = `INSERT INTO shareinfo(title,detail,time,date,vaindex,imindex,address,imgpath,host,host_avatar,id,sharestate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  return query(_sql, value)
}

let deleteBook = function (host) {
  let _sql = `UPDATE shareinfo SET sharestate = 0 where host = "${host}" `
  return query(_sql)
}
let getbookinfo = function (host) {
  let _sql = `SELECT * FROM shareinfo where host = "${host}"`
  return query(_sql)
}
let editbookinfo = function (id) {
  let _sql = `UPDATE shareinfo SET sharestate = 66 where host = "${host}" and title = "${title}"`
  return query(_sql)
}

module.exports = {
  query,
  testdb,
  deleteBook,
  getbookinfo,
  editbookinfo
}