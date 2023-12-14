<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "GET"){
    sendResponse(false, "Invalid Method Request");
}

$pdo = connect();

$query = "SELECT user_name, p.* FROM posts p JOIN users u on p.user_id = u.user_id";
$stmt = $pdo->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);

header('Content-Type: application/json');
echo $jsonResult;

?>