var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();

app.use(cookieParser());
// app.use(express.cookieSession({
// 	secret: 'tobo!',
// 	cookie: {
// 		maxAge: 60 * 60 * 1000
// 	}
// }));


var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

var auth_service = require('../service/auth_service');
var session_service = require('../service/session_service');
var employee_service = require('../../base/service/base_employee_service');
var string_util = require('../../util/string');

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	// console.log('request= ', req);
	// res.setHeader('Content-Type', 'text/plain');
	// res.write('you posted:\n');
	// res.end(JSON.stringify(req.body, null, 2));

	next();
});
// 定义网站主页的路由
router.post('/login', function(req, res) {
	var data = req.body;
	console.log("request=", data);
	if (!data || !data.account) {
		res.send({
			code: 601,
			message: '用户名不存在'
		});
	} else if (!data || !data.password) {
		res.send({
			code: 602,
			message: '请输入密码'
		});
	} else {
		var _account = data.account;
		var _password = data.password;
		var _login_employee_code = '';

		var __login = function() {
			auth_service.login(_account, _password, function(accountData) {
				if (accountData && accountData.employeeCode && accountData.employeeCode.length > 0) {
					_login_employee_code = accountData.employeeCode;
					console.log('employee login=' + _login_employee_code);
					//获取员工数据
					employee_service.getEmployeeByCode(_login_employee_code, function(employeeData) {

						if (employeeData && employeeData.serialNumber) {
							//创建session
							var session_key = string_util.randomSN(); //生成随机数
							session_service.newSession(session_key, _login_employee_code, employeeData, function(initSessionKey) {
								// res.cookie["employeeCode"] = _login_employee_code; //保存cookie
								// res.cookie["session"] = initSessionKey; //保存cookie
								res.cookie('employeeCode', _login_employee_code);
								res.cookie('session', initSessionKey);

								//登录成功
								res.send({
									code: 200,
									message: '登录成功',
									session_key: session_key
								});
							});
						} else {
							//员工不存在
							res.send({
								code: 502,
								message: '员工不存在'
							});
						}
					});
				} else {
					//登录失败
					res.send({
						code: 501,
						message: '用户名或密码错误'
					});
				}
			});
		}

		//检查cookie
		var _cookies = req.cookies;
		console.log('login cookie,', req);


		if (_cookies && _cookies.employeeCode && _cookies.session) {
			session_service.getSession(_cookies.session, _cookies.employeeCode, function(sessionData) {
				if (sessionData && sessionData.serialnumber) {
					//session还活着,登录成功
					res.send({
						code: 200,
						message: '登录成功',
						session_key: session_key
					});
				} else {
					//登录流程
					__login();
				}
			});
		} else {
			//登录流程
			__login();
		}
	}
});
// 定义 about 页面的路由
router.get('/logout', function(req, res) {
	res.send('logout');
});

module.exports = router;