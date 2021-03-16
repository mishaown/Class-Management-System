const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail}  = require('validator');
const { Schema } = mongoose;

const USER = new Schema({
    role: {
        type: String,
        enum: ['student', 'teacher', 'employee'],
        default: 'student',
        required: true,
    }, 
    id: {
        type: String,
        required: [true, 'Please Enter ID'],
        minlength: [8, `ID can't be less than 8 charcters`],
        maxlength: [12, `ID can't be more than 12 charcters`],
        unique: [true, 'This ID aleraay exists']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, `Password can't be less than 4 characters!`],
        maxlength: 1024
    },
    name: {
        type: String,
        maxlength: [50, 'Name can not be more than 50 charcters']
    },
    email: {
        type: String,
        validate: [ isEmail, 'Please enter a valid email']
    },
    date: {
        type: Date,
        default: Date.now
    },
    
})  

// Hashing password before saving
USER.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Static method to login user
USER.statics.login = async function(role, id, password) {   
    const user = await this.findOne({ role, id });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) { 
            return user;
        } else {
            throw Error('incorrect password');
        }
    }
    throw Error('incorrect id');
}

module.exports = mongoose.model('users', USER);