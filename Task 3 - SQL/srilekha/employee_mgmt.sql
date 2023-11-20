CREATE SEQUENCE empcode_sequence START 20001;

CREATE TYPE gender_types AS ENUM ('female', 'male', 'other');

CREATE TYPE
    working_status_types AS ENUM (
        'working',
        'expired',
        'retired',
        'suspended'
    );

CREATE TABLE
    employees (
        id SERIAL PRIMARY KEY,
        empcode INT DEFAULT nextval('empcode_seq') NOT NULL,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30),
        doj DATE NOT NULL,
        dob DATE NOT NULL,
        gender gender_types NOT NULL,
        phone VARCHAR(10) NOT NULL UNIQUE,
        working_status working_status_types NOT NULL,
        designation VARCHAR(30) NOT NULL,
        location VARCHAR (30) NOT NULL
    );

SELECT * FROM employees;

INSERT INTO
    employees (
        first_name,
        last_name,
        doj,
        dob,
        gender,
        phone,
        working_status,
        designation,
        location
    )
VALUES (
        'Seeka',
        'Kakani',
        '2023-09-26',
        '2000-10-15',
        'female',
        '9848005566',
        'working',
        'Software Developer',
        'Hyderabad'
    ),
    (
        'bindu',
        'Kakani',
        '2023-08-26',
        '2000-09-15',
        'female',
        '9836367267',
        'retired',
        'tester',
        'chennai'
    ),
    (  'krishna',
        'bandla',
        '2023-08-26',
        '2000-07-15',
        'male',
        '9276142681',
        'expired',
        'Software Developer',
        'Hyderabad'
    );


    SELECT * FROM employees;

CREATE TYPE earning_deduction_types AS ENUM ('earning', 'deduction');

CREATE TABLE
    earning_deduction(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        type earning_deduction_types NOT NULL
    );

INSERT INTO
    earning_deduction(id, name, type)
VALUES (1, 'basic_pay', 'earning'), (2, 'hra', 'earning'), (3, 'cca', 'earning'), (
        4,
        'professional_tax',
        'deduction'
    ), (5, 'income_tax', 'deduction');

SELECT * FROM earning_deduction;

CREATE TABLE
    employee_salary_details(
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id),
        earning_deduction_id INTEGER NOT NULL REFERENCES earning_deduction(id),
        amount INT NOT NULL
    );

INSERT INTO
    employee_salary_details(
        employee_id,
        earning_deduction_id,
        amount
    )
VALUES (1, 1, 30000), (1, 2, 3000), (1, 3, 1000),(1, 4, 500),(1, 5, 500),
(2,1,40000),(2,2,2000),(2,3,1000),(2,4,600),(2,5,700),
(3,1,50000),(3,2,4000),(3,3,1500),(3,4,400),(3,5,500);

SELECT * FROM employee_salary_details;

CREATE TABLE
    transactions(
        id SERIAL PRIMARY KEY,
        employee_id INTEGER NOT NULL REFERENCES employees(id),
        date DATE NOT NULL,
        net INT NOT NULL
    );

INSERT INTO
    transactions(employee_id, date, net)
VALUES (1, '2023-11-01', 33000),(2,'2023-10-01',41700),(3,'2023-10-01',54600);
INSERT INTO
    transactions(employee_id, date, net)
VALUES (1, '2023-10-01', 32000);
SELECT * FROM transactions;

CREATE TABLE
    transactions_earning_deduction(
        id SERIAL PRIMARY KEY,
        transaction_id INTEGER NOT NULL REFERENCES transactions(id),
        earning_deduction_id INTEGER NOT NULL REFERENCES earning_deduction(id),
        amount INT NOT NULL
    );

INSERT INTO
    transactions_earning_deduction(
        transaction_id,
        earning_deduction_id,
        amount
    )
VALUES(1, 1, 30000);
INSERT INTO
    transactions_earning_deduction(
        transaction_id,
        earning_deduction_id,
        amount
    )
VALUES(1, 2, 3000);
INSERT INTO
    transactions_earning_deduction(
        transaction_id,
        earning_deduction_id,
        amount
    )
VALUES(1, 3, 1000);
INSERT INTO
    transactions_earning_deduction(
        transaction_id,
        earning_deduction_id,
        amount
    )
VALUES(1, 4, 500);
INSERT INTO
    transactions_earning_deduction(
        transaction_id,
        earning_deduction_id,
        amount
    )
VALUES(1, 5, 500);




SELECT * FROM transactions_earning_deduction;

-- 1. list of employees (name, doj, dob, gender, phone, working_status, designation, location)

SELECT
    first_name || ' ' || last_name AS name,
    doj,
    dob,
    gender,
    phone,
    working_status,
    designation,
    location
FROM employees;

-- 2.count of employees location wise(location,employee count).

SELECT
    location,
    COUNT(*) AS employee_count
FROM employees
GROUP BY location;

-- 3.count of employees designation wise (designation,employee count),

SELECT
    designation,
    COUNT(*) AS employee_count
FROM employees
GROUP BY designation;

-- 4.count of employees working status (working status,employee count)

SELECT
    working_status,
    COUNT(*) AS employee_count
FROM employees
GROUP BY working_status;

-- 5.calculate and show all employees retirement date (empoyee code, employee_name, dob, doj, retirement_date) (if retirement ll be at age of 60)

SELECT
    empcode,
    first_name || ' ' || last_name AS employee_name,
    dob,
    doj,
    dob + INTERVAL '60 years' AS retirement_date
FROM employees;

-- 6. show salary break up(each salary compoment) of each employee wise. (employee code, name, basic pay, hra, cca, pt, it)

SELECT
    e.empcode,
    e.first_name || ' ' || e.last_name AS name,
    basic_pay_amount.amount AS basic_pay,
    hra_amount.amount AS hra,
    professional_tax_amount.amount AS pt,
    income_tax_amount.amount AS it
FROM employees e
    LEFT JOIN employee_salary_details AS basic_pay_amount ON basic_pay_amount.employee_id = e.id AND basic_pay_amount.earning_deduction_id = 1
    LEFT JOIN employee_salary_details AS hra_amount ON hra_amount.employee_id = e.id AND hra_amount.earning_deduction_id = 2
    LEFT JOIN employee_salary_details AS cca_amount ON cca_amount.employee_id = e.id AND cca_amount.earning_deduction_id = 3
    LEFT JOIN employee_salary_details AS professional_tax_amount ON professional_tax_amount.employee_id = e.id AND professional_tax_amount.earning_deduction_id = 4
    LEFT JOIN employee_salary_details AS income_tax_amount ON income_tax_amount.employee_id = e.id AND income_tax_amount.earning_deduction_id = 5;

-- 7. show gross, deductions, net salary of each employee (employee code, name, gross, deduction, net)

SELECT
    e.empcode,
    first_name || ' ' || e.last_name AS name, (
        basic_pay_amount.amount + hra_amount.amount + cca_amount.amount
    ) AS gross, (
        professional_tax_amount.amount + income_tax_amount.amount
    ) AS deduction, (
        basic_pay_amount.amount + hra_amount.amount + cca_amount.amount - professional_tax_amount.amount - income_tax_amount.amount
    ) as net
FROM employees e
    LEFT JOIN employee_salary_details AS basic_pay_amount ON basic_pay_amount.employee_id = e.id AND basic_pay_amount.earning_deduction_id = 1
    LEFT JOIN employee_salary_details AS hra_amount ON hra_amount.employee_id = e.id AND hra_amount.earning_deduction_id = 2
    LEFT JOIN employee_salary_details AS cca_amount ON cca_amount.employee_id = e.id AND cca_amount.earning_deduction_id = 3
    LEFT JOIN employee_salary_details AS professional_tax_amount ON professional_tax_amount.employee_id = e.id AND professional_tax_amount.earning_deduction_id = 4
    LEFT JOIN employee_salary_details AS income_tax_amount ON income_tax_amount.employee_id = e.id AND income_tax_amount.earning_deduction_id = 5;

-- 8.salary received by each employee for last month (employee_id, name, salary_year, salary_month, gross, deduction, net).

SELECT e.empcode, e.name,EXTRACT('year' FROM date) as salary_year,EXTRACT('month' FROM date) as salary_month ,e.gross,e.deduction,e.net
FROM transactions t, (
        SELECT
            e.id,
            e.empcode,
            first_name || ' ' || e.last_name AS name, (
                basic_pay_amount.amount + hra_amount.amount + cca_amount.amount
            ) AS gross, (
                professional_tax_amount.amount + income_tax_amount.amount
            ) AS deduction, (
                basic_pay_amount.amount + hra_amount.amount + cca_amount.amount - professional_tax_amount.amount - income_tax_amount.amount
            ) as net
        FROM employees e
            LEFT JOIN employee_salary_details AS basic_pay_amount ON basic_pay_amount.employee_id = e.id AND basic_pay_amount.earning_deduction_id = 1
            LEFT JOIN employee_salary_details AS hra_amount ON hra_amount.employee_id = e.id AND hra_amount.earning_deduction_id = 2
            LEFT JOIN employee_salary_details AS cca_amount ON cca_amount.employee_id = e.id AND cca_amount.earning_deduction_id = 3
            LEFT JOIN employee_salary_details AS professional_tax_amount ON professional_tax_amount.employee_id = e.id AND professional_tax_amount.earning_deduction_id = 4
            LEFT JOIN employee_salary_details AS income_tax_amount ON income_tax_amount.employee_id = e.id AND income_tax_amount.earning_deduction_id = 5
    ) AS e
WHERE e.id = t.employee_id;

-- 9.list of employees who have not received salary for last month (employee code, name)
SELECT
    e.empcode,
    first_name || ' ' || last_name AS name
FROM employees e
LEFT JOIN transactions t ON e.id = t.employee_id
WHERE EXTRACT('month' FROM t.date) != EXTRACT('month' FROM CURRENT_DATE - INTERVAL '1 month') OR t.id IS NULL;

--10.list of employees whos a10ctual salary net amount not matched with net amount of salary received in last month. (employee code, name, actual net, last month net salary).
SELECT
    e.empcode AS "employee Code",
    first_name || ' ' || last_name AS name,
    t.net AS "Actual Net Salary",
    te.last_month_net AS "Last Month Net Salary"
FROM
    employees e
JOIN
    transactions t ON e.id = t.employee_id
JOIN (
    SELECT
        employee_id,
        SUM(net) AS last_month_net
    FROM
        transactions
    WHERE
        EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM CURRENT_DATE) - 1
    GROUP BY
        employee_id
) AS te ON e.id = te.employee_id
WHERE
    t.date >= CURRENT_DATE - INTERVAL '1 month'
    AND t.net != te.last_month_net;