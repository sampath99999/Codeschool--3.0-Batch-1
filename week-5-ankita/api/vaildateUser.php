

<?php

require_once "DBConnction.php";
$status=true;
$userId=$_POST['user_id'];
$token=$_POST['token'];

if(!$userId || !$token){
 $response=["status"=>false,"message"=> "Not a valid User"];
    echo json_encode($response);
 return;

}
$current_DateTime=date("Y-m-d H:i:s");
try{
$checkVaildToken=$pdo->prepare("select * from session_token where user_tokan=? and users_id=? and expire_time>?");
$checkVaildToken->execute([$token,$userId,$current_DateTime]);
$isVaildToken= $checkVaildToken->fetchAll(PDO::FETCH_ASSOC);
   if(count($isVaildToken)==0){
    $response=["status"=>false,"message"=> "Session  Time Expired"];
    echo json_encode($response);
    return;
   }
$checkUserRole=$pdo->prepare("select * from users where user_types_id=2 and id=?");
$checkUserRole->execute([$userId]);
$isUserRole= $checkUserRole->fetchAll(PDO::FETCH_ASSOC);
   if(count($isUserRole)==0){
    $response=["status"=>false,"message"=> "You are not Authorized to this page"];
    echo json_encode($response);
    return;
   }

    $response=["status"=>true,"message"=> "User verified successfully"];
echo json_encode($response);

}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}
?>