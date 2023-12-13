<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');


require("../utils/functions.php");

try {
    $pdo = connect();
    $query = "SELECT * from slots;";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $slots = $stmt->rowCount();

    if ($slots === 0) {
        sendResponse(false, "Error while fetching slots");
    } else {
        sendResponse(true, "Successful! Total no of Theatres found: $slots", $result);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
}
