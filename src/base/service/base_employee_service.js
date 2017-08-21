var mysql = require('mysql'); //mysql 驱动
var config = require('../../config/db_config'); //DB配置文件
var pool = mysql.createPool(config); //创建连接池

var base_employee_service = {
	getEmployeeByCode: function(employeeCode, handler) {
		console.log('getEmployeeByCode,code=' + employeeCode);
		pool.query("select  * from base_employee where serialNumber=?", [employeeCode], function(err, rows, fields) {
			if (err) throw err;
			if (rows && rows.length > 0) {
				if (handler) {
					handler(rows[0]);
				}
			} else {
				handler({});
			}
		});
	},
	testDB: function(handler) {
		console.log('test db !');
		pool.query("select  * from base_employee limit 1", [], function(err, rows, fields) {
			if (err) throw err;
			console.log(rows);
			if (rows && rows.length > 0) {
				if (handler) {
					handler(true);
				}
			} else {
				handler(false);
			}
		});
	}
};

module.exports = base_employee_service;