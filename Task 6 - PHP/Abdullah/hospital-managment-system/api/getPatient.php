<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./utils/functions.php");


try {
    $pdo = connect();
    $query = "SELECT name , phone , email , bloodgroup , gender , age FROM patient;
    ";

    $stmt = $pdo->prepare($query);

    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Fetch successful", $result);
    } else {
        sendResponse(false, "Error while fetching patients");
    }
} catch (PDOException $e) {
    error_log("PDO Exception: " . $e->getMessage());
    sendResponse(false, "Internal Server Error");
}
