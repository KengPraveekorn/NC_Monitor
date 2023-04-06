const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const connectDB = require('./Config/db')
const { readdirSync } = require('fs')

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '20mb'}));


// Route
readdirSync('./Routes')
.map((r)=>app.use('/api',require('./Routes/'+ r)))



const port = 5000;
app.listen(port,()=>{
    console.log('Server is running ' + port);
})