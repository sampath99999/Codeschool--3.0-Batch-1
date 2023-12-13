<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("./functions.php");

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $movieId = $_POST["movie_id"];
        $noOfSeats = $_POST["noOfSeats"];
        $branchName = $_POST["branchName"];
        $numberOfTickets = $_POST["num_tickets"];

        if (empty($movieId) || empty($noOfSeats) || empty($branchName) || empty($numberOfTickets) || !is_numeric($numberOfTickets) || $numberOfTickets <= 0) {
            sendResponse(false, "Invalid input. Please fill in all fields with valid values.");
            exit();
        }

        $pdo = connect();
        // for ($i = 1; $i <= $numberOfTickets; $i++) {
        $i = 1;
        $query = "INSERT INTO ticket_booking_data (movie_id, no_of_seats, branch_name, noOfTickets) VALUES (:movieId, :noOfSeats, :branchName, :numberOfTickets)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":movieId", $movieId, PDO::PARAM_INT);
        $stmt->bindParam(":noOfSeats", $noOfSeats, PDO::PARAM_INT);
        $stmt->bindParam(":branchName", $branchName, PDO::PARAM_INT);
        $stmt->bindParam(":numberOfTickets", $numberOfTickets, PDO::PARAM_INT);

        $stmt->execute();
        //}

        if ($stmt->rowCount() > 0) {
            sendResponse(true, "Booking completed successfully!");
        } else {
            sendResponse(false, "Error occurred while Booking!");
        }
    } else {
        sendResponse(false, "Invalid request method. Only POST requests are allowed.");
    }
} catch (Exception $e) {
    sendResponse(false, $e->getMessage());
}
