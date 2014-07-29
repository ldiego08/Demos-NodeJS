/**
 * server.js
 * 
 * This file is used as an application boostrapper. Here we setup the server 
 * application and make it listen on a specific port. 
 */

/**
 * Import 3rd-party packages. Remember to run "npm install" at the root 
 * path to restore packages before running the server app. 
 */

var express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("cookie-session"),
    flash = require("connect-flash"),
    cors = require("cors");

/** 
 * Import the route registration helper. 
 */

var Routes = require("./routes");

/** 
 * Import the authentication bootstrapper. 
 */

var Authentication = require("./authentication");

/** 
 * Create a new ExpressJS application using the following middleware:
 *  
 *     cors: Allows performing cross-origin requests to this server 
 *           application. In other words, applications hosted in a 
 *           different domain will be able to consume our REST API.
 *  
 *     body-parser: Parses the body sent in a PUT/POST request to JSON,
 *           and other formats.
 */

var app = express();

app.use(cors());
app.use(flash());
app.use(bodyParser.json());
app.use(cookieParser({ secret: "abcd1234" }));
app.use(session({ secret: "abcd1234" }));

Authentication.setupOn(app);

Routes.registerOn(app);
Authentication.registerOn(app);

/**
 * Start listening for requests on port 1337.
 */

app.listen(1337, function () {
    console.log("Server listening on port 1337.");
});

/**
 * NOTE: As you could see, our server app is an instance of an ExpressJS
 *       object. You could create as many as you want and have multiple 
 *       servers listening on different ports.
 */