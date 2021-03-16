const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const ADMIN = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'masteradmin'],
        required: true
    },
    id: {
        type: String,
        index: {
            unique: [true, 'This ID already exists']
        },
        maxlength: [8, `ID can't take more than 8 characters`],
        minlength: [6, `ID can't take less than 8 characters`],
        required: true
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

})

// Hashing password before saving
ADMIN.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Static method to login user
ADMIN.statics.login = async function(role, id, password) {   
    const admin = await this.findOne({ role, id });
    if(admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if(auth) { 
            return admin;
        } else {
            throw Error('Incorrect password');
        }
    }
    throw Error('Incorrect id');
}

module.exports = mongoose.model('admins', ADMIN);