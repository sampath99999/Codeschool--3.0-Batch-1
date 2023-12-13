<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {


    $branchName = $_POST['branchName'];
    $city = $_POST['city'];
    $address = $_POST['address'];
    $theatreStatus = $_POST['theatreStatus'];

    echo "$city";
    echo "$branchName";





    $pdo = connect();
    $query = "INSERT INTO theatre_branches ( branch_name, city, address, status) VALUES (  :branchName, :city, :address, :theatreStatus )";

    $stmt = $pdo->prepare($query);



    $stmt->bindParam(":branchName", $branchName, PDO::PARAM_STR);
    $stmt->bindParam(":city", $city, PDO::PARAM_STR);
    $stmt->bindParam(":address", $address, PDO::PARAM_STR);
    $stmt->bindParam(":theatreStatus", $theatreStatus, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "Theatre $branchName added successfully!");
    } else {
        sendResponse(false, "Error occurred while insertion!");
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
    sendResponse(false, $e->getMessage());
}
