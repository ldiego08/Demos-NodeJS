var Product = function (base) {
	this.id = base.id;
	this.name = base.name;
	this.description = base.description || "";
	this.price = base.price;
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