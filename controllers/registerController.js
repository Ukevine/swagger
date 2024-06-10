const { UserModel, validate } = require('../models/user'); 
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            return res.status(401).json({message:"Some Invalid data provided"});
        }

        const user = await UserModel.find({ email:req.body.email });

        if (user) {
            return res.status(304).json({message:"Email provided already exists"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new UserModel({...req.body, password:hashedPassword}).save();
        return res.status(200).json({sucess:true, message:"New User Created and saved successfully", newUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({sucess:true, message:"Internal Server error"});
    }
}

module.exports = Register;