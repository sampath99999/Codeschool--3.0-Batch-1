<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require("./utils/functions.php");


if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    sendResponse(false, "Invalid request method");
}

try {
    $selectedDoctor = isset($_POST["selectedDoctor"]) ? $_POST["selectedDoctor"] : "";
    $selectedDate = isset($_POST["selectedDate"]) ? $_POST["selectedDate"] : "";
    $selectedTime = isset($_POST["selectedTime"]) ? $_POST["selectedTime"] : "";
    $id = isset($_POST["id"]) ? $_POST["id"] : "";

    $query = "INSERT INTO appointment (patient_id, doctor_id, date, time)
              VALUES (:id, :selectedDoctor, :selectedDate::DATE, :selectedTime::TIME)";
    
    $stmt = $pdo->prepare($query);
    
    $stmt->bindParam(":selectedDoctor", $selectedDoctor, PDO::PARAM_INT);
    $stmt->bindParam(":selectedDate", $selectedDate, PDO::PARAM_STR);
    $stmt->bindParam(":selectedTime", $selectedTime, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    
    $stmt->execute();
    
    if ($stmt->rowCount() == 1) {
        sendResponse(true, "Appointment booked successfully!");
    } else {
        sendResponse(false, "Error occurred while booking appointment!");
    }
} catch (PDOException $e) {
    sendResponse(false, "Database error: " . $e->getMessage());
}
