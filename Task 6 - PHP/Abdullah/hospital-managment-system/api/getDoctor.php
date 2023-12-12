<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');


require("./utils/functions.php");


try {
    $pdo = connect();
    $query = "SELECT id, name, specialization from doctor;";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $noOfDoctors = $stmt->rowCount();

    if ($noOfDoctors == 0) {
        sendResponse(false, "Error while fetching Doctors");
    } else {
        sendResponse(true, "Successful! Total no of Doctors: $noOfDoctors", $result);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
}
