<?php 
require_once "dbconnetion.php";

$userId = $_POST['user_id'];

$products = $_POST['products'];


try{

if(!$products || count($products)==0){

    $result = $pdo->prepare(' select p.name,p.id,p.image,count(c.id) as quantity from product as p join cart as c on c.product_id = p.id where users_id=? group by p.id,p.name,p.price');
$result->execute([$userId]);

$product = $result->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status"=>true,"message"=>"","data"=>$product]);

return;
}

for($i=0;$i<count($products);$i++){

$productId = $products[$i]["id"];

$statement = $pdo->prepare("insert into cart (users_id,product_id) values(?,?)");
$statement->execute([$userId,$productId]);
}

$result = $pdo->prepare('select p.name,p.id,p.image,count(c.id) as quantity from product as p join cart as c on c.product_id = p.id where users_id=? group by p.id,p.name
,p.price');
$result->execute([$userId]);

$product = $result->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status"=>true,"message"=>"","data"=>$product]);
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
