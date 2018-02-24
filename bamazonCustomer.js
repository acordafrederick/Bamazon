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
		.then(function(answer) {
			var item = answer.item_id;
			var quantity = answer.stock_quantity;
			var query = "SELECT * FROM products WHERE ?";
			connection.query(query, {item_id: item}, function(err, res) {
				if (err) throw err;
				var 
			});
		});
}










