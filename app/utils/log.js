/**
 * Created by ccm on 2017/8/22.
 */
var log4js = require('log4js')

log4js.configure({
  appenders: {console: {
    type: 'console' //  控制台输出
  }, logInfo: {
    type: 'dateFile', //  文件输出
    filename: 'logs/app_', //输出文件夹
    pattern: 'yyyy-MM-dd.log',
    alwaysIncludePattern: true,
    maxLogSize: 1024,
    backups: 4, //日志最大备份数量 超过自动删除
    category: 'logInfo' //记录器名
  }},
  categories: {default: {appenders: ['logInfo'], level: 'debug'}},
  replaceConsole: true  //替换console.log
});

levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL
};

exports.logger = function (name, level) {
  var logger = log4js.getLogger(name);
  logger.level = levels[level] || levels['debug'];
  return logger;
};

// exports.use = function (app, level) {
//   // app.use(log4js.connectLogger(log4js.getLogger('logInfo')), {
//   //   level: levels[level] || levels['debug'],
//   //   format: ':method :url :status'
//   // });
//   log4js.connectLogger(log4js.getLogger('logInfo'), {
//     level: levels[level], levels['debug'],
//     format: ':method :url :status'
//   })
// };
