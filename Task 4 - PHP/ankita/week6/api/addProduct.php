<?php 
require_once "dbconnetion.php";
$status=true;
$category_id=$_POST["category_id"];
$image=$_POST["image"];
$name=$_POST["name"];
$price=$_POST["price"];
try{
    $statement1 = $pdo->prepare("insert into product (category_id,name,price,image) values (?,?,?,?)");
     $statement1->execute([$category_id,$name,$price,$image]);
    $response=['status'=>true,'message'=>'product added'];
    echo json_encode($response);
 
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
