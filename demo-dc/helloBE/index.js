const express = require('express');
const cors = require('cors');

const app = express();

const Mysql = require('mysql');


const DB = Mysql.createConnection({
    user:"test",
    password:'root',
    host:'db',
    database:'demo'
});

DB.connect((err) => {
    if(err) throw err;
      console.log("connected to database")
    
})

// function createTable(response) {
//     const Sql = "create table hello(id int primary key auto_increment, country varchar(255), hellotext varchar(255))";
//     DB.query(Sql, function(err, res){
//     if(err) throw err;
//     console.log("created table");
//     response.send("hello")
//     })
// }

const values = [
  
    ["Turkish" , "Merhaba"],
    ["Urdu" , "Assalamo aleikum" ],
    ["Zulu", "Sawubona"],
    ["Swedish" , "Halla"],
    ['Spanish' , 'Hola'],
    ['Nepali' , 'Namaste'],
    ['Norwegian' , 'Hallo'],
    ['Persian' , 'Salam'],
    ['indian', 'Namaskar'],
    ['Japanese' , 'Konnichiwa'],
    ['Italian', 'Salve']

    
]   

function insertToTable(response) {
    const Sql = "insert into hello (country, hellotext) values ?";
    DB.query(Sql, [values], function(err, res){
    if(err) throw err;
    console.log("inserted to  table");
    response.send("hello")
    })
}

function getfromDB(response, value) {
    const Sql = `select hellotext from hello where country = '${value}'`;
    DB.query(Sql,function(err, res){
    if(err) {
        response.send("sory no such named recorded in db")
    }
    if(res.length !== 0) {
    
        response.json({hello: res[0].hellotext});
    }else {
        response.json({hello :'sory no such named recorded in db'});

    }
    })
}

app.use(cors());

app.get('/hello/:text', function(request, response, next) {    
    const splitted = request.url.split('/')[2];
    getfromDB(response, splitted);
    
})

app.listen(9091);