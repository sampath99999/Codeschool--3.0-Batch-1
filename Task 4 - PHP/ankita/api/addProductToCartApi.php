<?php 
require_once "dbconnetion.php";

$product =$_POST['product'];
$userID = $_POST['user_id'];


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
$statement2->execute([$product['id']]);
$result2=$statement2->fetch(PDO::FETCH_ASSOC);
if(count($result2)==0){
echo json_encode(array('status'=> false,'msg'=> 'no product found'));
return;

}




$statement = $pdo->prepare('insert into cart (product_id,users_id) values(?,?)');
$statement->execute([$product['id'],$userID]);

echo json_encode(["status"=>true,"message"=>"Product added to cart successfully"]);
return;

}
catch(PDOException $e){
 $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}

?>