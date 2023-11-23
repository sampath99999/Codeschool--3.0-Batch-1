<?php

require("./utilites/Connections.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    sendResponse(false, "id is required");
}


$id = $_POST["id"];


$pdo = connect();

$query1 ="DELETE FROM salaries WHERE employee_id = :id";
$stmt1 = $pdo->prepare($query1);
$stmt1->bindParam("id", $id, PDO::PARAM_INT);


$stmt1->execute();


$query2 ="DELETE FROM salary_details WHERE id in(SELECT id FROM salaries WHERE employee_id = :id)";
$stmt2 = $pdo->prepare($query2);
$stmt2->bindParam("id", $id, PDO::PARAM_INT);


$stmt2->execute();

$query3 ="DELETE FROM salary_components WHERE id in(SELECT id FROM salary_details WHERE id in(SELECT id FROM salaries WHERE employee_id = :id))";
$stmt3 = $pdo->prepare($query3);
$stmt3->bindParam("id", $id, PDO::PARAM_INT);


$stmt3->execute();

$query ="DELETE FROM employees WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_INT);


$stmt->execute();

if($stmt1->rowCount() > 0 && $stmt2->rowCount()>0 && $stmt->rowCount() > 0) {
    sendResponse(true, "Successfully deleted", ["id" => $id]);
}
elseif ($stmt->rowCount() > 0) {
    sendResponse(true, "Successfully deleted", ["id" => $id]);
}

sendResponse(false, "Can't Login, Please try again!");
