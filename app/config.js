var HALL_IP = "localhost";
var PORT = 3000;

var ACCOUNT_PRI_KEY = "^&*#$%()@";
var ROOM_PRI_KEY = "~!@#$(*&^%$&";

var LOCAL_IP = 'localhost';
var configs = {};

configs.mysql = function(){
  return {
    host:'localhost',
    user:'caicm',
    password:'123456',
    database:'test',
    port:PORT,
  }
};

module.exports = configs;