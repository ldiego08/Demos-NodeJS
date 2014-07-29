/**
 * routes.js
 * 
 * This module exports a utility object that takes an application instance
 * and register all routes to it.
 */

var api = require("./api");

var Routes = {
    registerOn: function (app) {
        app.get("/api/products", api.products.findAll);

        return app;
    }
};

module.exports = Routes;