/**
 * db.js
 * 
 * This module exports a set of test data to be used in the REST
 * services exposed to clients.
 */

var models = require("./models");

var products = [
    new models.Product(1, "Polo T-shirt", 10.5),
    new models.Product(2, "Yankees Hat", 5.2),
    new models.Product(3, "Kaki Pants", 12.4),
    new models.Product(4, "Leather Shoes", 25),
    new models.Product(5, "Tank Top", 5.4)];

var orders = [
    new models.Order(1),
    new models.Order(2)]

orders[0].lines.push(new models.OrderLine(1, products[0], 2));
orders[0].lines.push(new models.OrderLine(1, products[1], 1));
orders[0].lines.push(new models.OrderLine(1, products[2], 1));

orders[1].lines.push(new models.OrderLine(2, products[3], 2));
orders[1].lines.push(new models.OrderLine(2, products[4], 1));

module.exports = { "products": products, "orders": orders };