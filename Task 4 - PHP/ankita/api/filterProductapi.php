<?php 
require_once "dbconnetion.php";

$categoryId = $_POST['category_id'];

try{


if($categoryId){
    $statement2 = $pdo->prepare("select * from product as p join category as c on p.category_id=c.id where p.category_id=?");
    $statement2->execute([$categoryId]);
    $result2= $statement2->fetchAll(PDO::FETCH_ASSOC);
}else{
    $statement2 = $pdo->prepare("select * from product as p join category as c on p.category_id=c.id ");
    $statement2->execute([]);
    $result2= $statement2->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode(["status"=>true,"message"=>"Data found successfully","data"=>$result2]);
}
catch(PDOException $e){
         $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
?>