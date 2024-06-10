const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
 
const userSchma = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timeStamps: true,
});

userSchma.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id}, config.get("JWT_SECRET"),{expiresIn: "7d"});
    return token;
}

const UserModel = new mongoose.model("User", userSchma);

const validate = (data) => {
    const Schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string.min(6).required()
    })
    return Schema.validate(data);
}

module.exports = {UserModel, validate};
