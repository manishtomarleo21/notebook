const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl, ()=>{
        console.log("Connect to MongoDB");
    })
}

module.exports = connectToMongo;