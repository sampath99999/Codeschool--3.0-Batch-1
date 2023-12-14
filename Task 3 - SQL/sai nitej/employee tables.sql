USE DATABASE pixelvide;
CREATE TABLE WorkingDetails(
    workingStatus_id INT AUTO_INCREMENT PRIMARY KEY,
    workingStatus VARCHAR(100)
);
CREATE TABLE locationDetails(
    Location_id INT AUTO_INCREMENT  PRIMARY KEY,
    District VARCHAR(100)
);
CREATE TABLE designation(
    designation_id INT AUTO_INCREMENT  PRIMARY KEY,
    designation VARCHAR(100)
);
CREATE TABLE employees(  
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    dob DATE,
    doj DATE,
    gender VARCHAR(100),
    phone BIGINT,
    workingStatus_id INT,
    designation_id INT,
    Location_id INT,
    Gross INT ,
    created_at TIMESTAMP, 
    FOREIGN KEY (workingStatus_id) REFERENCES WorkingDetails(workingStatus_id),
    FOREIGN KEY (designation_id) REFERENCES designation(designation_id),
    FOREIGN KEY (Location_id) REFERENCES locationDetails(Location_id)
);
CREATE TABLE SalaryComponents(
    Salary_components_id INT AUTO_INCREMENT PRIMARY KEY,
    SalaryComponents varchar(100),
    type integer
);
CREATE TABLE Salaries(
    salaries_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    month INT,
    year INT,
    paid_on DATE,
    SalaryAmount BIGINT,
    NetAmount BIGINT,
    deduction BIGINT,
    created_at TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
CREATE TABLE salaryDetails(
    salary_details_id INT  ,
    salaries_id INT,
    Salary_components_id INT,
    Gross INT,
    Created_at TIMESTAMP,
    FOREIGN KEY (salaries_id) REFERENCES Salaries(salaries_id),
    FOREIGN KEY (Salary_components_id) REFERENCES SalaryComponents(Salary_components_id)
);

INSERT INTO WorkingDetails (workingStatus)
VALUES
    ('working'),
    ('expired'),
    ('retired'),
    ('suspended');
INSERT INTO designation(designation)
VALUES
    ('Developer'),
    ('HR'),
    ('Tester'),
    ('Operations'),
    ('Manager');
INSERT INTO locationDetails(District)
VALUES
    ('Nizambad'),
    ('Hyderabad'),
    ('Mahbubnagar'),
    ('Adilabad'),
    ('Medak'),
    ('Guntur');
INSERT INTO employees(FirstName, LastName, doj, dob, gender, phone, workingStatus_id, designation_id, Location_id,Gross,Created_at)
VALUES
    ('John','Doe','2002-05-12','1985-09-21','Male',1234567890,1,1,2,2800,now()), 
    ('Emily','Smith','2003-07-04','1961-11-15','Female',2345678901,3,2,1,3300,now()),
    ('Michael','Johnson','2005-10-19','1980-03-30','Male',3456789012,4,5,4,3800,now()),
    ('Olivia','Williams','2007-12-25','1992-07-07','Female',4567890123,1,4,2,3300,now()), 
    ('William','Brown','2009-02-28','1979-05-19','Male',5678901234,1,5,1,2300,now()),
    ('Sophia','Jones','2010-04-03','1962-12-03','Female',6789012345,3,1,5,3800,now()),
    ('Benjamin',' Davis','2012-06-17','1987-08-11','Male',7890123456,1,3,3,4300,now()),
    ('Ava','Garcia','2014-08-21 ','1990-01-25','Female',8901234567, 1,4,2,4300,now()),
    ('James',' Martinez ',' 2016-10-31 ',' 1983-04-12', 'Male   ', 9012345678 , 4 , 2, 2, 4300,now()),
    ('Isabella ',' Rodriguez ',' 2018-01-06 ',' 1998-10-29', 'Female ', 0123456789 , 1 , 1, 3, 3800,now()),
    ('Daniel ',' Miller',' 2020-03-11 ',' 1989-06-17', 'Male   ', 1234567890 , 1, 2, 2, 3800,now()),
    ('Mia ',' Wilson',' 2021-05-16 ',' 1960-02-14', 'Female ', 2345678901 , 1 , 3, 1, 4100,now()),
    ('Alexander ',' Moore ',' 2004-09-23 ',' 1960-12-05', 'Male   ', 3456789012 , 3 , 5, 1,4100,now()),
    ('Charlotte ',' Taylor ',' 2006-11-28 ',' 1991-07-23', 'Female ', 4567890123 , 1 , 1, 2, 4100,now()),
    ('Henry ',' Anderson ',' 2008-01-01 ',' 1996-03-20', 'Male   ', 5678901234 , 1 , 2, 5, 3700,now()),
    ('Amelia',' Thomas',' 2011-04-05 ',' 1986-09-10', 'Female ', 6789012345 , 2 , 3, 1, 3800,now()),
    ('Samuel',' Jackson',' 2013-06-20 ',' 1994-05-27', 'Male   ', 7890123456 , 3 , 4, 5, 3800,now()),
    ('Luna',' White',' 2015-08-24 ',' 1981-11-01', 'Female ', 8901234567 , 3 , 5, 4, 3500,now()),
    ('Oliver ',' Harris ',' 2017-10-02 ',' 1997-08-08', 'Male   ', 9012345678 , 3 , 2, 1, 3700,now()),
    ('Lily',' Martin ',' 2019-12-07 ',' 1997-08-08', 'Female ', 0123456789 , 1 , 1, 2, 3800,now());
select * from employees;
TRUNCATE TABLE employees;
INSERT INTO SalaryComponents(SalaryComponents,type) 
VALUES 
    ('Basic Pay', 1),  
    ('HRA', 1),  
    ('CCA', 1), 
    ('DA', 1),  
    ('Medical allowance', 1),  
    ('Bonus', 1),  
    ('PT', 2),  
    ('IT', 2);
INSERT INTO Salaries(employee_id,month,year,paid_on,Created_at,SalaryAmount,deduction,NetAmount)
VALUES
    (1, 11, 2023, '2023-11-03', now(), 2800, 120, 2680),
    (1, 10, 2023, '2023-10-03', now(), 2800, 120, 2680),
    (1, 9, 2023, '2023-09-03', now(), 2800, 120, 2680),
    (1, 8, 2023, '2023-08-03', now(), 2800, 120, 2680),
    (1, 7, 2023, '2023-07-03', now(), 2800, 120, 2680),
    (2, 11, 2021, '2021-11-03', now(), 3300, 300, 3000),
    (2, 10, 2021, '2021-10-03', now(), 3300, 300, 3000),
    (2, 9, 2021, '2021-09-03', now(), 3300, 300, 3000),
    (2, 8, 2021, '2021-08-03', now(), 3300, 300, 3000),
    (2, 7, 2021, '2021-07-03', now(), 3300, 300, 3000),
    (3, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (3, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (3, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (3, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (3, 7, 2023, '2023-07-03', now(), 3800, 400, 3400),
    (4, 11, 2023, '2023-11-03', now(), 3300, 300, 3000),
    (4, 10, 2023, '2023-10-03', now(), 3300, 300, 3000),
    (4, 9, 2023, '2023-09-03', now(), 3300, 300, 3000),
    (4, 8, 2023, '2023-08-03', now(), 3300, 300, 3000),
    (4, 7, 2023, '2023-07-03', now(), 3300, 300, 3000),
    (5, 11, 2023, '2023-11-03', now(), 2300, 200, 2100),
    (5, 10, 2023, '2023-10-03', now(), 2300, 200, 2100),
    (5, 9, 2023, '2023-09-03', now(), 2300, 200, 2100),
    (5, 8, 2023, '2023-08-03', now(), 2300, 200, 2100),
    (5, 7, 2023, '2023-07-03', now(), 2300, 200, 2100),
    (6, 11, 2022, '2022-11-03', now(), 3800, 400, 3400),
    (6, 10, 2022, '2022-10-03', now(), 3800, 400, 3400),
    (6, 9, 2022, '2022-09-03', now(), 3800, 400, 3400),
    (6, 8, 2022, '2022-08-03', now(), 3800, 400, 3400),
    (6, 7, 2022, '2022-07-03', now(), 3800, 400, 3400),
    (7, 11, 2023, '2023-11-03', now(), 4300, 300, 4000),
    (7, 10, 2023, '2023-10-03', now(), 4300, 300, 4000),
    (7, 9, 2023, '2023-09-03', now(), 4300, 300, 4000),
    (7, 8, 2023, '2023-08-03', now(), 4300, 300, 4000),
    (7, 7, 2023, '2023-07-03', now(), 4300, 300, 4000),
    (8, 11, 2023, '2023-11-03', now(), 4300, 300, 4000),
    (8, 10, 2023, '2023-10-03', now(), 4300, 300, 4000),
    (8, 9, 2023, '2023-09-03', now(), 4300, 300, 4000),
    (8, 8, 2023, '2023-08-03', now(), 4300, 300, 4000),
    (8, 7, 2023, '2023-07-03', now(), 4300, 300, 4000),
    (9, 11, 2023, '2023-11-03', now(), 4300, 300, 4000),
    (9, 10, 2023, '2023-10-03', now(), 4300, 300, 4000),
    (9, 9, 2023, '2023-09-03', now(), 4300, 300, 4000),
    (9, 8, 2023, '2023-08-03', now(), 4300, 300, 4000),
    (9, 7, 2023, '2023-07-03', now(), 4300, 300, 4000),
    (10, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (10, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (10, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (10, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (10, 7, 2023, '2023-07-03', now(), 3800, 400, 3400),
    (11, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (11, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (11, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (11, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (11, 7, 2023, '2023-07-03', now(), 3800, 400, 3400),
    (12, 11, 2020, '2020-11-03', now(), 4100, 200, 3900),
    (12, 10, 2020, '2020-10-03', now(), 4100, 200, 3900),
    (12, 9, 2020, '2020-09-03', now(), 4100, 200, 3900),
    (12, 8, 2020, '2020-08-03', now(), 4100, 200, 3900),
    (12, 7, 2020, '2020-07-03', now(), 4100, 200, 3900),
    (13, 11, 2020, '2020-11-03', now(), 4100, 200, 3900),
    (13, 10, 2020, '2020-10-03', now(), 4100, 200, 3900),
    (13, 9, 2020, '2020-09-03', now(), 4100, 200, 3900),
    (13, 8, 2020, '2020-08-03', now(), 4100, 200, 3900),
    (13, 7, 2020, '2020-07-03', now(), 4100, 200, 3900),
    (14, 11, 2023, '2023-11-03', now(), 4100, 200, 3900),
    (14, 10, 2023, '2023-10-03', now(), 4100, 200, 3900),
    (14, 9, 2023, '2023-09-03', now(), 4100, 200, 3900),
    (14, 8, 2023, '2023-08-03', now(), 4100, 200, 3900),
    (14, 7, 2023, '2023-07-03', now(), 4100, 200, 3900),
    (15, 11, 2023, '2023-11-03', now(), 3700, 200, 3500),
    (15, 10, 2023, '2023-10-03', now(), 3700, 200, 3500),
    (15, 9, 2023, '2023-09-03', now(), 3700, 200, 3500),
    (15, 8, 2023, '2023-08-03', now(), 3700, 200, 3500),
    (15, 7, 2023, '2023-07-03', now(), 3700, 200, 3500),
    (16, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (16, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (16, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (16, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (16, 7, 2023, '2023-07-03', now(), 3800, 400, 3400),
    (17, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (17, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (17, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (17, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (17, 7, 2023, '2023-07-03', now(), 3800, 400, 3400),
    (18, 11, 2023, '2023-11-03', now(), 3500, 200, 3300),
    (18, 10, 2023, '2023-10-03', now(), 3500, 200, 3300),
    (18, 9, 2023, '2023-09-03', now(), 3500, 200, 3300),
    (18, 8, 2023, '2023-08-03', now(), 3500, 200, 3300),
    (18, 7, 2023, '2023-07-03', now(), 3500, 200, 3300),
    (19, 11, 2023, '2023-11-03', now(), 3700, 200, 3500),
    (19, 10, 2023, '2023-10-03', now(), 3700, 200, 3500),
    (19, 9, 2023, '2023-09-03', now(), 3700, 200, 3500),
    (19, 8, 2023, '2023-08-03', now(), 3700, 200, 3500),
    (19, 7, 2023, '2023-07-03', now(), 3700, 200, 3500),
    (20, 11, 2023, '2023-11-03', now(), 3800, 400, 3400),
    (20, 10, 2023, '2023-10-03', now(), 3800, 400, 3400),
    (20, 9, 2023, '2023-09-03', now(), 3800, 400, 3400),
    (20, 8, 2023, '2023-08-03', now(), 3800, 400, 3400),
    (20, 7, 2023, '2023-07-03', now(), 3800, 400, 3400);
INSERT INTO salaryDetails(salary_details_id,salaries_id,Salary_components_id,Gross,Created_at) 
VALUES
(1,1, 1, 2500,now()),
(1,1, 2, 100,now()),
(1,1, 3, 100,now()),
(1,1, 4, 100,now()),
(1,1, 5, 60,now()),
(1,1, 6, 60,now()),
(1,1,7,200,now()),
(1,1,8,300,now()),

(2,6, 1, 3000,now()),
(2,6, 2, 100,now()),
(2,6, 3, 100,now()),
(2,6, 4, 100,now()),
(2,6, 5, 70,now()),
(2,6, 6, 70,now()),
(2,6,7,200,now()),
(2,6,8,300,now()),

(3,11, 1, 3500,now()),
(3,11, 2, 100,now()),
(3,11, 3, 100,now()),
(3,11, 4, 100,now()),
(3,11, 5, 80,now()),
(3,11, 6, 80,now()),
(3,11,7,200,now()),
(3,11,8,300,now()),

(4,16, 1, 2000,now()),
(4,16, 2, 100,now()),
(4,16, 3, 100,now()),
(4,16, 4, 100,now()),
(4,16, 5, 50,now()),
(4,16, 6, 50,now()),
(4,16,7,200,now()),
(4,16,8,300,now()),

(5,21, 1, 2000,now()),
(5,21, 2, 100,now()),
(5,21, 3, 100,now()),
(5,21, 4, 100,now()),
(5,21, 5, 40,now()),
(5,21, 6, 40,now()),
(5,21,7,200,now()),
(5,21,8,300,now()),

(6,26, 1, 3500,now()),
(6,26, 2, 100,now()),
(6,26, 3, 100,now()),
(6,26, 4, 100,now()),
(6,26, 5, 80,now()),
(6,26, 6, 80,now()),
(6,26,7,200,now()),
(6,26,8,300,now()),

(7,31, 1, 4000,now()),
(7,31, 2, 100,now()),
(7,31, 3, 100,now()),
(7,31, 4, 100,now()),
(7,31, 5, 100,now()),
(7,31, 6, 90,now()),
(7,31,7,200,now()),
(7,31,8,300,now()),

(8,36, 1, 4000,now()),
(8,36, 2, 100,now()),
(8,36, 3, 100,now()),
(8,36, 4, 100,now()),
(8,36, 5, 100,now()),
(8,36, 6, 100,now()),
(8,36,7,200,now()),
(8,36,8,300,now()),

(9,41, 1, 4000,now()),
(9,41, 2, 100,now()),
(9,41, 3, 100,now()),
(9,41, 4, 100,now()),
(9,41, 5, 100,now()),
(9,41, 6, 100,now()),
(9,41,7,200,now()),
(9,41,8,300,now()),

(10,46, 1, 3500,now()),
(10,46, 2, 100,now()),
(10,46, 3, 100,now()),
(10,46, 4, 100,now()),
(10,46, 5, 80,now()),
(10,46, 6, 80,now()),
(10,46,7,200,now()),
(10,46,8,300,now()),

(11,51, 1, 3500,now()),
(11,51, 2, 100,now()),
(11,51, 3, 100,now()),
(11,51, 4, 100,now()),
(11,51, 5, 80,now()),
(11,51, 6, 80,now()),
(11,51,7,200,now()),
(11,51,8,300,now()),

(12,56, 1, 3800,now()),
(12,56, 2, 100,now()),
(12,56, 3, 100,now()),
(12,56, 4, 100,now()),
(12,56, 5, 80,now()),
(12,56, 6, 80,now()),
(12,56,7,200,now()),
(12,56,8,300,now()),

(13,61, 1, 3800,now()),
(13,61, 2, 100,now()),
(13,61, 3, 100,now()),
(13,61, 4, 100,now()),
(13,61, 5, 80,now()),
(13,61, 6, 80,now()),
(13,61,7,200,now()),
(13,61,8,300,now()),

(14,66, 1, 3800,now()),
(14,66, 2, 100,now()),
(14,66, 3, 100,now()),
(14,66, 4, 100,now()),
(14,66, 5, 80,now()),
(14,66, 6, 80,now()),
(14,66,7,200,now()),
(14,66,8,300,now()),

(15,71, 1, 3400,now()),
(15,71, 2, 100,now()),
(15,71, 3, 100,now()),
(15,71, 4, 100,now()),
(15,71, 5, 60,now()),
(15,71, 6, 60,now()),
(15,71,7,200,now()),
(15,71,8,300,now()),

(16,76, 1, 3500,now()),
(16,76, 2, 100,now()),
(16,76, 3, 100,now()),
(16,76, 4, 100,now()),
(16,76, 5, 70,now()),
(16,76, 6, 70,now()),
(16,76,7,200,now()),
(16,76,8,300,now()),

(17,81, 1, 3500,now()),
(17,81, 2, 100,now()),
(17,81, 3, 100,now()),
(17,81, 4, 100,now()),
(17,81, 5, 70,now()),
(17,81, 6, 70,now()),
(17,81,7,200,now()),
(17,81,8,300,now()),

(18,86, 1, 3200,now()),
(18,86, 2, 100,now()),
(18,86, 3, 100,now()),
(18,86, 4, 100,now()),
(18,86, 5, 70,now()),
(18,86, 6, 70,now()),
(18,86,7,200,now()),
(18,86,8,300,now()),

(19,91, 1, 3400,now()),
(19,91, 2, 100,now()),
(19,91, 3, 100,now()),
(19,91, 4, 100,now()),
(19,91, 5, 70,now()),
(19,91, 6, 70,now()),
(19,91,7,200,now()),
(19,91,8,300,now()),

(20,96, 1, 4000,now()),
(20,96, 2, 100,now()),
(20,96, 3, 100,now()),
(20,96, 4, 100,now()),
(20,96, 5, 100,now()),
(20,96, 6, 100,now()),
(20,96,7,200,now()),
(20,96,8,300,now());

-- QUERY 1. list of employees (name, doj, dob, gender, phone, working_status, designation, location)
SELECT emp.FirstName,emp.LastName,emp.dob,emp.doj,emp.gender,emp.phone,wd.workingStatus,ds.designation
FROM employees AS emp 
JOIN WorkingDetails AS wd 
ON emp.workingStatus_id=wd.workingStatus_id
INNER JOIN designation AS ds
ON emp.Location_id=ds.designation_id;
-- QUERY 2. count of employees in location wise(location,employee count)
SELECT District,COUNT(emp.Location_id)
FROM locationDetails ld
JOIN employees emp
ON emp.Location_id=ld.Location_id
GROUP BY District;
-- QUERY 3. count of employees in designation wise (designation,employee count), 
SELECT designation,COUNT(emp.designation_id)
FROM designation ds
JOIN employees emp
ON emp.designation_id=ds.designation_id
GROUP BY designation;
-- QUERY 4. count of employees in working status (working status,employee count)
SELECT workingStatus,COUNT(emp.workingStatus_id)
FROM WorkingDetails wd
JOIN employees emp
ON emp.workingStatus_id=wd.workingStatus_id
GROUP BY workingStatus;
-- QUERY 5. employees retirement date (empoyee_id, employee_name, dob, doj, retirement_date)
SELECT employee_id,CONCAT(FirstName," ",LastName) FullName,dob,doj,CONCAT(YEAR(dob)+60,'-',MONTH(dob),'-',DAY(dob))  retirement_date 
FROM employees;
-- QUERY 6. salary received by each employee for last month (employee_id, name, salary_year, salary_month, gross, deduction, net)
SELECT emp.employee_id,CONCAT(FirstName," ",LastName), Gross,sl.year,sl.month,sl.NetAmount,sl.deduction
FROM employees emp
JOIN Salaries sl
ON emp.employee_id=sl.employee_id
WHERE paid_on='2023-11-03';
-- QUERY 7. maximum, minimun salary of employee, average salary of employees.
SELECT MIN(Gross) AS Minimum_salary, MAX(Gross) AS Maximum_salary, AVG(Gross) AS Average_salary
FROM employees;
-- QUERY 8. show salary break up(each salary compoment) of each employee wise. 
SELECT emp.employee_id AS Employee_ID,CONCAT(emp.FirstName, ' ', emp.LastName) AS Employee_Name,sc.SalaryComponents AS Salary_Component,sd.Gross
FROM employees emp
JOIN Salaries sl ON emp.employee_id = sl.employee_id
JOIN salaryDetails sd ON s.salaries_id = sd.salaries_id
JOIN SalaryComponents sc ON sd.Salary_components_id = sc.Salary_components_id;
-- QUERY 9. list of emp who have not received salary for last month.
SELECT emp.employee_id AS Employee_ID,CONCAT(emp.FirstName, ' ', emp.LastName) AS Employee_Name
FROM employees emp
WHERE emp.employee_id NOT IN (SELECT DISTINCT employee_id 
FROM Salaries 
WHERE month = MONTH(CURRENT_DATE) - 1 AND year = YEAR(CURRENT_DATE));