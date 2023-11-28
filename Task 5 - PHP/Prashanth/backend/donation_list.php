<?php

require("./utils/connection.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}
if (!isset($_POST["donor_name"])) {
    sendResponse(false, "Donor Name is required");
}
if (!isset($_POST["donor_email"])) {
    sendResponse(false, "email is required");
}
if (!isset($_POST["amount"])) {
    sendResponse(false, "Price is required");
}
if (!isset($_POST["donation_date"])) {
    sendResponse(false, "date is required");
}
$donor_name = $_POST["donor_name"];
$donor_email = $_POST["donor_email"];
$amount = $_POST["amount"];
$donation_date = $_POST["donation_date"];

$pdo = connect();

$query = "INSERT INTO donations (donor_name, donor_email, amount, donation_date) VALUES (:donor_name, :donor_email, :amount, :donation_date)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("donor_name", $donor_name, PDO::PARAM_STR);
$stmt->bindParam("donor_email", $donor_email, PDO::PARAM_STR);
$stmt->bindParam("amount", $amount, PDO::PARAM_INT);
$stmt->bindParam("donation_date", $donation_date, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");

