<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");


try {
    $pdo = connect();
    $query = "
    SELECT b.id AS bill_no, a.id AS appointment_id , p.name AS patient_name, d.name AS examined_by, b.amount
    FROM bill b, doctor d, patient p, appointment a
    WHERE b.appointment_id = a.id
    AND d.id = a.doctor_id
    AND p.id = a.patient_id;";


    $stmt = $pdo->prepare($query);

    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Fetch successful", $result);
    } else {
        sendResponse(false, "Error while fetching Bill");
    }
} catch (PDOException $e) {
    error_log("PDO Exception: " . $e->getMessage());
    sendResponse(false, "Internal Server Error");
}
