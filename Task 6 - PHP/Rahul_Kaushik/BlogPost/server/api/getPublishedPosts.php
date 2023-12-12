<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "GET"){
    sendResponse(false, "Invalid Method Request");
}


$pdo = connect();

$query = "SELECT user_name, p.*,s.status_name FROM posts p JOIN users u on p.user_id = u.user_id JOIN status s on p.post_status = s.status_id WHERE p.post_status = 2";
$stmt = $pdo->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);

header('Content-Type: application/json');
echo $jsonResult;
?>
