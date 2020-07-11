const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = "s3cr3t100";

const UsersModel = require('../models/UsersModel.js');

// register
router.post(
    '/register',
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        // Step 1 - Generate a salt
        bcrypt.genSalt(
            (err, salt) => {
                // Step 2 - Use the salt to generate a hash
                bcrypt.hash(
                    formData.password, // First ingredient
                    salt, // Second ingredient

                    (err, hashedPassword) => {

                        const newUsersModel = new UsersModel(formData);

                        // Step 3 - Replace the original password with the hash
                        newUsersModel.password = hashedPassword;

                                // step 4 - Save username data to database (with the encrypted password)
                        newUsersModel.save(
                            (err, dbResult) => {
                                // If something goes wrong, send error
                                if(err) {
                                    res.json({message: err})
                                } 
                                // Otherwise, send success message
                                else {
                                    res.json({message: "User has been saved!"})
                                }
                            }
                        );

                    }
                )

            }
        );

    }
);

// login
router.post(
    '/login',
    (req, res) => {

        // npm packages: passport, passport-jwt, jsonwebtoken

        // Step 1- Capture formData (email & password)
        const formData = {
            email: req.body.email,
            password: req.body.password
        }
        // Step 2a- In database, find account that matches email
        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {

                // Step 2b- If email match, reject the login request
                if(!document) {
                    res.json({message: "Please check email or password"});
                }

                // Step 3- If there's a matching email, examine the document's password
                else {
                    // Step 4- Compare the encrypted password in database with incoming password
                    bcrypt.compare(formData.password, document.password)
                    .then(
                        (isMatch) => {
                            // Step 5a- If the password matches, generate web token (JWT)
                            if(isMatch === true) {
                                // Step 6- Send the JWT to the client
                                const payload = { 
                                    id: document.id,
                                    email: document.email
                                }

                                jwt.sign(
                                    payload,
                                    secret,
                                    (err, jsonwebtoken) => {
                                        res.json(
                                            {
                                                message: 'Login successful',
                                                jsonwebtoken: jsonwebtoken
                                            }
                                        )
                                    }
                                )
                            }

                            // Step 5b- If password is NOT match, reject login request
                            else{
                                res.json({message: "Please check email or password"})
                            }
                        }
                    )
                }

            }
            
        )

    }
)

module.exports = router;
