const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bask3tb4ll",
    database: "moviesearch",
    port: "3306"
});


connection.connect((err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('db ' + connection.state);
    }
});

class DbService {

    //function 1
    static getDbServiceInstance()
    {
        return instance ? instance : new DbService();
    }

    //function 2
    async insertName(title) {
        try {
            const date_added = new Date(); // this gives you the date, the contructor is apart of JS libaray
    
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO searchs (title, date_added ) VALUES (?, ?); "; // this is the SQL code that will insert the title of the movie, which we are getting from the frontend
                connection.query(query, [title, date_added], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                }) // the function above is checking for errors, but if there isnt any it will run the sql code, and then the second parameter are the values the will add, which is also repersnted as (?,?) in the sql code
            });
            console.log(insertId);
        } catch (error){
            console.log(error);
        }
    }

}

module.exports = DbService;

