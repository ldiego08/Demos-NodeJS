/**
 * api.js
 * 
 * This module exports all the REST service handlers that will be called
 * on the different endpoints exposed to client applications.
 */

var db = require("./db");

var api = {
    products: {
        findAll: function (request, response) {
            return response.json(db.products);
        }
    }
};

module.exports = api;