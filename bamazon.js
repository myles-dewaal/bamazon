var mysql = require("mysql");
var inquire = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful");
    makeTable();
});
var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ID + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");

        }
        promptCustomer(res);
    })
}
var promptCustomer = function (res) {
    inquire.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Quit with Q]",
        validate: function (value) {
            return (value > 0) || value.toLowerCase() === "q"

        }
    }]).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() === "Q") {
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].ID === (answer.choice *1)) {
                var product = answer.choice;
                var id = i;
                inquire.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if (res[id].stock_quantity > 0) {
                        connection.query("UPDATE products SET stock_quantity= '" + (res[id].stock_quantity - answer.quantity) + "'WHERE product_name='" + res[id].product_name + "'", function (err, res2) {
                            console.log("Product Bought!")
                            makeTable();
                        })
                    } else {
                        console.log("Not a valid selection.");
                        promptCustomer(res);
                    }
                })
            }
        }

    })
}
