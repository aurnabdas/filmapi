const express = require('express')
const path = require('path');

const app = express();

const PORT = 3000;


app.get('/movie/:name', function(req, res) {
    // res.sendFile(path.join(__dirname, '/static/frontpage.html')); //static
    var movie = req.params.name; // attempt to make a api call to get movie id
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2>Test ' + movie + ' </h2>'));
  });
// app.use(express.static('static'));
// app.use('/images', express.static('images'));

app.listen(PORT, ()=> {
    console.log(`App listen on port ${PORT}...`);
})