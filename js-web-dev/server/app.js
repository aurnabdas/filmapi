const express = require('express')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const dbService = require('./dbService'); // this was exported in the dbservice file
const { request } = require('http');
const PORT = 3000;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjYzYTg4MTYwYmRjMmE5OTM0N2ZlYjVmYmI3YzY1ZSIsInN1YiI6IjYxOWMzOTc5OGRlMGFlMDA0MjJlYWUxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.msZOXSEjTzsNF2s3sMvCzMraktbBz4WPM7OXfzU6dRk'
    }
  };
  
  // the code below is what was provided by MovieDB to look at the JSON data on the terminal 

    // fetch('https://api.themoviedb.org/3/search/movie?query=batman', options)
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));


// the code below does the same thing as the code above the difference is, we put all the responces from when
//   const users_movie = 'Oppenheimer'; 
//   const url = `https://api.themoviedb.org/3/search/movie?query=${movie}`

  async function getData(user_movie)
  {
    const url = `https://api.themoviedb.org/3/search/movie?query=${user_movie}`
    const response = await fetch(url , options);
    const data = await response.json();
    console.log(data); // prints all the JSON data
    const results = data.results; 

    const movie_title = [];
    const poster_url = [];
     
    for (const movie of results)
    {
        if(movie.title === user_movie) 
        // === is used to compare if any two things are the same. i ran into a complication when i used JSON.stringfy
        // for example movie_title.push(JSON.stringify(movie.title)); gives you  ['"Batman Returns"'], but you wanted ['Batman Returns'] because i was comparing "Batman Returns"
        // this is provided by movie.title 
        {
            movie_title.push(movie.title);
            poster_url.push(movie.poster_path);
        }
        
        
        // console.log(movie.title, " Image url:", movie.poster_path); // prints all the title and url links
    }
    // console.log(poster_url[0]); // prints the array of all the movies 
    poster = `http://image.tmdb.org/t/p/w500/${poster_url[0]}`;
    console.log(poster);
    return poster;
    
  }
  
//  var poster = getData();

// const addBtn = document.querySelector('#add-name-btn');

// addBtn.onclick = function () {
//     const title = document.querySelector('#name-input');
//     const name = title.value;
//     name.value = "";
//     fetch('http://localhost:3000/insert', {
//       headers: 
//       {
//           'Contest-Type' : 'application/json'
//       }, 

//       method: 'POST',

//       body: JSON.stringify({name: name})

//     })
//     .then(responce => responce.json())
//     ;
// }
// -----------------------------------------------------


app.get('/movie/:name', async function(req, res) 
{
    var movie = req.params.name;
    var poster = await getData(movie);
    // res.sendFile(path.join(__dirname, '/static/frontpage.html')); //static
    // var movie = req.params.name; // attempt to make a api call to get movie id
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h2> The Movie Poster Generator </h2>' + '<img src=' + `${poster}` + '>' ));
    
    const db = dbService.getDbServiceInstance();
    const result = db.insertName(movie);
    // result.then(data => res.json({success: true})).catch(err => console.log(err));
  });


app.post('/insert', (request, response) => 
{
    // console.log(request.body);
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertName(name);
    result.then(data => response.json({success: true})).catch(err => console.log(err))


});

app.listen(PORT, ()=> {
    console.log(`App listen on port ${PORT}...`);
})


//------------------------------------------------
//  NOTES

// git checkout * (changes everything back on the file)
// git checkout FILENAME (brings back anything changed in folders)
// this is the url used to load in a image http://image.tmdb.org/t/p/w500/inVq3FRqcYIRl2la8iZikYYxFNR.jpg. This was found on this stack overflow url https://stackoverflow.com/questions/37512575/movie-poster-not-displaying-w-themoviedb 

//new