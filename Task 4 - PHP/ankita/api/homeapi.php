<?php 
require_once "dbconnetion.php";
$status=true;


try{
    $statement1 = $pdo->prepare("select * from category");
     $statement1->execute();
    $result1= $statement1->fetchAll(PDO::FETCH_ASSOC);


$statement2 = $pdo->prepare("select * from product ");
$statement2->execute();
$result2= $statement2->fetchAll(PDO::FETCH_ASSOC);


if(count($result1)==0){
    $status = false;
    $message = "no category found";
   
}
if(count($result2)==0){
    $response=[
        "status"=> false, "message"=>"no products found", "data"=> null    ];
        echo json_encode($response);
        return;
}

$response=["status"=>true,"message"=>"data get  sucessfully","myResult"=>["category"=>$result1,"product"=>$result2]];
echo json_encode($response);
 
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
