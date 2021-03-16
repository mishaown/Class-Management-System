const mongoose = require('mongoose');

const options = {
    useNewUrlParser : true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

const connectDB = async ()=>{
    const conn = mongoose.connect(process.env.DB_URL, options, (error)=>{
        if(!error){
            console.log('Connected to database');
        }
        else{
            console.log(`Database ERROR: ${error.message}`);
        }
    })
}

module.exports = connectDB;