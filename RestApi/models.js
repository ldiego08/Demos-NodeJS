var Product = function (id, name, price) {
	this.id = id;
	this.name = name;
	this.description = "";
	this.price = price;
};

var OrderLine = function (orderId, product, quantity) {
	this.orderId = orderId;
	this.product = product;
	this.quantity = quantity;
};

var Order = function (id) {
	this.id = id;
	this.lines = [];
};

module.exports = {
	"Product": Product,
	"OrderLine": OrderLine,
	"Order": Order
};