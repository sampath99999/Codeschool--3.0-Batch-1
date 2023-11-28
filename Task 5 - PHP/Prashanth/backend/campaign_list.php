<?php

require("./utils/connection.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}
if (!isset($_POST["name"])) {
    sendResponse(false, "Campaign Name is required");
}
if (!isset($_POST["description"])) {
    sendResponse(false, "Description is required");
}
if (!isset($_POST["goal_amount"])) {
    sendResponse(false, "Price is required");
}
if (!isset($_POST["start_date"])) {
    sendResponse(false, "Starting date is required");
}
if (!isset($_POST["end_date"])) {
    sendResponse(false, "ending date is required");
}
$name = $_POST["name"];
$description = $_POST["description"];
$goal_amount = $_POST["goal_amount"];
$start_date = $_POST["start_date"];
$end_date = $_POST["end_date"];

$pdo = connect();

$query = "INSERT INTO campaigns ( name, description, goal_amount, start_date, end_date) VALUES (:name, :description, :goal_amount, :start_date, :end_date)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("name", $name, PDO::PARAM_STR);
$stmt->bindParam("description", $description, PDO::PARAM_STR);
$stmt->bindParam("goal_amount", $goal_amount, PDO::PARAM_INT);
$stmt->bindParam("start_date", $start_date, PDO::PARAM_STR);
$stmt->bindParam("end_date", $end_date, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");

