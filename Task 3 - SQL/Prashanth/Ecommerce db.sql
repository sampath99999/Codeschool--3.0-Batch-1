
-- Customers table
CREATE TABLE Customers(
    CustomerID INT NOT NULL, 
    CustomersName VARCHAR(40) NOT NULL, 
    Address VARCHAR(25) NOT NULL, 
    City CHAR(15) NOT NULL, 
    PostalCode INT NOT NULL, 
    Country CHAR(20) NOT NULL
);

INSERT INTO 
    Customers
VALUES 
    (
        1, 
        'Prashanth', 
        'Turka Yamjal', 
        'Hyderabad', 
        501510, 
        'INDIA'
    ),
    (
        2, 
        'Sridhar', 
        'BN Reddy', 
        'Hyderabad', 
        501510, 
        'INDIA'
    ),
    (
        3, 
        'Mani Kumar', 
        '2732 Baker Blvd', 
        'Eugene', 
        97403, 
        'USA'
    ),
    (
        4, 
        'Bhanu Kiran', 
        '1900 Oak St.', 
        'Vancouver', 
        31000, 
        'Canada'
    ),
    (
        5, 
        'Jaya Prakash', 
        'Garden House Crowther Way', 
        'Elgin', 
        97827, 
        'UK'
    ),
    (
        6, 
        'Pradeep', 
        'LB Nagar', 
        'Hyderabad', 
        501510, 
        'INDIA'
    ),
    (
        7, 
        'Gopinath', 
        'Yamjal', 
        'Hyderabad', 
        501510, 
        'INDIA'
    ),
    (
        8, 
        'Sai', 
        'Mangaluru', 
        'Bengaluru', 
        574142, 
        'INDIA'
    ),
    (
        9, 
        'Manasa', 
        'Malkapur', 
        'Vikarabad', 
        501101, 
        'INDIA'
    ),
    (
        10, 
        'Sandhya', 
        'Bramanpally', 
        'Hyderabad', 
        501510, 
        'INDIA'
    ),
    (
        11, 
        'Essra', 
        'Madurai', 
        'TamilNadu',
        625001, 
        'INDIA'
    );

-- products table
CREATE TABLE Products(
    ProductID INT, 
    ProductName VARCHAR(40) NOT NULL, 
    ShippingID INT, 
    Units INT, 
    Price INT
);

INSERT INTO 
    Products
VALUES 
    (1, 'Lenovo AMD Ryzen 5 Laptop', 1, 100, 35990),
    (2, 'Acer Aspire Lite i3 Laptop', 1, 150, 29990),
    (3, 'Vivo Y35 Phone', 2, 20, 15990),
    (4, 'OnePlus 11R 5G Phone', 3, 78, 39990),
    (5, 'Fire-Boltt Ring 3 Smart Watch', 3, 40, 1499),
    (6, 'Noise Twist Round Dial Smart Watch', 2, 40, 1299),
    (7, 'Java Programming Book', 2, 50, 350),
    (8, 'T-shirt', 3, 30, 250),
    (9, 'Chess', 3, 110, 150),
    (10, 'Sofa', 1, 130, 20000),
    (11, 'Charger', 2, 25, 200),
    (12, 'Ipad', 1, 70, 750),
    (13, 'Keyboard', 1, 60, 3500),
    (14, 'Chicken', 3, 10, 350),
    (15, 'VolleyBall', 2, 45, 450);

-- orders table
CREATE TABLE Orders(
    OrderID INT,
    OrderDate date,
    CustomerID INT,
    ShippingID INT
);

INSERT INTO 
    Orders
VALUES
    (10208, '2023-02-14', 9, 1),
    (10209, '2023-03-08', 4, 3),
    (10210, '2023-03-29', 5, 2),
    (10211, '2023-04-08', 5, 2),
    (10212, '2023-05-10', 1, 4),
    (10213, '2023-05-30', 3, 2),
    (10214, '2023-06-01', 4, 1),
    (10215, '2023-06-15', 4, 3),
    (10216, '2023-06-25', 6, 3),
    (10217, '2022-08-15', 7, 2),
    (10218, '2022-12-07', 9, 1),
    (10219, '2023-07-13', 1, 4),
    (10220, '2023-07-28', 4, 2),
    (10221, '2023-08-08', 3, 1),
    (10222, '2023-08-15', 7, 3);

-- OrderDetails
create table OrderDetails(
    OrderID INT,
    ProductID INT,
    primary key( OrderID, ProductID),
    Quantity INT
);

INSERT INTO
    OrderDetails
VALUES
   (10208,9,10),
   (10209,7,35),
   (10210,6,15),
   (10211,15,22),
   (10212,1,12),
   (10213,8,50),
   (10214,7,100),
   (10215,14,150),
   (10216,11,12),
   (10217,10,20),
   (10218,3,45),
   (10219,4,20),
   (10220,5,58),
   (10221,7,150),
   (10222,8,55);


-- Shipping Details
CREATE TABLE Shipping( 
	ShippingID INT,
	OrderStatus VARCHAR(40),
	CustomerID INT
);

INSERT INTO 
    Shipping
VALUES 
    (1, 'in progress',7),
	(2, 'out of delivery',2),
	(3, 'delivered',9),
	(4, 'in transit',4),
	(5, 'delivered',5),
	(6, 'delivered',1),
	(7, 'out of delivered',6),
	(8, 'in progress',5),
	(9, 'in progress',4),
	(10, 'delivered',9),
	(11, 'in transit',10),
	(12, 'in progress',9),
	(13, 'in progress',5),
	(14, 'out of delivered',7),
	(15, 'delivered',2),
	(16, 'delivered',7),
	(17, 'delivered',5),
	(18, 'out of delivered',4),
	(19, 'out of delivered',8),
	(20, 'in progress',10),
	(21, 'delivered',8),
	(22, 'delivered',2),
	(23, 'in transit',11),
	(24, 'delivered',5),
	(25, 'in progress',2),
    (26, 'in transit',1),
	(27, 'out of delivered',8),
	(28, 'out of delivered',5),
	(29, 'out of delivered',10),
	(30, 'delivered',1);

-- Questions 
-- 1.  List all customers with complete details
SELECT * FROM Customers;

-- 2.  list customers who made orders
SELECT DISTINCT c.CustomersName, ARRAY_AGG(p.ProductName) AS product_list
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON od.OrderID = o.OrderID
JOIN Products p ON p.productid = od.productid
GROUP BY c.CustomersName;

-- 3.  list customers who made highest orders
SELECT c.CustomersName, COUNT(o.OrderID) AS order_count
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomersName
ORDER BY order_count DESC
LIMIT 1;

-- 4.  customers wise order amounts with avg amount
SELECT c.CustomersName, SUM(p.price) AS total_amount, AVG(p.price) AS avg_amount
FROM orders o
JOIN Customers c ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
GROUP BY c.CustomersName;

-- 5.  list customers who did not make any order
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderID IS NULL;

-- 6.  list all products with complete details
SELECT * FROM Products;

-- 7.  list only those products which are ordered by customers
SELECT DISTINCT c.CustomersName, p.ProductName
FROM Products p
JOIN OrderDetails od ON od.ProductID = p.ProductID
JOIN Orders o ON od.OrderID = o.OrderID
JOIN Customers c ON c.CustomerID = o.CustomerID;

-- 8.  product wise sale summery
SELECT p.ProductID, p.ProductName, SUM(od.Quantity ) AS total_items_sold, SUM(p.price) AS Total_cost 
FROM Products p
JOIN OrderDetails od ON od.ProductID = p.ProductID
GROUP BY p.ProductID, p.ProductName;

-- 9.  list products which are highest sold
SELECT p.ProductID, p.ProductName, SUM(od.Quantity) AS highest_sold_item
FROM Products p
JOIN OrderDetails od ON od.ProductID = p.ProductID
GROUP BY p.ProductID, p.ProductName
ORDER BY highest_sold_item DESC 
LIMIT 1;

-- 10. list all orders with complete details
SELECT * FROM Orders;

-- 11. list orders which are not shipped yet
SELECT DISTINCT o.OrderID, s.OrderStatus
FROM Orders o
JOIN Shipping s ON s.ShippingID = o.ShippingID
WHERE s.OrderStatus = 'in transit';

-- 12. list all orders with shipping details
SELECT o.*, s.OrderStatus
FROM Orders o
LEFT JOIN Shipping s ON o.ShippingID = s.ShippingID;

-- 13. list all orders which are 'delivered'
SELECT o.*, s.OrderStatus
FROM Orders o
JOIN Shipping s ON o.ShippingID = s.ShippingID
WHERE s.OrderStatus = 'delivered';

-- 14. list all orders which are 'out of delivery'
SELECT o.*, s.OrderStatus
FROM Orders o
JOIN Shipping s ON o.ShippingID = s.ShippingID
WHERE s.OrderStatus = 'out of delivery';

-- 15. list all orders which are 'in-transit'
SELECT o.*, s.OrderStatus
FROM Orders o
JOIN Shipping s ON o.ShippingID = s.ShippingID
WHERE s.OrderStatus = 'in transit';

-- 16. list all orders which are 'in-progress'
SELECT o.*, s.OrderStatus
FROM Orders o
JOIN Shipping s ON o.ShippingID = s.ShippingID
WHERE s.OrderStatus = 'in progress';
