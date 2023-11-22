<?php 
require_once "dbconnetion.php";
$status=true;


try{

$statement = $pdo->prepare("select * from users where users_type_id=2");
$statement->execute([]);
$result= $statement->fetchAll(PDO::FETCH_ASSOC);

$response=["status"=>true,"message"=>"order load  sucessfully","data"=>$result];
echo json_encode($response);
 
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
