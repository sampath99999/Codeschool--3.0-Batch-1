<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("./utils/functions.php");

if (!$_SERVER["REQUEST_METHOD"] == "GET") {
    sendResponse(false, "Invalid request method");
}else{
   


    $pdo = connect();
    $prod_id = $_GET["prod_id"];

    $query = "SELECT * FROM products WHERE prod_id = :prod_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam("prod_id", $prod_id);

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    $jsonResult = json_encode($result);

    
    header('Content-Type: application/json');
    echo $jsonResult;

    
}


?>