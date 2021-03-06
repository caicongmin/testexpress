/**
 * create by ccm on 2017/8/22.
 * 用户操作路由
 */
var express = require('express');
var router = express.Router();
var log4js = require('../utils/log');
var log = log4js.logger("logInfo");
var db = require('../utils/mysql');

/* GET users listing. */
router.get('/getUsers', function(req, res) {
  log.info("login =>", req.url, req.query.userId);

  db.getAllUser(function(result) {
    log.info('getUsers result=>', result);
    if (result == null) return;
    res.end(JSON.stringify(result));
  });
  // res.end("user login");
});

router.get('/login', function(req, res) {
  var uid = req.query.userId;
  log.info("login =>", req.url, uid);
  db.getUserByUserId(uid,function(result) {
      log.info('login result=>', result);
      if (result == null){
        res.end(JSON.stringify({code: 0, data:{
          msg: "用户不存在"
        }}));
        return;
      };
      if (result.length == 0){
          res.end(JSON.stringify({code: 0, data:{
              msg: "用户不存在"
          }}));
          return;
      };

      res.end(JSON.stringify(result[0]));
  });
});

router.get('/addUser', function(req, res) {
  var name = req.query.name;
  var password = req.query.password;
  log.info("addUser =>", req.url, name, password);
  if (!name || !password) {
      res.end(JSON.stringify({code: 0, data:{
          msg: "用户名或者密码为空"
      }}));
      return;
  }
  db.addUser(name, password,function(result) {
      log.info('addUser result=>', result);
      if (result){
          res.end(JSON.stringify({code: 0, data:{
              msg: "创建成功"
          }}));
          return;
      } else {
          res.end(JSON.stringify({code: 0, data:{
              msg: "创建失败"
          }}));
          return;
      }
  });
});

router.get('/updateUserPassword', function(req, res) {
    var name = req.query.name;
    var password = req.query.password;
    log.info("updateUserPassword =>", req.url, name, password);
    if (!name || !password) {
        res.end(JSON.stringify({code: 0, data:{
            msg: "用户名或者密码为空"
        }}));
        return;
    }
    db.updatePasswordByName(name, password,function(result) {
        log.info('updateUserPassword result=>', result);
        if (result){
            res.end(JSON.stringify({code: 0, data:{
                msg: "更新成功"
            }}));
            return;
        } else {
            res.end(JSON.stringify({code: 0, data:{
                msg: "更新失败"
            }}));
            return;
        }
    });
});

router.get('/deleteUserByName', function(req, res) {
    var name = req.query.name;
    log.info("deleteUserByName =>", req.url, name);
    if (!name) {
        res.end(JSON.stringify({code: 0, data:{
            msg: "用户名为空"
        }}));
        return;
    }
    db.deleteUserByName(name, function(result) {
        log.info('deleteUserByName result=>', result);
        if (result){
            res.end(JSON.stringify({code: 0, data:{
                msg: "删除成功"
            }}));
            return;
        } else {
            res.end(JSON.stringify({code: 0, data:{
                msg: "删除失败"
            }}));
            return;
        }
    });
});


module.exports = router;
