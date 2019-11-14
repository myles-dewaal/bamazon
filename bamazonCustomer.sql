CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    ID INTEGER NOT NULL,
    product_name VARCHAR(20),
    department_name VARCHAR(20),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (ID)
);

INSERT INTO products (
    product_name, department_name, price, stock_quantity
) VALUES ("Shampoo","Cosmetics",5.99,145);

INSERT INTO products (
    product_name, department_name, price, stock_quantity
) VALUES ("Dog Food","Pet Supplies",26.00,2);

INSERT INTO products (
    product_name, department_name, price, stock_quantity
) VALUES ("Sunglasses","Accessories",14.99,15);

INSERT INTO products (
    product_name, department_name, price, stock_quantity
) VALUES ("Pencil","Art Supplies",.75,2005);

