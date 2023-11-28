<?php

require("./utils/functions.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "Invalid request method";
}

$name = $_POST["name"];
$theaterid = $_POST["theaterid"];
$address = $_POST["address"];
$capacity = $_POST["capacity"];

// echo "You are in php :" . $name;
// echo "You are in php :" . $address;
// echo "You are in php :" . $theaterid;
// echo "You are in php :" . $capacity;

$pdo = connect();

$query = 'INSERT INTO theaterbranches ( branchname,theaterid,location,capacity) VALUES (:name,:theaterid,:address,:capacity)';

$stmt = $pdo->prepare(($query));

$stmt->bindParam(":name", $name, PDO::PARAM_STR);
$stmt->bindParam(":theaterid", $theaterid, PDO::PARAM_INT);
$stmt->bindParam(":address", $address, PDO::PARAM_STR);

$stmt->bindParam(":capacity", $capacity, PDO::PARAM_STR);

$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo " Branch Inserted Successfully!";
} else {
    echo "Not Able to Add";
}
