// Importing express
const express = require('express');
// Invoking the router()
const router = express.Router();
//Importing FeedsModel
const FeedsModel = require('../models/FeedsModel.js')

// A POST route for saving data into the 'feeds' collection
router.post(
    '/',
    (req, res) => {
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags
        };

        // console.log(
        //     'From the user', formData
        // );

        // Save the data to new database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received.');
    }
);

// a GET route for fetching data from the 'feeds' collection
router.get(
    '/',
    (req, res)=>{
    
        // (1) Fetch all the documents using .find()
        FeedsModel
        .find()
        // (2) Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                // res.json = res.send() + converts to JSON
                res.json(results)
            }
        )
        .catch(
            (e) => {
                console.log('error occured', e)
            }
        );

    }
);

module.exports = router;
