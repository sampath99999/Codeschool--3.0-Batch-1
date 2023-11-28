<?php 
require_once "dbconnetion.php";
   
$userID = $_POST['user_id'];

try{

  $statement=$pdo-> prepare(" select count (product_id) from cart where users_id=?;");
  $statement->execute([$userID]);
 $result= $statement->fetchAll(PDO::FETCH_ASSOC);
 $response=["status"=>true,"message"=>"cart count  sucessfully","data"=>$result];
   echo json_encode($response);

}
catch(PDOException $e){
         $response=["status"=>false,"message"=> $e->getMessage()];
    echo json_encode($response);
    return;
}
?>