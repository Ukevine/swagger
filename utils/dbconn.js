const mongoose = require('mongoose');

const dbconnection = async () => {
    await mongoose.connect('mongodb://localhost/coffee-shop')
    .then(() => console.log('MongoDB connected Sucessfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = dbconnection;