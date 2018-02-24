var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
  // Your username
	user: "root",
  // Your password
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId);
	console.log("Welcome to Bamazon")
	runForSale();
});

function runForSale() {
	connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;
	    var table = new Table({head: ["ITEM ID", "PRODUCT NAME", "PRICE"]});
	    for (var i = 0; i < res.length; i++) {
			table.push([res[i].item_id, res[i].product_name, res[i].price]);	
		};
		console.log(table.toString());
		askBuyer();
	});
}

function askBuyer() {
	inquirer.prompt([{
		name: "item_id",
	   	type: "input",
	   	message: "Please enter ID of the item you wanna buy.",
	   	validate: function(value) {
	   		if (isNaN(value) === false) {
           		return true;
       		}
         		return false;
	   		}
    	},{
	   	name: "stock_quantity",
	   	type: "input",
	   	message: "Please enter the quantity.",
	   	validate: function(value) {
	   		if (isNaN(value) === false) {
           		return true;
       		}
         		return false;
	   		}
	    }])
		.then(function(order) {
			var query = "SELECT * FROM products WHERE ?";
			connection.query(query, {item_id: order.item_id}, function(err, res) {
				if (err) throw err;
				if (res[0].stock_quantity - order.stock_quantity >= 0) {
                    console.log("Bamazon's got enough of \"" + res[0].product_name + "!\"");
                    console.log("We currently have " + res[0].stock_quantity + " in our stock, compared to your order of " + order.stock_quantity + " unit/s!");
                    console.log("You've been billed with the total of $" + (order.stock_quantity * res[0].price));
                    // connection.query("UPDATE products SET stock_quantity=? WHERE id=?",
                    // 	[res[0].stock_quantity - order.stock_quantity, order.item_id], function(err) {
                    // 		if (err) throw error;
                    // 		console.log("Your order has been processed!");
                    // 		option();
                    // 	});
                    option();
                }
                else {
                    console.log("Insufficient quantity.  Please order less of that item, as Bamazon only has " + res[0].stock_quantity + " " + res[0].product_name + " in stock at this moment.");
                    option();
                }
            });
        });
};

function option() {
	inquirer.prompt({
		name: "confirm",
		type: "confirm",
		message: "Continue Shopping?",
		default: true
	}).then(function(response) {
		if (response.confirm === true) {
			runForSale();
		}
		else {
			console.log("Thanks For Shopping. 'Til Next Time!");
		}
	})
}










