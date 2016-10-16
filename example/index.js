require('../')

config('port', 4000)

get('/hi', () => "hello world!")

get('/', (req, res) => {
  
  res.send('ok');
})