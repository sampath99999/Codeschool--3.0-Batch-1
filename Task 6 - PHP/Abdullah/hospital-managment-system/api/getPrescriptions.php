<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");


try {
    $pdo = connect();
    $query = "SELECT   a.date, p.name AS patient_name, d.name AS doctor_name, p.age, pr.medicines, pr.remarks
    FROM patient p, appointment a, prescription pr, doctor d
    WHERE p.id = a.patient_id
    AND a.doctor_id = d.id
    AND pr.appointment_id = a.id;";


    $stmt = $pdo->prepare($query);

    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Fetch successful", $result);
    } else {
        sendResponse(false, "Error while fetching prescription");
    }
} catch (PDOException $e) {
    error_log("PDO Exception: " . $e->getMessage());
    sendResponse(false, "Internal Server Error");
}
