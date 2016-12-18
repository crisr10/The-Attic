var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

run();

// Function created to start the app
function run() {
	inquirer.prompt(
	{
		type:'list',
		name:'managerOptions',
		message:'What would you like to do?',
		choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
	}).then(function(answer) {
		var choice = answer.managerOptions;
		if (choice==='View Products for Sale') {
			displayItems();
		} else if (choice==='View Low Inventory') {
			lowInventory();
		} else if (choice==='Add to Inventory') {
			addInventory();
		} else if (choice==='Add New Product') {

		}
	});
}

// Function created to list each one of the store items
function displayItems() {
	var query = 'SELECT * FROM products';

	// create a query and call back to get the information from the table products inside the database bamazon
	connection.query(query, function(err, res) {

	console.log('\nID  |  PRODUCT  |  DEPARTMENT  |  PRICE  |  IN STOCK');
		for (var i=0; i<res.length; i++) {
			console.log(res[i].id+ ' | '+res[i].product_name+' | '+res[i].department_name+' | '+res[i].price+' | '+res[i].stock_quantity+' | ');
		}
		console.log("-".repeat(24));
		run();
	});

}

// Function created to list each one of the store items
function lowInventory() {
	connection.query('SELECT * FROM products', function(err, res) {

		for (var i=0; i<res.length; i++) {
			if (res[i].stock_quantity<5) {

				console.log(res[i].id+ ' | '+res[i].product_name+' | '+res[i].department_name+' | '+res[i].price+' | '+res[i].stock_quantity+' | ');
			}
		}
		console.log("-".repeat(24));
		run();
	});
}

function addInventory() {
	inquirer.prompt();
}












