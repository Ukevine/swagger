const { UserModel } = require('../models/user')
const bcrypt = require('bcryptjs');
const Joi = require('joi');
require('dotenv').config();

const Signin = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(401).send({ message: error.details[0].message })

        const user = await UserModel.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).send({ message: "Invalid username or password" });

        const validPassword = bcrypt.compare(
            req.body.password, UserModel.password
        )

        if (!validPassword)
            return res.status(400).send({ message: "Invalid username or password" });

        const token = UserModel.generateAuthToken();
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None' });
        return res.status(200).json({ message: "Logged in successfully" });

    } catch (error) {
        return res.status(500).send({ message: "Internal server error" })
    }
}

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports = Signin;