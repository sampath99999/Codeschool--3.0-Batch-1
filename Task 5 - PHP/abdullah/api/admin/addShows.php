<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {


    $branchId = $_POST['selectedBranchName'];
    $screenId = $_POST['selectedScreenNo'];
    $movieId = $_POST['selectedMovieTitle'];
    $slotId = $_POST['selectedSlot'];


    $pdo = connect();
    $query = "INSERT INTO shows ( theatre_branch_id, screen_id, movie_id, slot_id) VALUES (  :branchId, :screenId, :movieId, :slotId )";

    $stmt = $pdo->prepare($query);



    $stmt->bindParam(":branchId", $branchId, PDO::PARAM_STR);
    $stmt->bindParam(":screenId", $screenId, PDO::PARAM_STR);
    $stmt->bindParam(":movieId", $movieId, PDO::PARAM_STR);
    $stmt->bindParam(":slotId", $slotId, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        sendResponse(true, "New Show added on Branch: $branchId added successfully!");
    } else {
        sendResponse(false, "Error occurred while insertion!");
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
    sendResponse(false, $e->getMessage());
}
