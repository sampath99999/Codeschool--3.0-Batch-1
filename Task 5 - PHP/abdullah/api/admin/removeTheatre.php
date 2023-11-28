<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {
    $branchName = $_POST['branchName'];
    echo  'branchName';

    $pdo = connect();
    $query = "DELETE FROM theatre_Branches WHERE  branch_name = :branchName;";
    $stmt = $pdo->prepare($query);

    $stmt->bindParam(":branchName", $branchName, PDO::PARAM_STR);
    echo "flag";
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Theatre $branchName removed successfully!");
    } else {
        sendResponse(false, "Error occurred while deletion!");
    }
} catch (Exception $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
    sendResponse(false, $e->getMessage());
}
