const productModel = require('../models/products');

const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const newProduct = new productModel({
            name, price, quantity
        })

        await newProduct.save();
        res.status(200).json({ success: true, message: "Product created and saved sucessfully", data: newProduct });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product with provided id does not exist" });
        }

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find();

        if (!allProducts) {
            return res.status(404).json({ success: false, message: "No any product found in the database" })
        }

        res.status(200).json({ success: true, data: allProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const { name, price, quantity } = req.body;
        if (!name || !price || !quantity) {
            return res.status(422).json("Some fields are empty");
        }

        const newInfo = await productModel.findByIdAndUpdate(productId, { name, price, quantity }, { new: true });

        return res.status(200).json({ message: "Product updated successfully", newInfo });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await productId.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "" })
        }

        return res.status(200).json({ success: true, message: "Product Deleted Sucessfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ sucess: false, message: "Internal server error" });
    }
}

module.exports = { createProduct, getProduct, getProducts, updateProduct, deleteProduct}