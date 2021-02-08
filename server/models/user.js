const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

//Virtual field
userSchema.virtual('password')
.set(function(password){
    //Create temporary variable called _password
    this._password = password
    //Generate a timestamp
    this.salt = uuidv4()
    //encryptPassword()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
});

//Methods
userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex');
        } catch (err){
            return ""
        }
    }
}

module.exports = mongoose.model('User', userSchema)