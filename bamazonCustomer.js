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
	displayItems();
}

// Function created to list each one of the store items
function displayItems() {
	var query = 'SELECT * FROM products';
	// create a query and call back to get the information from the table products inside the database bamazon
	connection.query(query, function(err, res) {

	console.log('\n ID | PRODUCT | DEPARTMENT | PRICE | IN STOCK');
		for (var i=0; i<res.length; i++) {
			console.log(res[i].id+ ' | '+res[i].product_name+' | '+res[i].department_name+' | '+res[i].price+' | '+res[i].stock_quantity+' | ');
		}
		console.log("-".repeat(24));
		buy();
	});
}

// Inquirer function to retreive and change data from the database
function buy() {
	inquirer.prompt([
	{
		type:'list',
		name:'item_id',
		message:'Select the ID of the item you would like to purchase.',
		choices: ['1','2','3','4','5','6','7','8','9','10']
	},
	{
		type:'input',
		name:'howMany',
		message:'How many units would you like to purchase?'
	}]).then(function(answer) {
		var query = 'SELECT * FROM products WHERE ?';
		connection.query(query, {id:answer.item_id}, function(err, res) {
			var item = res[0].product_name;
			var inStock = parseInt(res[0].stock_quantity);
			var amountWanted = parseInt(answer.howMany);
			var price = parseInt(res[0].price);
			if (amountWanted>inStock) {
				console.log('-'.repeat(25));
				console.log('Insufficient quantity!');
				console.log('-'.repeat(25));
				buy();
			} else {
				var newStock = inStock-amountWanted;
				var amountToPay = amountWanted*price;
				console.log('ITEM: '+item);
				console.log('LEFT IN STOCK: '+newStock);
				connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity:newStock}, {id:answer.item_id}], function(err,res){
				});
				console.log('YOUR TOTAL IS: $'+amountToPay);
				// console.log('NEW STOCK:'+newStock);
				// connection.query('UPDATE products SET ?')
				run();

			}
		});
	});
}



