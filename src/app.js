var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var _config = require('config');

// Date.prototype.Format = function(fmt) { //author: meizz
// 	var o = {
// 		"M+": this.getMonth() + 1, //月份
// 		"d+": this.getDate(), //日
// 		"h+": this.getHours(), //小时
// 		"m+": this.getMinutes(), //分
// 		"s+": this.getSeconds(), //秒
// 		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
// 		"S": this.getMilliseconds() //毫秒
// 	};
// 	if (/(y+)/.test(fmt))
// 		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
// 	for (var k in o)
// 		if (new RegExp("(" + k + ")").test(fmt))
// 			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
// 	return fmt;
// }



var auth_controller = require('./auth/controller/auth_controller');
var order_controller = require('./order/controller/order_controller');

var base_service = require('./base/service/base_employee_service');
var order_service = require('./order/service/order_service');

// parse various different custom JSON types as JSON
// app.use(bodyParser.json({
// 	type: 'application/*+json'
// }));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.use('/auth', auth_controller);
app.use('/order', order_controller);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
	console.log(req.body);
	console.log('loading path /');

	base_service.testDB(function(resp) {
		var _resp = {
			ok: resp,
			config: _config
		};
		res.json(_resp);
	});
});


app.get('/order', function(req, res) {
	console.log(req.body);
	console.log('loading path /order');
	order_service.queryOrder('', '', function(resp) {
		res.json(resp);
	});
});



var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});