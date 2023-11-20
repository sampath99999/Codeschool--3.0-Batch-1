<?php 
require_once "dbconnetion.php";

$product =$_POST['product'];
$userID = $_POST['user_id'];

try{    


if(!$product){

echo json_encode(array('status'=> false,'msg'=> 'No data found'));
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