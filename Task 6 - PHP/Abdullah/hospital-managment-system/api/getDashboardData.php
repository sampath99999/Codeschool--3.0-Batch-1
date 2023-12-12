<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");


try {
    $pdo = connect();
    $query = "SELECT
    (SELECT COUNT(*) FROM Doctor) AS total_doctors,
    (SELECT COUNT(*) FROM Patient) AS total_patients,
    (SELECT COALESCE(SUM(amount), 0) FROM Bill) AS total_billed_amount,
    (SELECT COUNT(*) FROM Prescription) AS total_prescribed_medicines,
    (SELECT COUNT(*) FROM Appointment) AS total_appointments_booked;
";


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
