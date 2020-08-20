const express = require('express') ;
const app = express() ;
const path = require('path') ;
const mysql = require('mysql') ;
const session = require ('express-session') ;
const MySQLStore = require('express-mysql-session')(session) ;
const Router = require('./Router') ;

app.use(express.static(path.join(__dirname,'build'))) ;
app.use(express.json) ;

const bd = mysql.createConnection({
    host: 'localhost' ,
    user: 'root' ,
    password:'' ,
    database: 'bd' 
}) ;


bd.connect(function(err){
    if (err){
        console.log("error") ;
        throw err ; 
        return false ;
    }
})


const sessionStore = new MySQLStore({
    expiration : (1825 * 86400 * 1000) ,
})


app.use(session ({
    key : 'randomText' ,
    secret: 'randomText',
    store : sessionStore ,
    resave : false ,
    saveUninitialized : false ,
    cookie : {
        maxAge : (1825 * 86400 * 1000) , 
        httpOnly : false 
    }

}))  ;


new Router (app,bd) ;
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html')) ;
}) ;
app.listen(3000) ;