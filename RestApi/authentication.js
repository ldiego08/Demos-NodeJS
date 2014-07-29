var passport = require("passport"),
    ApiKeyStrategy = require("passport-localapikey").Strategy;

/**
 * The ApiClient class serves as a data model containing information about client 
 * applications that are authorized to consume data through the server REST endpoints.
 */

var ApiClient = function (id, name, apiKey) {
    this.id = id;
    this.name = name;
    this.apiKey = apiKey;    
};

/**
 * The authorizedClients array contains test data, usually, this would be stored in a
 * document database.
 */

var authorizedClients = [
    new ApiClient(1, "SampleClient1", "afgtuyr23df"),
    new ApiClient(2, "SampleClient2", "asiur453kdf")];

/**
 * Now, all the authentication tasks are wrapped in a single Authentication static object
 * that can setup PassportJS for a given app through the setupOn function or query the clients 
 * array.
 */

var Authentication = {

    /**
     * The setupOn method is used by other script files to setup PassportJS authentication for
     * an ExpressJS app instance.
     */
    setupOn: function (app) {

        /**
         * Setup the way ExpressJS serializes and de-serializes an ApiClient instance from a request
         * or response cookie (session).
         */

        passport.serializeUser(Authentication.serializeUser);
        passport.deserializeUser(Authentication.deserializeUser);

        /**
         * Tell PassportJS to use ApiKeyStrategy to authenticate client requests. Strategies are
         * authentication-level middleware that handles how clients are verified and authenticated.
         * Advantage of keeping them as a separate piece, is that changing the authentication strategy 
         * used by PassportJS can be done in matter of minutes.
         */

        passport.use(new ApiKeyStrategy(function (apiKey, done) {
            process.nextTick(function () {

                /**
                 * Each time a client tries to authenticate against the REST API server app, we make a stop
                 * here to validate the client API key sent over the URL. 
                 * 
                 * Example: http://localhost:1337/api/authenticate?apiKey=123456
                 *
                 * In NodeJS, everything is done through callbacks. The findClientByApiKey function accepts a
                 * callback function that will be called once a client with a matching API key has been found,
                 * or an error if it does not exist.
                 */

                Authentication.findClientByApiKey(apiKey, function (error, client) {
                    if (error) {
                        return done(error);
                    }

                    if (!client) {
                        return done(null, false, { message: "Unknown API key: " + apiKey });
                    }

                    return done(null, client);
                });
            });
        }));

        app.use(passport.initialize());
        app.use(passport.session());
    },

    /**
     * Now, we use, at some point, the registerRoutes function in order to add all of the authentication
     * end-points available to clients.
     */

    registerOn: function (app) {

        /**
         * "authenticate" is used to validate a client API key and return a session cookie if authentication
         * was successful.
         */

        app.post("/api/authenticate", 
            passport.authenticate("localapikey", { failureRedirect: "/api/unauthorized", failureFlash: true }), 
            function (request, response) {
                response.json({ 
                    message: "Authentication succeeded.", 
                    authenticated: true 
                });
            });

        /**
         * "unauthorized" is a default endpoint to redirect unauthorized clients.
         */

        app.get("/api/unauthorized", function (request, response) {
            response.json({
                message: "Authentication error.",
                authenticated: false
            })
        });

        /**
         * "logout" invalidates the request authentication session.
         */

        app.get("/api/logout", function (request, response) {
            request.logout();
            response.json({
                message: "Session ended.",
                authenticated: false
            });
        });
    },

    validateAuthentication: function (request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        }

        response.redirect("/api/unauthorized");
    },

    serializeUser: function (user, done) {
        done(null, user);
    },
    
    deserializeUser: function (id, done) {
        Authentication.findClientById(id, function (error, user) {
            done(error, user);
        });
    },

    /**
     * Some client query methods.
     */

    findClientById: function (id, done) {
        for (var i = 0; i < authorizedClients.length; i++) {
            var client = authorizedClients[i];

            if (client.id === id) {
                return done(null, client);
            }
        }

        return done(new Error("User " + id + " does not exist."));
    },
    findClientByApiKey: function (apiKey, done) {
        for (var i = 0; i < authorizedClients.length; i++) {
            var client = authorizedClients[i];

            if (client.apiKey === apiKey) {
                return done(null, client);
            }
        }

        return done(new Error("No client found for API key " + apiKey + "."));
    }
};

module.exports = Authentication;