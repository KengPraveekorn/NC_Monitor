const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/NC_moni')
        console.log('Connected mongoDB');
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB