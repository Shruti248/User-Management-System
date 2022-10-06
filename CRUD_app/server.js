const express = require ('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');   //inbuilt node module
const mongoose = require('mongoose');
const session = require('express-session');

const connectDB = require('./server/database/connection');


const app = express();

dotenv.config({path : 'config.env'})
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//MongoDB Connection
connectDB(); 


//parse request to body-parser
// app.use(bodyparser.urlencoded({extended:true}))

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//initializing the middleware session 
app.use(session({
    secret : " My Secret Key" , 
    saveUninitialized : true,
    resave : false
}));

//Storing session message 
app.use((req , res , next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(express.static('uploads'));

//Set view engine
app.set("view engine" , "ejs")  //ejs template engine

//-> This is used only when u have diff folder created for ejs file
// app.set("views" , path.resolve(__dirname , "views/ejs")) -> views/ejs: path 



//load assets
app.use("/css" , express.static(path.resolve(__dirname , "assets/css")))
app.use("/img" , express.static(path.resolve(__dirname , "assets/img")))
app.use("/js" , express.static(path.resolve(__dirname , "assets/js")))

// Load routers
app.use('/' , require('./server/routes/router'))


app.listen(PORT , () => {
    console.log(`server is running on http://localhost:${PORT} `)
})