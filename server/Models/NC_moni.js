const mongoose = require('mongoose');
// const moment = require('moment');
// const mongooseDateFormat = require('mongoose-date-format');


// Schema
const NcSchaema = mongoose.Schema({
    ncr_no: String,
    detect_on:{
        type: String,
        require: true
    },
    detect_at:{
        type: String,
        require: true
    },
    nc_detail:{
        type: String,
        require: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Nc_moni',NcSchaema)