const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/booking"


mongoose.connect(mongoURI,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() =>console.log('MongoDB connection SUCCESS'))
.catch((err) =>{console.log(err)});