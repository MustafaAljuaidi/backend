// Import express into the file
const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/ProductsModel.js');


// POST route for products
router.post(
    '/',
    (req, res)=>{
        // Capture the form data
        const formData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            quantity: req.body.quantity,
        }

        // Instantiate the ProductsModel
        const newProductsModel = new ProductsModel(formData);
        newProductsModel.save();

        res.send('Your PRODUCT has been received.');
    }
);

// Export the router
module.exports = router;