<?php 
require_once "dbconnetion.php";

$product =$_POST['product'];
$userID = $_POST['user_id'];
if(count($product)==0){
$response =["status"=>false,"message"=>"Please select item to place order!.","data"=>null];
echo json_encode($response);
return;

}

try{
$pdo->beginTransaction();
  $order_no = rand(100, 10000);
for ($i = 0; $i < count($product); $i++) {
  

    $statement = $pdo->prepare('INSERT INTO orders (users_id, product_id, quantity, order_no, orders_status_id) VALUES (?, ?, ?, ?, ?)');
    $statement->execute([$userID, $product[$i]['id'], $product[$i]['quantity'], $order_no, 6]);
}

$statement2 = $pdo->prepare('delete from cart where users_id = ?');
$statement2->execute([$userID]);

$pdo->commit();
$response =["status"=>true,"message"=>"Order placed successfully.","data"=>null];
echo json_encode($response);

}
catch(PDOException $e){
$pdo->rollBack();
}