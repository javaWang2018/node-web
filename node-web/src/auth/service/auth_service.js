var mysql = require('mysql'); //mysql 驱动
var config = require('../../config/db_config'); //DB配置文件
var pool = mysql.createPool(config); //创建连接池

var auth_service = {
	login: function(account, password, handler) {
		console.log('query from db');
		pool.query("select  * from security_account where account=? and password=?", [account, password], function(err, rows, fields) {
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

module.exports = auth_service;