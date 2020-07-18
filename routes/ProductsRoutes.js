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

router.post(
    '/update',
    (req, res) => {
        const formData = {
            quantity: req.body.quantity,
            _id: req.body._id
        };

        ProductsModel.findOneAndUpdate(
            {_id: formData._id},    // search criteria
            {quantity: formData.quantity},  // the keys & values to update
            {}, // options, if any
            (err, document) => {
                if(err) {
                    console.log(err);
                } else {
                    res.json(
                        {
                            message: 'Product updated',
                            document: document
                        }
                    )
                }

            }
        )
    }
)

// Export the router
module.exports = router;