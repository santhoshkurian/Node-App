const mongoose = require("mongoose");
const joi = require("joi");
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
    name: { 
        type: String, 
        required: true,
        minlength : 5,
        maxlength : 50 
    },
    email: { 
        type: String, 
        required: true,
        minlength : 5,
        maxlength : 255 ,
        unique : true 
    },
    password: { 
        type: String, 
        required: true,
        minlength : 5,
        maxlength : 1024
    }
    
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id}, config.get("jwtPrivateKey"));
    return token;
}

const user = mongoose.model('User', userSchema);


function validateUser(user) {
    const schema = {
        "name": joi.string().min(5).required(),
        "email": joi.string().min(5).max(255).required(),
        "password": joi.string().min(5).max(15).required(),
    };
    const result = joi.validate(user, schema);
    return result;
}

exports.User = user;
exports.validate = validateUser;
