var mysql = require('mysql'); //mysql 驱动
var config = require('../../config/db_config'); //DB配置文件
var pool = mysql.createPool(config); //创建连接池

var service_module = {
	pool: pool,
	response: function(rows, handler) {
		if (rows && rows.length > 0) {
			if (handler) {
				handler(rows[0]);
			}
		} else {
			handler({});
		}
	},
	buildInsert: function(object, tableName) {

	}
};

module.exports = service_module;