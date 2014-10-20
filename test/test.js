require('../');

config('port', 4000);

get('/hi', function(){
	return "hello world!";
});
