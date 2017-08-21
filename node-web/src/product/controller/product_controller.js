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
//商品查询
router.post('/query_list', function(req, res) {

	res.send({
		aaa: 123
	});
});


//商品创建
router.post('/create_product', function(req, res) {

	res.send({
		aaa: 123
	});
});


//商品更新
router.post('/update_product', function(req, res) {

	res.send({
		aaa: 123
	});
});


//商品删除
router.post('/delete_product', function(req, res) {

	res.send({
		aaa: 123
	});
});

//修改商品状态
router.post('/update_product_status', function(req, res) {

	res.send({
		aaa: 123
	});
});

module.exports = router;