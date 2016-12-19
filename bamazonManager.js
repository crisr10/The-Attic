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
				addNewItem();
			}
		});
}

// Function created to list each one of the store items
function displayItems() {
	var query = 'SELECT * FROM products';

	// create a query and call back to get the information from the table products inside the database bamazon
	connection.query(query, function(err, res) {
		console.log('-'.repeat(24));

		console.log('ID  |  PRODUCT  |  DEPARTMENT  |  PRICE  |  IN STOCK');
		for (var i=0; i<res.length; i++) {
			console.log(res[i].id+ ' | '+res[i].product_name+' | '+res[i].department_name+' | '+res[i].price+' | '+res[i].stock_quantity+' | ');
		}
		console.log('-'.repeat(24));
		run();
	});
}

// Function created to list each one of the store items
function lowInventory() {
	var  itemsLowInventory = [];
	connection.query('SELECT * FROM products', function(err, res) {
		console.log('-'.repeat(24));
		for (var i=0; i<res.length; i++) {
			if (res[i].stock_quantity<5) {

				console.log('ITEM: '+res[i].product_name+' | IN STOCK: '+res[i].stock_quantity+' | ');
				itemsLowInventory.push(res[i].product_name);
			}
		}
		console.log('-'.repeat(24));
		run();
	});
}

function addInventory() {
	connection.query('SELECT * FROM products', function(err,res) {
		inquirer.prompt(
		{
			type:'list',
			name:'addInventory',
			message:'What item would you like to add to?',
			choices: function(value) {
				var itemsArray = [];
				for (var i=0; i<res.length; i++) {
					itemsArray.push(res[i].product_name);
				}
				return itemsArray;
			}
		}).then(function(answer) {
			var item = answer.addInventory;

				connection.query('SELECT stock_quantity FROM products WHERE ?',{product_name:item}, function(err, res) {
					var inStock = parseInt(res[0].stock_quantity);
					console.log('ITEM: '+item);
					console.log('IN STOCK: '+inStock);
				inquirer.prompt (
				{
					type:'input',
					name:'amountToAdd',
					message:'How many items would you like to add?'
				}).then(function(answer){
					var amountToAdd = parseInt(answer.amountToAdd);
					var newStock = inStock+amountToAdd;
					connection.query('UPDATE products SET ? WHERE ?',[{stock_quantity:newStock},{product_name:item}],function(err,res){
							console.log('ITEM: '+item);
							console.log('OLD STOCK: '+inStock );
							console.log('IN STOCK: '+newStock);
							run();
						});
				});
			});
		});
	});
}

function addNewItem() {
	console.log('add new product');
	inquirer.prompt([
	{
		type:'input',
		name:'product_name',
		message:'Input product name'
	},
	{
		type:'input',
		name:'department_name',
		message:'Input department name'
	},
	{
		type:'input',
		name:'price',
		message:'Input price'
	},
	{
		type:'input',
		name:'stock_quantity',
		message:'Input stock quantity'
	}]).then(function(answer) {
		var newItemName = answer.product_name;
		var department = answer.department_name;
		var price = answer.price;
		var stockQuantity =answer.stock_quantity ;

		connection.query('INSERT INTO products SET ?', {
			product_name:newItemName,
			department_name:department,
			price:price,
			stock_quantity:stockQuantity
		}, function(err,res) {
			console.log('-'.repeat(24));
			console.log('YOUR PRODUCT WAS CREATED SUCCESFULLY!');
			console.log('-'.repeat(24));

			run();
		});
	});
}












