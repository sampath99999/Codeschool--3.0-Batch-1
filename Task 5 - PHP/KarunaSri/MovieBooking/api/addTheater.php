<?php

require("./utils/functions.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "Invalid request method";
}

$name = $_POST["name"];
$address = $_POST["address"];

// echo "You are in php :" . $name;
// echo "You are in php :" . $address;

$pdo = connect();

$query = 'INSERT INTO theaters ( theatername,address) VALUES (:name,:address)';

$stmt = $pdo->prepare(($query));

$stmt->bindParam(":name", $name, PDO::PARAM_STR);
$stmt->bindParam(":address", $address, PDO::PARAM_STR);

$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo "Added successfully";
} else {
    echo "NOT able to add";
}
