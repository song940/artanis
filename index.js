var http = require('http');

var config = {
	port: 3000,
	ip: '127.0.0.1'
};

var routes = [];

global.config = function(key, value){
	config[ key ] = value;
};

;['get', 'post', 'delete', 'update'].forEach(function(method){
	global[ method ] = function(route, handler){
		routes.push({ 
			route		: new RegExp("^" + route + "$"),
			method	: method.toUpperCase(), 
			handler	: handler
		});
	};
});

var server = http.createServer(function (req, res) {
	routes.forEach(function(route){
		if(route.method == req.method && route.route.test(req.url) ){
			var result = route.handler(req, res);
			if(result) res.end(result);
		}else{
			res.end('Not Found');
		}
	});
});

global.close = function(){
	server.close();
};

global.start = function(){
	server.listen(config.port, config.ip, function(){
		console.log('server is running at %s', server.address().port);
	});
};

start()
