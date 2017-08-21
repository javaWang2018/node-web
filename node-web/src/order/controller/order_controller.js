var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

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
//订单查询
router.post('/query_list', function(req, res) {

	res.send({
		aaa: 123
	});
});


//订单创建
router.post('/create_order', function(req, res) {

	res.send({
		aaa: 123
	});
});


//订单删除
router.post('/update_order', function(req, res) {

	res.send({
		aaa: 123
	});
});


//订单删除
router.post('/delete_order', function(req, res) {

	res.send({
		aaa: 123
	});
});

//订单取消
router.post('/cancel_order', function(req, res) {

	res.send({
		aaa: 123
	});
});

module.exports = router;