
CREATE SEQUENCE sequence_1
START WITH 10501
INCREMENT BY 1
MINVALUE 1
MAXVALUE 100000
NO CYCLE;

CREATE TABLE Employee (
EmpId integer(5) PRIMARY KEY NOT NULL,
FirstName varchar(20),
LastName varchar (20),
DateOfBirth DATE,
Gender char(1),
DateOfJoining DATE);

CREATE TABLE Contact_Details (  
EmployeeId integer,
PhoneNo integer(10),
Designation varchar(20),
WorkingStatus varchar(10),
Country varchar (15),
foreign key (EmployeeId) REFERENCES Employee(EmpId));

CREATE TABLE Salary (
EmployeeId integer(5),
Basic_Pay float,
HouseRentAllowances float,
CityCompensatoryAllowance float,
ProfessionalTax float,
IncomeTax float,
foreign key (EmployeeId) REFERENCES Employee(EmpId));

CREATE TABLE TRANSACTIONS (
TransactionId INT PRIMARY KEY NOT NULL UNIQUE,
EmployeeId integer(5),
SalaryMonth varchar(20),
Salary_Amount integer,
Transaction_type character(10),
foreign key (EmployeeId) REFERENCES Employee(EmpId));

INSERT INTO Employee (EmpId, FirstName, LastName, DateOfBirth, Gender, DateOfJoining)
VALUES 
    (nextval('sequence_1'), 'John', 'Doe', '1990-01-15', 'M', '2020-05-10'),
    (nextval('sequence_1'), 'Jane', 'Smith', '1985-07-20', 'F', '2018-11-25'),
    (nextval('sequence_1'), 'Bob', 'Johnson', '1995-03-08', 'M', '2021-02-18'),
    (nextval('sequence_1'), 'Kshirsagar', 'Balasai', '2002-06-19', 'M', '2023-10-09'),
    (nextval('sequence_1'), 'Virat', 'Kohli', '1997-06-19', 'M', '2023-06-19');
	
	select * from employee;
	
	
    insert into contact_details values (10501,6302193058, 'Full Stack Engineer', 'Active', 'India');
    insert into contact_details values (10502,6303577108, 'Devops Engineer', 'Active', 'India');
	insert into contact_details values (10503,6302193058, 'SAP Developer', 'Active', 'USA');
	insert into contact_details values (10504,8688228447, 'Full Stack Engineer', 'Active', 'Ireland');
	insert into contact_details values (10505,7207486635, 'Marketing Manager', 'Inactive', 'USA');
	
	
   alter table contact_details alter column phoneno type BIGINT;
   alter table contact_details alter employeeid type integer;
   
   select * from contact_details;
   
   select * from salary;
   
   
   insert into salary values (10501, 40000, 5000, 2000, 4000, 1000); 
   insert into salary values (10503, 55000, 5000, 2000, 5500, 1000);
   insert into salary values (10502, 30000, 5000, 2000, 3000, 1000);
   insert into salary values (10505, 60000, 5000, 2000, 6000, 1000);
   insert into salary values (10504, 55000, 5000, 2000, 5500, 1000);
   
   CREATE SEQUENCE transactions_1
   start with 21806
   increment by 1
   minvalue 20000
   maxvalue 100000
   no cycle;
   
   select * from transactions;
   
     insert into transactions values (nextval('transactions_1'), 10502, 'November' ,30000, 'NEFT');
	 insert into transactions values (nextval('transactions_1'), 10501, 'November' ,40000, 'IMPS');
	 insert into transactions values (nextval('transactions_1'), 10503, 'November' ,55000, 'NEFT');
	 insert into transactions values (nextval('transactions_1'), 10504, 'October' ,55000, 'BANK TRANS');
	 insert into transactions values (nextval('transactions_1'), 10505, 'November' ,60000, 'IMPS');
   
	
  alter table transactions alter column salarymonth type varchar(20);
  
  
  1. SELECT concat(e.firstname,' ',e.lastname) AS Name,e.DateOfBirth, e.DateOfJoining, e.gender, c.phoneNo, c.designation, c.workingstatus, c.country 
     FROM Employee AS e INNER JOIN contact_details as c on e.EmpId = c.EmployeeId;
  
  2. SELECT
     country,
     COUNT(EmployeeId) AS employee_count
     FROM contact_details
     GROUP BY country;
  
  3. SELECT designation, count(EmployeeId) FROM contact_details GROUP BY designation;
  
  4. SELECT workingstatus, count(EmployeeId) FROM contact_details GROUP BY workingstatus;
  
  5. SELECT
     EmpId,
     CONCAT(firstname, ' ', lastname) AS employee_name,
     DateOfBirth,
     DateOfJoining,
     DateOfBirth + INTERVAL '60 years' AS retirement_date
     FROM employee;
	 
	 
  6.  SELECT EmployeeId, Basic_pay, HouseRentAllowances, CityCompensatoryAllowance, ProfessionalTax, IncomeTax from Salary;	 
 
  7.  SELECT
    e.empid,
    CONCAT(e.firstname, ' ', e.lastname) AS employee_name,
    (s.basic_pay + s.houserentallowances+ s.citycompensatoryallowance) AS gross,
    (s.professionaltax + s.incometax) AS deductions,
    (s.basic_pay + s.housentallowances + s.citycompensatoryallowance) - (s.professionaltax+s.incometax) AS net
      FROM
  employee as e INNER JOIN salary as s on e.empid = s.employeeId;
  
  8. SELECT s.EmployeeId, e.firstname, e.lastname, s.Basic_pay, s.IncomeTax, s.ProfessionalTax from salary as s
     INNER JOIN 
     employee as e on s.EmployeeId = e.Empid;
   
   9. SELECT EmployeeId, salarymonth from transactions where salarymonth not in ('November');
   
   10. SELECT
       e.empid,
	   CONCAT(e.firstname, ' ', e.lastname)  AS name,
       s.basic_pay  AS actual_net_salary,
       t.salarymonth AS last_month_net_salary
       FROM
       employee e
       JOIN
       salary s ON e.empid = s.employeeid
       JOIN
       transactions t  ON e.empid = t.employeeid
       WHERE
       s.basic_pay <> t.salarymonth;
 
   
	 
 