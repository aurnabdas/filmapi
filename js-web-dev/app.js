const express = require('express')

const app = express();

const PORT = 3000;

app.use(express.static('static'));
app.use('/images', express.static('images'));

app.listen(PORT, ()=> {
    console.log(`App listen on port ${PORT}...`);
})