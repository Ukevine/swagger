const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String,
    },
    quantity:{
        type:String,
    }

})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;