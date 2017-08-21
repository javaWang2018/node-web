var service_module = require('../../usagi/service/usagi_service'); //基础服务类


service_module.queryOrder = function(keywords, tenantCode, handler) {

	var t = this;
	var _sql = 'select * from tb_order where 1=1';
	var _parm = [];
	if (tenantCode) {
		_sql += ' and tenantCode=?'
		_parm.push(tenantCode);
	}

	this.pool.query(_sql, _parm, function(err, rows, fields) {
		if (err) throw err;
		t.response(rows, handler);
	});
};

module.exports = service_module;