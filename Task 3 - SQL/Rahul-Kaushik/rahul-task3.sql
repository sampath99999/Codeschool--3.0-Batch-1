/*create a database in psql "employees_management" and consider below requirements and create necessary tables to save
employees details

1. save employees basic details such as "empcode, firstname, lastname, doj, dob, gender, phone, working_status,
designation, location
2. empcode should be unique and 5 digit and should start with a sequence "20001"
3. save employees salary details, ex : earnings =>(Basic Pay, House rent allowance, city compensatory allowance),
deductions => (professional tax, income tax)
4. save employees transaction details (month wise salary details paid to employees)


write pgSQL queries to display records for below questions
1. list of employees (name, doj, dob, gender, phone, working_status, designation, location)
2. count of employees location wise(location,employee count).
3. count of employees designation wise (designation,employee count),
4. count of employees working status (working status,employee count)
5. calculate and show all employees retirement date (employee code, employee_name, dob, doj, retirement_date) (if
retirement ll be at age of 60)
6. show salary break up(each salary component) of each employee wise. (employee code, name, basic pay, hra, cca, pt, it)
7. show gross, deductions, net salary of each employee (employee code, name, gross, deduction, net)
8. salary received by each employee for last month (employee_id, name, salary_year, salary_month, gross, deduction,
net).
9. list of employees who have not received salary for last month (employee code, name)
10. list of employees who's actual salary net amount not matched with net amount of salary received in last month.
(employee code, name, actual net, last month net salary).

 */
-- ANSWERS:
-- TABLES :

-- 1. EmployeeDetails ->
CREATE SEQUENCE empcode_sequence START 20001 INCREMENT 1 NO MAXVALUE CACHE 1;

CREATE TABLE
    EmployeeDetails (
        empcode INT DEFAULT nextval ('empcode_sequence') NOT NULL,
        firstname VARCHAR(50),
        lastname VARCHAR(50),
        doj DATE,
        dob DATE,
        gender VARCHAR(10),
        phone INT,
        working_status VARCHAR(20),
        designation VARCHAR(50),
        location VARCHAR(50),
        PRIMARY KEY (empcode)
    );

-- 2. EmployeeSalary ->
CREATE TABLE
    EmployeeSalary (
        empcode INT REFERENCES EmployeeDetails (empcode),
        basic_pay NUMERIC(10, 2),
        hra NUMERIC(10, 2),
        cca NUMERIC(10, 2),
        professional_tax NUMERIC(10, 2),
        income_tax NUMERIC(10, 2)
    );

-- 3. EmployeeTransactions
CREATE TABLE
    EmployeeTransactions (
        empcode INT REFERENCES EmployeeDetails (empcode),
        salary_year INT,
        salary_month INT,
        gross NUMERIC(10, 2),
        deduction NUMERIC(10, 2),
        net NUMERIC(10, 2)
    );

-- QUERIES :


-- 1. list of employees (name, doj, dob, gender, phone, working_status, designation, location) =>
SELECT
    firstname,
    lastname,
    doj,
    dob,
    gender,
    phone,
    working_status,
    designation,
    location
FROM
    EmployeeDetails;


-- 2. count of employees location wise(location,employee count) =>
SELECT
    location,
    COUNT(*) as employee_count
FROM
    EmployeeDetails
GROUP BY
    location;


-- 3. count of employees designation wise (designation,employee count) =>
SELECT
    designation,
    COUNT(*) as employee_count
FROM
    EmployeeDetails
GROUP BY
    designation;


-- 4. count of employees working status (working status,employee count) =>
SELECT
    working_status,
    COUNT(*) as employee_count
FROM
    EmployeeDetails
GROUP BY
    working_status;


-- 5. calculate and show all employees retirement date (empoyee code, employee_name, dob, doj, retirement_date) (if
-- retirement ll be at age of 60) =>
SELECT
    empcode,
    firstname || ' ' || lastname as employee_name,
    dob,
    doj,
    dob + interval '60 years' as retirement_date
FROM
    EmployeeDetails;


-- 6. show salary break up(each salary compoment) of each employee wise. (employee code, name, basic pay, hra, cca, pt, it)
-- =>
SELECT
    ed.empcode,
    firstname || ' ' || lastname as name,
    basic_pay,
    hra,
    cca,
    professional_tax as pt,
    income_tax as it
FROM
    EmployeeSalary es
    JOIN EmployeeDetails ed ON es.empcode = ed.empcode;


-- 7. show gross, deductions, net salary of each employee (employee code, name, gross, deduction, net) =>
SELECT
    ed.empcode,
    firstname || ' ' || lastname as name,
    (basic_pay + hra + cca) as gross,
    (professional_tax + income_tax) as deductions,
    (
        basic_pay + hra + cca - professional_tax - income_tax
    ) as net
FROM
    EmployeeSalary as es
    JOIN EmployeeDetails as ed ON es.empcode = ed.empcode;


-- 8. salary received by each employee for last month (employee_id, name, salary_year, salary_month, gross, deduction, net)
-- =>
SELECT
    ed.empcode as employee_id,
    firstname || ' ' || lastname as name,
    salary_year,
    salary_month,
    gross,
    deductions,
    net
FROM
    EmployeeTransactions as et
    JOIN EmployeeDetails as ed ON et.empcode = ed.empcode
WHERE
    salary_year = EXTRACT(
        YEAR
        FROM
            CURRENT_DATE
    )
    AND salary_month = (
        EXTRACT(
            MONTH
            FROM
                CURRENT_DATE
        ) -1
    );


-- 9. list of employees who have not received salary for last month (employee code, name) =>
SELECT
    ed.empcode as "employee code",
    firstname || ' ' || lastname as name
FROM
    EmployeeDetails ed
WHERE
    NOT EXISTS (
        SELECT
            *
        FROM
            EmployeeTransactions et
        WHERE
            ed.empcode = et.empcode
            AND et.salary_year = EXTRACT(
                YEAR
                FROM
                    CURRENT_DATE
            )
            AND et.salary_month = (
                EXTRACT(
                    MONTH
                    FROM
                        CURRENT_DATE
                ) -1
            )
    );


-- 10. list of employees whos actual salary net amount not matched with net amount of salary received in last month.
-- (employee code, name, actual net, last month net salary) =>
SELECT
    ed.empcode as "employee code",
    firstname || ' ' || lastname as name,
    (
        basic_pay + hra + cca - professional_tax - income_tax
    ) as "actual net",
    net as "last month net salary"
FROM
    (
        EmployeeDetails ed
        JOIN EmployeeSalary es ON ed.empcode = es.empcode
    )
    JOIN EmployeeTransactions et ON ed.empcode = et.empcode
WHERE
    (
        basic_pay + hra + cca - professional_tax - income_tax
    ) <> net
    AND salary_year = EXTRACT(
        YEAR
        FROM
            CURRENT_DATE
    )
    AND salary_month = (
        EXTRACT(
            MONTH
            FROM
                CURRENT_DATE
        ) -1
    );