DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone", "electronics", 499.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "electronics", 700.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dictionary", "books", 11.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pen", "office supplies", 1.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thesaurus", "books", 14.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana", "grocery", 0.19, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Editor", "software", 49.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoghurt", "grocery", 1.49, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Games", "software", 69.99, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notepad", "office supplies", 8.99, 2);