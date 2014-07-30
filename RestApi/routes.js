/**
 * routes.js
 * 
 * This module exports a utility object that takes an application instance
 * and register all routes to it.
 */

var api = require("./api"),
    validateCredentials = require("./authentication").validateCredentials;

var Routes = {
    registerOn: function (app) {
        app.get("/api/products", validateCredentials, api.products.findAll)
           .get("/api/product/:id", validateCredentials, api.products.findById)
           .delete("/api/product/:id", validateCredentials, api.products.delete)
           .post("/api/product", validateCredentials, api.products.create);

        return app;
    }
};

module.exports = Routes;