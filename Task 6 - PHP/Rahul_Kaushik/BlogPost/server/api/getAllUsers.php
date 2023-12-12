<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "GET"){
    sendResponse(false, "Invalid Method Request");
}

$pdo = connect();

$query = "SELECT  ur.role_name, u.* FROM users u JOIN user_roles ur ON user_role = role_id";
$stmt = $pdo->prepare($query);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);

header('Content-Type: application/json');
echo $jsonResult;

?>