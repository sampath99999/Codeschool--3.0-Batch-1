<?php
require("./utils/functions.php");

if(!$_SERVER["REQUEST_METHOD"] == "POST"){
    sendResponse(false, "Invalid Method Request");
}
if (!isset($_POST["user_id"])) {
    sendResponse(false, "User Id required");
}

$user_id = $_POST["user_id"];
$pdo = connect();

$query = "SELECT user_name, p.*,s.status_name FROM posts p JOIN users u on p.user_id = u.user_id JOIN status s on p.post_status = s.status_id WHERE p.user_id = :user_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);

header('Content-Type: application/json');
echo $jsonResult;

?>