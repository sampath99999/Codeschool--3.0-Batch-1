
CREATE DATABASE hospital_managment_system;
/* 2023-12-10 20:14:02 [34 ms] */ 
CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    bloodGroup VARCHAR(5),
    gender VARCHAR(10)
);
/* 2023-12-10 20:14:23 [17 ms] */ 
CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    specialization VARCHAR(50),
    gender VARCHAR(10)
);
/* 2023-12-10 20:14:44 [17 ms] */ 
CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(id),
    doctor_id INT REFERENCES doctor(id),
    time TIME,
    date DATE
);
/* 2023-12-10 20:14:59 [22 ms] */ 
CREATE TABLE prescription (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointment(id),
    medicines TEXT,
    remarks TEXT
);
/* 2023-12-10 20:15:13 [13 ms] */ 
CREATE TABLE bill (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointment(id),
    date DATE,
    time TIME,
    amount DECIMAL(10, 2)
);
/* 2023-12-10 20:16:41 [17 ms] */ 
INSERT INTO patient (name, phone, email, password, bloodGroup, gender)
VALUES
  ('Rajesh Kumar', '9876543210', 'rajesh@example.com', 'password123', 'O+', 'Male'),
  ('Sonia Gupta', '8765432109', 'sonia@example.com', 'securePass', 'A-', 'Female'),
  ('Amit Patel', '7654321098', 'amit@example.com', 'pass123', 'B+', 'Male'),
  ('Neha Sharma', '6543210987', 'neha@example.com', 'secretWord', 'AB-', 'Female'),
  ('Rahul Verma', '5432109876', 'rahul@example.com', 'p@ssw0rd', 'O-', 'Male');




  INSERT INTO patient (name, phone, email, password, bloodGroup, gender)
VALUES
  ('Anita Singh', '9876543211', 'anita@example.com', 'pass1234', 'A+', 'Female'),
  ('Vikram Yadav', '8765432101', 'vikram@example.com', 'securePass', 'B-', 'Male'),
  ('Pooja Mehta', '7654321092', 'pooja@example.com', 'pass4321', 'AB+', 'Female'),
  ('Ravi Kapoor', '6543210983', 'ravi@example.com', 'raviPass', 'O+', 'Male'),
  ('Simran Malik', '5432109874', 'simran@example.com', 'simran123', 'A-', 'Female'),
  ('Alok Gupta', '9876543200', 'alok@example.com', 'alokPass', 'B+', 'Male'),
  ('Nisha Sharma', '8765432105', 'nisha@example.com', 'nishaPass', 'O-', 'Female'),
  ('Vivek Verma', '7654321096', 'vivek@example.com', 'vivekPass', 'AB-', 'Male'),
  ('Mona Patel', '6543210985', 'mona@example.com', 'mona123', 'B-', 'Female'),
  ('Rajat Kapoor', '5432109873', 'rajat@example.com', 'rajatPass', 'A+', 'Male');

/* 2023-12-10 20:16:54 [9 ms] */ 
INSERT INTO doctor (name, phone, email, specialization, gender)
VALUES
  ('Dr. Anjali Singh', '8765432109', 'anjali@example.com', 'Cardiologist', 'Female'),
  ('Dr. Vikram Kapoor', '7654321098', 'vikram@example.com', 'Orthopedic Surgeon', 'Male'),
  ('Dr. Sneha Joshi', '6543210987', 'sneha@example.com', 'Pediatrician', 'Female'),
  ('Dr. Rajesh Verma', '5432109876', 'rajeshv@example.com', 'Dermatologist', 'Male'),
  ('Dr. Nandini Gupta', '4321098765', 'nandini@example.com', 'Ophthalmologist', 'Female');
/* 2023-12-10 20:17:09 [18 ms] */ 
INSERT INTO appointment (patient_id, doctor_id, time, date)
VALUES
  (1, 1, '10:00:00', '2023-12-15'),
  (2, 2, '11:30:00', '2023-12-16'),
  (3, 3, '14:00:00', '2023-12-17'),
  (4, 4, '15:30:00', '2023-12-18'),
  (5, 5, '09:00:00', '2023-12-19');
/* 2023-12-10 20:17:22 [8 ms] */ 



INSERT INTO appointment (patient_id, doctor_id, time, date)
VALUES
  (6, 6, '16:30:00', '2023-12-20'),
  (7, 7, '10:45:00', '2023-12-21');





INSERT INTO appointment (patient_id, doctor_id, time, date)
VALUES  (2, 4, '11:30:00', '2024-01-05'),
  (3, 5, '14:45:00', '2024-01-06'),
  (4, 6, '16:30:00', '2024-01-07'),
  (5, 7, '10:45:00', '2024-01-08');
INSERT INTO prescription (appointment_id, medicines, remarks)
VALUES
  (1, 'Aspirin 100mg', 'Take once a day with food'),
  (2, 'Ibuprofen 200mg', 'Take as needed for pain'),
  (3, 'Amoxicillin 500mg', 'Take twice a day with meals'),
  (4, 'Hydrocortisone cream', 'Apply to affected area twice daily'),
  (5, 'Eye drops', 'Use as directed for eye irritation');
/* 2023-12-10 20:17:32 [13 ms] */ 
INSERT INTO bill (appointment_id, date, time, amount)
VALUES
  (1, '2023-12-15', '10:30:00', 1500.00),
  (2, '2023-12-16', '12:00:00', 2000.00),
  (3, '2023-12-17', '15:30:00', 1200.00),
  (4, '2023-12-18', '16:45:00', 1800.00),
  (5, '2023-12-19', '09:30:00', 2500.00);
/* 2023-12-10 20:20:54 [24 ms] */ 



INSERT INTO bill (appointment_id, date, time, amount)
VALUES
  (6, '2023-12-20', '11:15:00', 1700.00),
  (7, '2023-12-21', '14:45:00', 2100.00),
  (8, '2023-12-22', '16:00:00', 1500.00),
  (9, '2023-12-23', '09:00:00', 1900.00),
  (10, '2023-12-24', '13:30:00', 2200.00),
  (11, '2023-12-25', '10:45:00', 1800.00),
  (12, '2023-12-26', '12:30:00', 2000.00);
drop Table  patient, bill, appointment, doctor, prescription;
/* 2023-12-10 20:23:03 [52 ms] */ 
CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    bloodGroup VARCHAR(5),
    gender VARCHAR(10)
);
/* 2023-12-10 20:23:05 [24 ms] */ 
CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    specialization VARCHAR(50),
    gender VARCHAR(10)
);
/* 2023-12-10 20:23:07 [25 ms] */ 
CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patient(id),
    doctor_id INT REFERENCES doctor(id),
    time TIME,
    date DATE
);
/* 2023-12-10 20:23:09 [16 ms] */ 
CREATE TABLE prescription (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointment(id),
    medicines TEXT,
    remarks TEXT
);
/* 2023-12-10 20:23:11 [22 ms] */ 
CREATE TABLE bill (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointment(id),
    date DATE,
    time TIME,
    amount DECIMAL(10, 2)
);
/* 2023-12-10 20:23:14 [11 ms] */ 
INSERT INTO patient (name, phone, email, password, bloodGroup, gender)
VALUES
  ('Rajesh Kumar', '9876543210', 'rajesh@example.com', 'password123', 'O+', 'Male'),
  ('Sonia Gupta', '8765432109', 'sonia@example.com', 'securePass', 'A-', 'Female'),
  ('Amit Patel', '7654321098', 'amit@example.com', 'pass123', 'B+', 'Male'),
  ('Neha Sharma', '6543210987', 'neha@example.com', 'secretWord', 'AB-', 'Female'),
  ('Rahul Verma', '5432109876', 'rahul@example.com', 'p@ssw0rd', 'O-', 'Male');
/* 2023-12-10 20:23:16 [19 ms] */ 


-- 10 More Patient Records
INSERT INTO patient (name, phone, email, password, bloodGroup, gender)
VALUES
  ('Priya Kapoor', '9876543221', 'priya@example.com', 'securePass123', 'B-', 'Female'),
  ('Varun Singh', '8765432110', 'varun@example.com', 'varunPass', 'A+', 'Male'),
  ('Sara Khan', '7654321099', 'sara@example.com', 'sara123', 'AB+', 'Female'),
  ('Aryan Gupta', '6543210988', 'aryan@example.com', 'aryanPass', 'O+', 'Male'),
  ('Anaya Patel', '5432109877', 'anaya@example.com', 'anaya@123', 'B-', 'Female'),
  ('Rajat Verma', '4321098765', 'rajat@example.com', 'rajatPass', 'A-', 'Male'),
  ('Kiran Sharma', '3210987654', 'kiran@example.com', 'kiran@123', 'AB+', 'Female'),
  ('Vivek Gupta', '2109876543', 'vivek@example.com', 'vivekPass', 'O-', 'Male'),
  ('Pooja Singh', '1098765432', 'pooja@example.com', 'pooja@123', 'B+', 'Female'),
  ('Rohit Sharma', '9988776655', 'rohit@example.com', 'rohitPass', 'A+', 'Male');
/* 2023-12-10 20:23:16 [19 ms] */
-- 10 More Patient Records with Unique Emails
INSERT INTO patient (name, phone, email, password, bloodGroup, gender)
VALUES
  ('Priya Kapoor', '9876543221', 'priya.kapoor@example.com', 'securePass123', 'B-', 'Female'),
  ('Varun Singh', '8765432110', 'varun.singh@example.com', 'varunPass', 'A+', 'Male'),
  ('Sara Khan', '7654321099', 'sara.khan@example.com', 'sara123', 'AB+', 'Female'),
  ('Aryan Gupta', '6543210988', 'aryan.gupta@example.com', 'aryanPass', 'O+', 'Male'),
  ('Anaya Patel', '5432109877', 'anaya.patel@example.com', 'anaya@123', 'B-', 'Female'),
  ('Rajat Verma', '4321098765', 'rajat.verma@example.com', 'rajatPass', 'A-', 'Male'),
  ('Kiran Sharma', '3210987654', 'kiran.sharma@example.com', 'kiran@123', 'AB+', 'Female'),
  ('Vivek Gupta', '2109876543', 'vivek.gupta@example.com', 'vivekPass', 'O-', 'Male'),
  ('Pooja Singh', '1098765432', 'pooja.singh@example.com', 'pooja@123', 'B+', 'Female'),
  ('Rohit Sharma', '9988776655', 'rohit.sharma@example.com', 'rohitPass', 'A+', 'Male');
/* 2023-12-10 20:23:16 [19 ms] */
-- 10 More Patient Records with Unique Emails
-- Update Records Where Age is NULL
UPDATE patient
SET age = 25
WHERE age IS NULL;

INSERT INTO doctor (name, phone, email, specialization, gender)
VALUES
  ('Dr. Anjali Singh', '8765432109', 'anjali@example.com', 'Cardiologist', 'Female'),
  ('Dr. Vikram Kapoor', '7654321098', 'vikram@example.com', 'Orthopedic Surgeon', 'Male'),
  ('Dr. Sneha Joshi', '6543210987', 'sneha@example.com', 'Pediatrician', 'Female'),
  ('Dr. Rajesh Verma', '5432109876', 'rajeshv@example.com', 'Dermatologist', 'Male'),
  ('Dr. Nandini Gupta', '4321098765', 'nandini@example.com', 'Ophthalmologist', 'Female');
/* 2023-12-10 20:23:18 [18 ms] */ 
INSERT INTO appointment (patient_id, doctor_id, time, date)
VALUES
  (1, 1, '10:00:00', '2023-12-15'),
  (2, 2, '11:30:00', '2023-12-16'),
  (3, 3, '14:00:00', '2023-12-17'),
  (4, 4, '15:30:00', '2023-12-18'),
  (5, 5, '09:00:00', '2023-12-19');
/* 2023-12-10 20:23:20 [20 ms] */ 
INSERT INTO prescription (appointment_id, medicines, remarks)
VALUES
  (1, 'Aspirin 100mg', 'Take once a day with food'),
  (2, 'Ibuprofen 200mg', 'Take as needed for pain'),
  (3, 'Amoxicillin 500mg', 'Take twice a day with meals'),
  (4, 'Hydrocortisone cream', 'Apply to affected area twice daily'),
  (5, 'Eye drops', 'Use as directed for eye irritation');
/* 2023-12-10 20:23:22 [10 ms] */ 
INSERT INTO bill (appointment_id, date, time, amount)
VALUES
  (1, '2023-12-15', '10:30:00', 1500.00),
  (2, '2023-12-16', '12:00:00', 2000.00),
  (3, '2023-12-17', '15:30:00', 1200.00),
  (4, '2023-12-18', '16:45:00', 1800.00),
  (5, '2023-12-19', '09:30:00', 2500.00);
/* 2023-12-11 00:19:01 [10 ms] */ 
INSERT INTO patient(id,name,phone,email,password,bloodgroup,gender) VALUES(6,'john doe','1234567898','john@example.com','a@123456','O-','Male');
/* 2023-12-11 11:19:13 [48 ms] */ 
INSERT INTO patient 
(name, email, password, phone, bloodGroup, gender) VALUES
('test', 'test@test.com', 'a@123456', '1234567890', 'A-', 'Male');
/* 2023-12-11 11:25:59 [13 ms] */ 
DELETE FROM "patient" WHERE "id" IN (8,10);
/* 2023-12-11 20:15:01 [10 ms] */ 
SELECT id, name, specialization from doctor LIMIT 100;
/* 2023-12-12 00:00:35 [15 ms] */ 
INSERT INTO appointment (patient_id, doctor_id, date, time)
VALUES (6, 4, '2023-12-22'::DATE, '11:00 AM'::TIME);
/* 2023-12-12 00:45:39 [8 ms] */ 
UPDATE patient SET age=15 WHERE "id"=1;UPDATE patient SET age=20 WHERE "id"=2;UPDATE patient SET age=25 WHERE "id"=3;UPDATE patient SET age=35 WHERE "id"=4;UPDATE patient SET age=30 WHERE "id"=5;UPDATE patient SET age=26 WHERE "id"=7;UPDATE patient SET age=14 WHERE "id"=11;UPDATE patient SET age=46 WHERE "id"=12;UPDATE patient SET age=42 WHERE "id"=14;UPDATE patient SET age=21 WHERE "id"=15;UPDATE patient SET age=41 WHERE "id"=6;
/* 2023-12-12 00:45:48 [8 ms] */ 
select p.name, a.date, p.age, pr.medicines, pr.remarks
from patient p, appointment a, prescription pr
where p.id = a.patient_id
and pr.appointment_id = a.id LIMIT 100;
/* 2023-12-12 00:46:45 [5 ms] */ 
select p.name, a.date, p.age, pr.medicines, pr.remarks
from patient p, appointment a, prescription pr
where p.id = a.patient_id
and p.id = 4
and pr.appointment_id = a.id LIMIT 100;
/* 2023-12-12 00:46:51 [5 ms] */ 
select p.name, a.date, p.age, pr.medicines, pr.remarks
from patient p, appointment a, prescription pr
where p.id = a.patient_id
and pr.appointment_id = a.id LIMIT 100;
/* 2023-12-12 00:47:53 [9 ms] */ 
select p.name, a.date, p.age, pr.medicines, pr.remarks
from patient p, appointment a, prescription pr
where p.id = a.patient_id
and p.id = 4
and pr.appointment_id = a.id LIMIT 100;
/* 2023-12-12 01:51:54 [19 ms] */ 
INSERT INTO prescription (appointment_id, medicines, remarks)
VALUES
  (6, 'Paracetamol 500mg', 'Take up to four times a day for fever'),
  (7, 'Ciprofloxacin 250mg', 'Take with plenty of water, avoid dairy products'),
  (8, 'Ventolin Inhaler', 'Use as a rescue inhaler for asthma symptoms'),
  (9, 'Omeprazole 20mg', 'Take before meals for acid reflux'),
  (10, 'Loratadine 10mg', 'Take once a day for allergy relief'),
  (11, 'Sertraline 50mg', 'Take daily for depression/anxiety'),
  (12, 'Mupirocin ointment', 'Apply to skin infection three times a day');
/* 2023-12-12 01:54:18 [14 ms] */ 
INSERT INTO doctor (name, phone, email, specialization, gender)
VALUES
  ('Dr. Ahmed Khan', '9876543210', 'ahmed@example.com', 'Cardiologist', 'Male'),
  ('Dr. Fatima Ali', '8765432109', 'fatima@example.com', 'Orthopedic Surgeon', 'Female'),
  ('Dr. Amir Malik', '7654321098', 'amir@example.com', 'Pediatrician', 'Male'),
  ('Dr. Aisha Rahman', '6543210987', 'aisha@example.com', 'Dermatologist', 'Female'),
  ('Dr. Yusuf Ahmed', '5432109876', 'yusuf@example.com', 'Ophthalmologist', 'Male'),
  ('Dr. Zainab Khan', '4321098765', 'zainab@example.com', 'Neurologist', 'Female'),
  ('Dr. Bilal Ali', '3210987654', 'bilal@example.com', 'ENT Specialist', 'Male'),
  ('Dr. Sara Malik', '2109876543', 'sara@example.com', 'Psychiatrist', 'Female'),
  ('Dr. Idris Ahmed', '1098765432', 'idris@example.com', 'Urologist', 'Male'),
  ('Dr. Safiya Khan', '9876543210', 'safiya@example.com', 'Endocrinologist', 'Female');
/* 2023-12-12 01:54:33 [22 ms] */ 
INSERT INTO doctor (name, phone, email, specialization, gender)
VALUES
  ('Dr. Prakash Sharma', '9876543210', 'prakash@example.com', 'Neurologist', 'Male'),
  ('Dr. Preeti Malhotra', '8765432109', 'preeti@example.com', 'Gynecologist', 'Female'),
  ('Dr. Abhishek Patel', '7654321098', 'abhishek@example.com', 'ENT Specialist', 'Male'),
  ('Dr. Radhika Kapoor', '6543210987', 'radhika@example.com', 'Psychiatrist', 'Female'),
  ('Dr. Arjun Singh', '5432109876', 'arjun@example.com', 'Urologist', 'Male'),
  ('Dr. Meera Sharma', '4321098765', 'meera@example.com', 'Endocrinologist', 'Female'),
  ('Dr. Karthik Reddy', '3210987654', 'karthik@example.com', 'Cardiothoracic Surgeon', 'Male'),
  ('Dr. Aishwarya Desai', '2109876543', 'aishwarya@example.com', 'Rheumatologist', 'Female'),
  ('Dr. Sameer Khanna', '1098765432', 'sameer@example.com', 'Gastroenterologist', 'Male'),
  ('Dr. Neha Kapoor', '9876543210', 'neha@example.com', 'Allergist', 'Female');
/* 2023-12-12 01:57:38 [12 ms] */ 
INSERT INTO bill (appointment_id, date, time, amount)
VALUES
  (6, '2023-12-20', '11:15:00', 1700.00),
  (7, '2023-12-21', '14:45:00', 2100.00),
  (8, '2023-12-22', '16:00:00', 1500.00),
  (9, '2023-12-23', '09:00:00', 1900.00),
  (10, '2023-12-24', '13:30:00', 2200.00),
  (11, '2023-12-25', '10:45:00', 1800.00),
  (12, '2023-12-26', '12:30:00', 2000.00);
/* 2023-12-12 02:01:37 [7 ms] */ 
SELECT p.name, b.date, b.amount
from patient p, bill b, appointment a
where p.id = a.patient_id
and b.appointment_id = a.id LIMIT 100;
/* 2023-12-12 02:03:01 [16 ms] */ 
SELECT p.name, b.date, b.amount
from patient p, bill b, appointment a
where p.id = a.patient_id
and b.appointment_id = a.id
and p.id = 1 LIMIT 100;
/* 2023-12-12 02:05:06 [7 ms] */ 
SELECT p.name, b.date, b.amount
from patient p, bill b, appointment a
where p.id = a.patient_id
and b.appointment_id = a.id
and p.id = 5 LIMIT 100;
/* 2023-12-12 10:31:52 [52 ms] */ 
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);
/* 2023-12-12 10:35:36 [20 ms] */ 
INSERT INTO admin (name, phone, email, password, token) VALUES
    ('John Doe', '123-456-7890', 'john@example.com', 'admin_password_1', 'token_123'),
    ('Alice Smith', '987-654-3210', 'alice@example.com', 'admin_password_2', 'token_456'),
    ('Bob Johnson', '456-789-0123', 'bob@example.com', 'admin_password_3', 'token_789'),
    ('Eva Davis', '789-012-3456', 'eva@example.com', 'admin_password_4', 'token_012'),
    ('Michael Lee', '321-654-9870', 'michael@example.com', 'admin_password_5', 'token_345');
/* 2023-12-12 10:36:43 [19 ms] */ 
UPDATE admin SET password='a@123456' WHERE "id"=1;
/* 2023-12-12 12:46:39 [5 ms] */ 
SELECT name, phone, email, specialization, gender from doctor LIMIT 100;

SELECT p.name, d.name, a.date, a.time
from patient p, doctor d, appointment a
where p.id = a.patient_id AND
d.id = a.doctor_id;/* 2023-12-12 15:09:58 [6 ms] */ 
SELECT p.name AS patient_name, d.name AS doctor_name, a.date, a.time
from patient p, doctor d, appointment a
where p.id = a.patient_id AND
d.id = a.doctor_id LIMIT 100;
/* 2023-12-12 15:10:34 [7 ms] */ 
SELECT p.name AS patient_name, d.name AS doctor_name, a.date, a.time
from patient p, doctor d, appointment a
where p.id = a.patient_id AND
d.id = a.doctor_id LIMIT 100;


SELECT   a.date, p.name AS patient_name, d.name AS doctor_name, p.age, pr.medicines, pr.remarks
              FROM patient p, appointment a, prescription pr, doctor d
              WHERE p.id = a.patient_id
              AND a.doctor_id = d.id
              AND pr.appointment_id = a.id;



SELECT b.id AS bill_no, a.id AS appointment_id , p.name AS patient_name, d.name AS examined_by, b.amount
FROM bill b, doctor d, patient p, appointment a
WHERE b.appointment_id = a.id
AND d.id = a.doctor_id
AND p.id = a.patient_id;

SELECT count(id) from doctor;


SELECT
    (SELECT COUNT(*) FROM Doctor) AS total_doctors,
    (SELECT COUNT(*) FROM Patient) AS total_patients,
    (SELECT COALESCE(SUM(amount), 0) FROM Bill) AS total_billed_amount,
    (SELECT COUNT(*) FROM Prescription) AS total_prescribed_medicines,
    (SELECT COUNT(*) FROM Appointment) AS total_appointments_booked;
