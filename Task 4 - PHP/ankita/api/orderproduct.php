<?php 
require_once "dbconnetion.php";

$product =$_POST['product'];
$userID = $_POST['user_id'];
if(count($product)==0){
$response =["status"=>false,"message"=>"Please select item to place order!.","data"=>null];
echo json_encode($response);
return;

}

if(!(array_key_exists('user_id',$_POST)) || !$_POST['user_id']){
    $response=["status"=>false,"message"=> " user_id is not valid"];
    echo json_encode($response);
    return;
  }
  if(!(array_key_exists('product',$_POST)) || !$_POST['product']){
     $response=["status"=>false,"message"=> "no valid  product "];
    echo json_encode($response);
    return;
  }

try{

if(!$product){

echo json_encode(array('status'=> false,'msg'=> 'No data found'));
return;
}
$statement1=$pdo->prepare('select * from users where id=?;');
$statement1->execute([$userID]);
$result1=$statement1->fetch(PDO::FETCH_ASSOC);
if(count($result1)==0){
echo json_encode(array('status'=> false,'msg'=> 'not a vaild user'));
return;

}
$statement2=$pdo->prepare('select * from product where id=?;');
$statement2->execute([$product[0]['id']]);
$result2=$statement2->fetch(PDO::FETCH_ASSOC);
if(count($result2)==0){
echo json_encode(array('status'=> false,'msg'=> 'no product found'));
return;

}

$order_no = rand(100, 10000);

$insertQuery = "INSERT INTO orders (users_id, product_id, quantity, order_no, orders_status_id) VALUES ";

for ($i = 0; $i < count($product); $i++) {
  $insertQuery .= "($userID, {$product[$i]['id']}, {$product[$i]['quantity']}, $order_no, 6)";
  if($i != (count($product) - 1)) {
    $insertQuery .= ", ";
  }
}

$pdo->beginTransaction();
$statement = $pdo->prepare($insertQuery);
$statement->execute();


$statement2 = $pdo->prepare('delete from cart where users_id = ?');
$statement2->execute([$userID]);

$pdo->commit();
$response =["status"=>true,"message"=>"Order placed successfully.","data"=>null];
echo json_encode($response);

}
catch(PDOException $e){
$pdo->rollBack();
}