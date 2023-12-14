<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(false, "Invalid request method");
}

$id = isset($_POST["id"]) ? $_POST["id"] : "";

try {
    $pdo = connect();
    $query = "SELECT p.name, a.date, p.age, pr.medicines, pr.remarks
              FROM patient p, appointment a, prescription pr
              WHERE p.id = a.patient_id
                AND p.id = :id
                AND pr.appointment_id = a.id;";

    $id = (int)$id;

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);

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
