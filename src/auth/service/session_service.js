var mysql = require('mysql'); //mysql 驱动
var config = require('../../config/db_config'); //DB配置文件
var pool = mysql.createPool(config); //创建连接池

var session_service = {
	newSession: function(sessionKey, employeeCode, sessionObject, handler) {
		console.log('query from db');
		sessionObject = sessionObject || {};
		var now_date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
		var ext_Data = JSON.stringify(sessionObject);
		var insertParms = [sessionKey, employeeCode, now_date, ext_Data, 1, 0];
		pool.query("INSERT INTO `security_session` (`serialnumber`,`employeeCode`,`createDate`,`extData`,`enableStatus`,`deleteStatus`) VALUES (?,?,?,?,?,?);", insertParms, function(err, rows, fields) {
			if (err) throw err;
			if (handler) {
				handler(sessionKey);
			}
		});
	},
	getSession: function(sessionKey, employeeCode, handler) {
		pool.query("select  * from security_session where serialNumber=? and employeeCode=? and enableStatus=1 and deleteStatus=0", [sessionKey, employeeCode], function(err, rows, fields) {
			if (err) throw err;
			if (rows && rows.length > 0) {
				if (handler) {
					handler(rows[0]);
				}
			} else {
				handler({});
			}
		});
	}
};

module.exports = session_service;