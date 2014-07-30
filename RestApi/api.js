/**
 * api.js
 * 
 * This module exports all the REST service handlers that will be called
 * on the different endpoints exposed to client applications.
 */

var _ = require("lodash"),
    db = require("./db"),
    models = require("./models");

var api = {
    products: {

        /**
         * Returns all products contained in the db.products array.
         */

        "findAll": function (request, response) {
            return response.json({
                success: true,
                products: db.products
            });
        },

        /**
         * Returns a single product from the db.products array matching
         * the ID coming from the request parameters.
         */

        "findById": function (request, response) {
            var id = parseInt(request.params.id);

            if (id) {
                var product = _(db.products).find({ "id": id });

                if (product) {
                    return response.json({
                        success: true,
                        product: product
                    });
                }

                return response.json({
                    success: false,
                    message: "A product with ID " + id + " was not found."
                });
            }

            return response.json({
                success: false,
                message: "No ID was specified."
            });
        },

        /**
         * Creates a product from the request body and adds it to the
         * db.products array.
         */

        "create": function (request, response) {
            var product = new models.Product(request.body);
            var productExist = _(db.products).any({ "id": product.id });         

            if (!productExist) {
                db.products.push(product);

                return response.json({
                    product: product,
                    success: true
                });
            }

            return response.json({
                success: false,
                product: product,
                message: "A product with ID '" + product.id + "' already exists."
            });
        },

        /**
         * Removes a single product from the db.products array matching the
         * ID specified in the request parameters.
         */

        "delete": function (request, response) {
            var id = parseInt(request.params.id);
            var product = _(db.products).find({ "id": id });

            if (!product) {
                return response.json({
                    success: false,
                    message: "A product with ID " + id + " was not found."    
                });
            }

            _(db.products).remove({ "id": id });

            return response.json({
                success: true,
                product: product    
            });
        }
    }
};

module.exports = api;