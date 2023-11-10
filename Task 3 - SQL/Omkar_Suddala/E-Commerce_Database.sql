--Category Table
CREATE TABLE
    category (
        CategoryID INT PRIMARY KEY,
        CategoryName VARCHAR(45)
    );

INSERT INTO
    category
VALUES
    (1, 'Electronics'),
    (2, 'Fashion'),
    (3, 'HomeDecor'),
    (4, 'Books'),
    (5, 'Sports'),
    (6, 'Beauty'),
    (7, 'Grocery');

--Customer Table
CREATE TABLE
    customers (
        CustomerID INT NOT NULL,
        CustomerName VARCHAR(45) NOT NULL,
        CustomerNumber VARCHAR(45) NOT NULL,
        CustomerAddress VARCHAR(45) NULL,
        CustomerCity VARCHAR(45) NULL,
        PRIMARY KEY (CustomerID)
    );

INSERT INTO
    customers
VALUES
    (
        1,
        'Omkar',
        '8008457914',
        '4-48 nangunoor 502280',
        'Siddipet'
    ),
    (
        2,
        'Ram',
        '7989850009',
        '4-12 Kamalapur 501289',
        'Warangal'
    ),
    (
        3,
        'Sujith',
        '7894561328',
        '8/9-48 Manikonda 500008',
        'Hyderabad'
    ),
    (
        4,
        'Nitej',
        '7896741238',
        '78/2-82 ChaitanyaPuri 500002',
        'Secundrabad'
    ),
    (
        5,
        'Vijay',
        '8523697410',
        '7/8-9 vidyanagar 507895',
        'Suryapet'
    ),
    (
        6,
        'Manoj',
        '6321457893',
        '6-25 MadhuraNagar 500125',
        'Yusufguda'
    ),
    (
        7,
        'Surya',
        '8573695420',
        '6/2-89 KBHP 500012',
        'Kukatpally'
    ),
    (
        8,
        'Nikhil',
        '6321457895',
        '126/72-1b HMT 500325',
        'Miyapur'
    ),
    (
        9,
        'Rishi',
        '8321497654',
        '57/89-5 Allapur 500018',
        'Madhapur'
    ),
    (
        10,
        'Chandhu',
        '7386945218',
        '106/58-2 ParvathNagar 500046',
        'JubleeHills'
    );

--Orders Table
CREATE TABLE
    orders (
        OrderID INT NOT NULL,
        OrderDate date,
        CustomerID INT,
        PRIMARY KEY (OrderID),
        FOREIGN KEY (CustomerID) REFERENCES customers (CustomerID)
    );

INSERT INTO
    orders
VALUES
    (20013, '2022-02-15', 5),
    (20014, '2022-04-20', 2),
    (20015, '2022-06-10', 8),
    (20016, '2022-08-03', 4),
    (20017, '2022-10-19', 9),
    (20018, '2022-12-05', 7),
    (20019, '2022-01-29', 1),
    (20020, '2022-03-18', 6),
    (20021, '2022-05-22', 3),
    (20022, '2022-07-11', 10),
    (20023, '2022-09-14', 5),
    (20024, '2022-11-30', 2),
    (20025, '2022-02-08', 8),
    (20026, '2022-04-09', 4),
    (20027, '2022-06-25', 9),
    (20028, '2022-08-17', 7),
    (20029, '2022-10-11', 1),
    (20030, '2022-12-30', 6),
    (20031, '2022-01-05', 3),
    (20032, '2022-03-02', 10),
    (20033, '2022-05-15', 5),
    (20034, '2022-07-06', 2),
    (20035, '2022-09-28', 8),
    (20036, '2022-11-23', 4),
    (20038, '2022-09-07', 7),
    (20039, '2022-06-04', 8),
    (20040, '2022-04-02', 7),
    (20041, '2022-03-11', 9),
    (20042, '2022-04-18', 5),
    (20043, '2022-05-16', 10),
    (20044, '2022-07-25', 1),
    (20045, '2022-07-11', 2);

--Products Table
CREATE TABLE
    products (
        ProductID INT NOT NULL,
        ProductName VARCHAR(45),
        CategoryID INT,
        Units INT,
        Price INT,
        PRIMARY KEY (ProductID),
        FOREIGN KEY (CategoryID) REFERENCES category (CategoryID)
    );

INSERT INTO
    products
VALUES
    (1, 'Laptop', 1, 50, 1200),
    (2, 'Smartwatch', 5, 30, 300),
    (3, 'T-shirt', 2, 100, 20),
    (4, 'Sofa', 3, 10, 800),
    (5, 'Python Programming Book', 4, 20, 50),
    (6, 'Football', 5, 15, 30),
    (7, 'Makeup Kit', 6, 25, 100),
    (8, 'Milk', 7, 50, 3),
    (9, 'Smartphone', 1, 40, 900),
    (10, ' Jeans', 2, 8, 40),
    (11, ' Desk Lamp', 3, 30, 50),
    (12, ' Fiction Novel', 4, 15, 25),
    (13, ' Basketball', 5, 20, 25),
    (14, ' Lipstick', 6, 20, 15),
    (15, ' Bread', 7, 100, 2),
    (16, ' Desktop Computer', 1, 20, 1500),
    (17, ' Dress', 2, 70, 60),
    (18, ' Wall Art', 3, 25, 100),
    (19, ' Science Book', 4, 30, 40),
    (20, ' Tennis Racket', 5, 10, 50),
    (21, ' Foundation', 6, 30, 25),
    (22, ' Eggs', 7, 8, 4);

--OrderDetails 
CREATE TABLE
    OrderDetails (
        OrderDetailsID INT,
        OrderID INT,
        ProductID INT,
        Quantity INT,
        PRIMARY KEY (OrderDetailsID),
        FOREIGN KEY (OrderID) REFERENCES orders (OrderID),
        FOREIGN KEY (ProductID) REFERENCES products (ProductID)
    );

INSERT INTO
    OrderDetails
VALUES
    (1, 20013, 1, 5),
    (2, 20014, 2, 3),
    (3, 20015, 3, 2),
    (4, 20016, 4, 4),
    (5, 20017, 5, 1),
    (6, 20018, 6, 2),
    (7, 20019, 7, 3),
    (8, 20020, 8, 2),
    (9, 20021, 9, 1),
    (10, 20022, 10, 4),
    (11, 20023, 11, 3),
    (12, 20024, 12, 2),
    (13, 20025, 13, 5),
    (14, 20026, 14, 4),
    (15, 20027, 15, 3),
    (16, 20028, 16, 2),
    (17, 20029, 17, 1),
    (18, 20030, 18, 3),
    (19, 20031, 19, 4),
    (20, 20032, 20, 5),
    (21, 20033, 21, 2),
    (22, 20014, 2, 3),
    (23, 20015, 3, 2),
    (24, 20016, 4, 4),
    (25, 20017, 5, 1),
    (26, 20018, 6, 2),
    (27, 20019, 7, 3),
    (28, 20020, 8, 2),
    (29, 20014, 2, 3),
    (30, 20015, 1, 2),
    (31, 20016, 2, 4),
    (32, 20017, 11, 1),
    (34, 20018, 11, 2),
    (35, 20019, 12, 3),
    (36, 20020, 2, 2);

--Shipping Table
CREATE TABLE
    shipping (
        ShipingID INT PRIMARY KEY,
        Orderstatus VARCHAR(45),
        CustomerID INT,
        FOREIGN KEY (CustomerID) REFERENCES customers (CustomerID)
    );

INSERT INTO
    shipping
VALUES
    (1, 'Delivered', 5),
    (2, 'Pending', 8),
    (3, 'Delivered', 3),
    (4, 'Delivered', 6),
    (5, 'Pending', 2),
    (6, 'Pending', 7),
    (7, 'Delivered', 1),
    (8, 'Pending', 4),
    (9, 'Delivered', 10),
    (10, ' Pending', 9),
    (11, ' Delivered', 5),
    (12, ' Delivered', 4),
    (13, ' Pending', 3),
    (14, ' Delivered', 10),
    (15, ' Pending', 7),
    (16, ' Delivered', 6),
    (17, ' Pending', 2),
    (18, ' Delivered', 1),
    (19, ' Delivered', 8),
    (20, ' Pending', 9),
    (21, ' Delivered', 5),
    (22, ' Pending', 6),
    (23, ' Delivered', 4),
    (24, ' Delivered', 7),
    (25, ' Pending', 3),
    (26, ' Pending', 10),
    (27, ' Delivered', 2),
    (28, ' Pending', 1),
    (29, ' Delivered', 8),
    (30, ' Delivered', 9),
    (31, ' Pending', 5),
    (32, ' Delivered', 6),
    (33, ' Pending', 4),
    (34, ' Delivered', 3),
    (35, ' Pending', 7),
    (36, ' Delivered', 1);

--Questions And Answers 
--1. is the total revenue for each category?
Select
    p.CategoryID,
    SUM(price) as TotalRevenue
From
    products p
    LEFT JOIN category c ON c.CategoryID = p.CategoryID
GROUP BY
    p.CategoryID;

--2. Which customer has the most orders?
SELECT
    CustomerID,
    COUNT(CustomerID) AS MostOrders
FROM
    orders
GROUP BY
    CustomerID
ORDER BY
    COUNT(CustomerID) DESC LIMIT 1;

--3. What is the average order value for each customer?
SELECT
    o.CustomerID,
    AVG(p.price) AS AveragePrice
FROM
    products p
    INNER JOIN orderdetails od ON od.ProductID = p.ProductID
    INNER JOIN Orders o ON o.OrderID = od.OrderID
GROUP BY
    o.customerID;

--4. What is the total revenue for each month?
SELECT
    DATE_FORMAT (OrderDate, '%Y-%m') AS Month,
    SUM(p.price) AS TotalRevenue
FROM
    Orders o
    INNER JOIN OrderDetails od ON o.OrderID = od.OrderID
    INNER JOIN products p ON p.ProductID = od.ProductID
GROUP BY
    DATE_FORMAT (OrderDate, '%Y-%m')
ORDER BY
    DATE_FORMAT (OrderDate, '%Y-%m');

--5. Which products have been ordered the most and how many times?
SELECT
    ProductID,
    COUNT(OrderID) AS OrderId
From
    OrderDetails
GROUP BY
    ProductID
ORDER BY
    COUNT(OrderID) DESC;

--6. Which customers have ordered a particular product and how many times?
SELECT
    o.CustomerID,
    COUNT(od.ProductID) AS ProductsCount
FROM
    orders o
    INNER JOIN OrderDetails od ON o.OrderID = od.OrderID
WHERE
    od.ProductID = 2
GROUP BY
    o.CustomerID;

--7. What is the average order value for each month?
SELECT
    DATE_FORMAT (OrderDate, '%Y-%m') AS Month,
    AVG(p.price) AS AverageRevenuePerMonth
FROM
    Orders o
    INNER JOIN OrderDetails od ON o.OrderID = od.OrderID
    INNER JOIN products p ON p.ProductID = od.ProductID
GROUP BY
    DATE_FORMAT (OrderDate, '%Y-%m')
ORDER BY
    DATE_FORMAT (OrderDate, '%Y-%m');

--8. What is the average quantity ordered for each product?
SELECT
    p.ProductID,
    p.ProductName,
    AVG(od.Quantity) AS AvgQuantityOrdered
FROM
    products p
    LEFT JOIN OrderDetails od ON p.ProductID = od.ProductID
GROUP BY
    p.ProductID,
    p.ProductName
ORDER BY
    p.ProductID;

--9. Which category has the highest revenue per customer on average?
SELECT
    p.CategoryID,
    AVG(p.price) / COUNT(o.CustomerID) AS AvgRevenuePerCustomer
FROM
    Orders o
    JOIN OrderDetails od ON o.OrderID = od.OrderID
    JOIN Products p ON od.ProductID = p.ProductID
GROUP BY
    p.CategoryID
ORDER BY
    AvgRevenuePerCustomer DESC LIMIT 1;

--10. What is the total revenue for each status and month combination?
SELECT
    DATE_FORMAT (OrderDate, '%Y-%m') AS Month,
    OrderStatus,
    SUM(p.price) AS TotalRevenue
FROM
    Orders o
    INNER JOIN OrderDetails od ON o.OrderID = od.OrderID
    INNER JOIN products p ON p.ProductID = od.ProductID
    INNER JOIN shipping s ON o.CustomerID = s.CustomerID
GROUP BY
    DATE_FORMAT (OrderDate, '%Y-%m'),
    OrderStatus
ORDER BY
    Month,
    OrderStatus;