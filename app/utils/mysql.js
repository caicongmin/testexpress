/**
 * Created by ccm on 2017/8/22.
 */
var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//     user: 'root',
//     password: '199411',
//     database: 'test'
// });
//
// connection.connect(function(err) {
//   if (err) {
//     console.log('error connecting:' + err.stack);
//     return;
//   }
//   console.log('connected as id' + connection.threadId);
//
// });
var pool = null;
var db = {};

// var dbConfig = {
//     host: '127.0.0.1',
//     user: 'root',
//     password: '199411',
//     database: 'test'
// };

//定义一个空函数 用于callback函数为空时的处理
function nop(a, b, c, d, e, f) {

}

/**
 * 封装query函数 便于使用sql语句
 * @param sql
 * @param callback
 */
function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err, null, null);
      return;
    }
    connection.query(sql, function(err, result, fields) {
      // 释放连接到连接池
      connection.release();
      // 回调数据
      callback(err, result, fields);
    })
  });
}

db.init = function (config, log) {
  log.info("pool init =>", config);
  pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });
};

/**
 * 查找所有用户
 * @param callback
 */
db.getAllUser = function(callback) {
  callback = callback == null? nop:callback;
  var sql = 'SELECT * FROM users';
  query(sql, function (err, result, fields) {
    if (err) {
      callback(null);
      throw err;
    }
    callback(result);
  });
};
/**
 * 根据userId 查找指定用户
 *
 */
db.getUserByUserId = function (uid, callback) {
  callback = callback == null ? nop: callback;
  var sql = 'SELECT * FROM users WHERE id = "{id}"';
  sql = sql.format({id: uid});
  query(sql, function (err, result, fields) {
     if (err) {
       callback(null);
       throw err;
     }
     callback(result);
  });
};

db.updatePasswardByName = function (name, callback) {
  callback = callback == null ? nop : callback;
  var sql = 'UPDATE '

};

db.addUser = function (name, password, callback) {
    callback = callback == null ? nop : callback;
    var sql = 'INSERT INTO users (name, password) values("{name}", "{password}")';
    sql = sql.format({name: name, password: password});
    query(sql, function (err, result, fields) {
        if (err) {
          callback(false);
          throw err;
        }
        callback(true);
    });
};

module.exports = db;

