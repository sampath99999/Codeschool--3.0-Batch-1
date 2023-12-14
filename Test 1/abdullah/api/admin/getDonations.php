<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("../utils/functions.php");

try {
    $pdo = connect();

    $query = "
    SELECT u.name, u.email, u.phoneNo, d.paymentStatus, d.amountDonated, cd.expirationDate, cd.cvv, cd.ifscCode
    FROM users u
    JOIN donations d ON u.id = d.usersId
    JOIN cardDetails cd ON d.cardDetailsId = cd.id;";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0) {
        sendResponse(true, "Successfully fetched data", $result);
    } else {
        sendResponse(false, "No data found");
    }
} catch (PDOException $e) {
    sendResponse(false, "Error: " . $e->getMessage());
}
?>
