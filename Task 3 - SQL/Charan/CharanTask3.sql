select * from customers;
select * from orders;
select * from orderdetails;
select * from products;
select * from shipperdetails;
select * from shippers;


-- List all customers with complete details
select * from customers;

-- List customers who made orders
SELECT DISTINCT c.customername, o.orderid
FROM customers c
JOIN orders o ON o.customerid = c.customerid order by orderid asc;





-- List customers who made highest orders
SELECT CustomerName, COUNT(CustomerName) AS order_count
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
GROUP BY CustomerName
HAVING COUNT(CustomerName) = (
    SELECT MAX(order_count)
    FROM (
        SELECT COUNT(CustomerName) AS order_count
        FROM customers
        JOIN orders ON customers.CustomerID = orders.CustomerID
        GROUP BY CustomerName
    ) AS subquery
);

-- Customer wise order amounts with average amount
SELECT
    c.customername,
    SUM(od.quantity * p.price) AS total_cost,
    AVG(od.quantity * p.price) AS average_cost
FROM
    customers c
JOIN
    orders o ON c.customerid = o.customerid
JOIN
    orderdetails od ON o.orderid = od.orderid
JOIN
    products p ON od.productid = p.productid
GROUP BY
    c.customername;
	
-- List customers who did not make any order
SELECT c.customername,o.orderid
FROM customers c
left JOIN orders o ON c.CustomerID = o.CustomerId where orderid is null;
-- exists

-- List all products with complete details
select*from products;

-- List only those products which are ordered by customers -- rewrite
select distinct(p.productname
from customers c
join orders o on c.customerid = o.customerid
join orderdetails od on od.orderid = o.orderid
join products p on p.productid = od.productid;


-- product wise sale summery --rewrite
select p.productid,p.productname,p.totalitems,od.quantity as items_sold,totalitems-quantity as itemsleft
from orderdetails od join products p on od.productid = p.productid ;


-- List products which are highest sold
select p.productname,sum(od.quantity) as total
from orderdetails od join products p on p.productid = od.productid group by p.productname order by total desc;



-- List all orders with complete details
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
order by p.productid asc;


-- List orders which are not shipped yet
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
where sd.shippeing_status = 'notshipped'
order by p.productid asc;


-- List all orders with shipping details
select o.orderid,sd.shipperid,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
order by p.productid asc;


-- -- List all orders which are delivered
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
where sd.shippeing_status = 'delivered'
order by p.productid asc;

-- List all orders which are out for delivery
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
where sd.shippeing_status = 'outofdelivery'
order by p.productid asc;

-- in transit
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
where sd.shippeing_status = 'transit'
order by p.productid asc;

-- in process
select o.orderid,c.customername,p.productname,s.shippername,sd.shippeing_status
from orders o 
join customers c on o.customerid = c.customerid
join orderdetails od on od.orderid = o.orderid
join products p on od.productid = p.productid
join shipperdetails sd on sd.orderid = o.orderid
join shippers s on sd.shipperid = s.shipperid
where sd.shippeing_status = 'inprocess'
order by p.productid asc;








