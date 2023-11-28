<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');


require("../utils/functions.php");

try {
    $pdo = connect();
    $query = 'SELECT
    shows.id AS show_id,
    theatre_branches.branch_name,
    screens.screen_no,
    movies.title AS Movie_Name,
    slots.start_time,
    shows.running_show
FROM
    shows
JOIN
    theatre_branches ON shows.theatre_branch_id = theatre_branches.theatre_id
JOIN
    movies ON shows.movie_id = movies.id
JOIN
    screens ON shows.screen_id = screens.id
JOIN
    slots ON shows.slot_id = slots.id;
';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $noOfTheatres = $stmt->rowCount();

    if ($noOfTheatres === 0) {
        sendResponse(false, "Error while fetching Theatres");
    } else {
        sendResponse(true, "Successful! Total no of Theatres found: $noOfTheatres", $result);
    }
} catch (PDOException $e) {
    $response["status"] = false;
    $response["message"] = "Invalid Url";
}
