const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/DatabaseConnection');
const route = require('./router');
const ejs_layout = require('express-ejs-layouts');

const app = express();
app.use(express.static('public'));

//EJS
app.use(ejs_layout);
app.set('view engine', 'ejs');

//IMPORING FROM .ENV     
dotenv.config(); 
//CONNECTING TO DATABASE
connectDB();
//DEV LOGGER
app.use(morgan('dev'));
    
//BODYPARSER 
app.use(express.urlencoded({extended: false}));
//COOKIE PARSER
app.use(cookieParser());
app.use(express.json());


//routes
app.use('/', route);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
});

process.on('unhandledRejection', (err)=>{
    console.log(`UNHANDLED ERROR:${err.message}`);
    server.close(()=> process.exit(1));
})