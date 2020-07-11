// Importing express functions inside the server
const express = require('express');

// Importing mongoose inside server
const mongoose = require('mongoose');

// Importing body-parser
const bodyParser = require('body-parser');

    // Importing passport
    const passport = require('passport');
    // Importing the strategies
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const secret = "s3cr3t100";

    const cors = require('cors');

    const UsersModel = require("./models/UsersModel");

    const passportJwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    const passportJwt = (passport) => {
        passport.use(
            new JwtStrategy(
                passportJwtOptions,
                (jwtPayload, done) => {

                    // Extract and find the use by their id (contained jwt)
                    UsersModel.findOne({ _id: jwtPayload.id })
                    .then(
                        // If the document was found
                        (documnet) => {
                            return done(null, document);
                        }
                    )
                    .catch(
                        // If something went wrong with database search
                        (err) => {
                            return done(null, null);
                        }
                    )
                }
            )
        )
    };

// Importing routes
const ProductsRoutes = require('./routes/ProductsRoutes');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const EmailsRoutes = require('./routes/EmailsRoutes');

// Creating the server object
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

// Invoking passportJwt and pass the password package as argument
passportJwt(passport);

const dbURL = "mongodb+srv://admin1:Mustafa1@cluster0-9gbs4.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(
    ()=>{
        console.log('You are connected to MongoDB!');
} 
).catch(
    (e)=>{
        console.log('catch', e);
    }
);

server.use(
    '/products',
    ProductsRoutes
);

server.use(
    '/feeds',
    passport.authenticate('jwt', {session:false}),
    FeedsRoutes
);

server.use(
    '/users',
    UsersRoutes
);

server.use(
    '/emails',
    EmailsRoutes
);

// Creating a route for the landing page
server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to MyWebsite.com</h1>"
        + "<a href = /about>About us </br></a>"
        + "<a href = /contact>Contact Us </br></a>"
        + "<a href = /products>Product Info </br></a>"
        );
    }
);

// Creating a route for the 404 page
server.get(
    '*',
    (req, res) => {
        res.send("<h1>404! Page not found :(</h1>");
    }
);

// Connecting to port (range 300 - 9999)
// The IP address of servers not connected to the world wide web = http://127.0.0.1:8080 (aka http://localhost:8080)
server.listen(
    8080, ()=>{
        console.log('You are connected!');
} )