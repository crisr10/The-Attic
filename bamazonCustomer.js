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

function run() {
	displayItems();
	buy();
}

function displayItems() {
	var query = 'SELECT * FROM products';
	connection.query(query, function(err, res) {

	console.log('\n ID | PRODUCT | DEPARTMENT | PRICE | IN STOCK');
		for (var i=0; i<res.length; i++) {
			console.log(res[i].id+ ' | '+res[i].product_name+' | '+res[i].department_name+' | '+res[i].price+' | '+res[i].stock_quantity+' | ');
		}
		console.log("-".repeat(24));
	});
}

function buy() {
	var query = 'SELECT * FROM products';
	connection.query(query, function(err, res) {
		inquirer.prompt(
		{
			type:'list',
			name:'item_id',
			message:'Select the ID of the item you would like to purchase.',
			choices: ['1','2','3','4','5','6','7','8','9','10']

		}).then(function(answer) {
			console.log('ITEM: '+answer.name);
		});
	});
}
