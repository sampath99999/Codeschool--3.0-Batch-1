<?php

require_once "./dbconnetion.php";
$status=true;
$email=$_POST['email'];
$password=$_POST['password'];

if(!(array_key_exists('email',$_POST)) || !$_POST['email']){
    $response=["status"=>false,"message"=> "please enter the valid email"];
    echo json_encode($response);
    return;
  }
  if(!(array_key_exists('password',$_POST)) || !$_POST['password']){
     $response=["status"=>false,"message"=> "please enter the valid password"];
    echo json_encode($response);
    return;
  }
  if(!$status){
    $response=["status"=>false,"message"=> "please filled the required field"];
    echo json_encode($response);
    return;
   }

if(strlen($email)>64){
    $response=["status"=>false,"message"=> "email not valid please enter within 64 character"];
    echo json_encode($response);
    return;
}
    else if(preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/',$email)){
    $response=["status"=>false,"message"=> "email sholud not contain spceial symbol excluded @"];
    echo json_encode($response);
    return;
    }
    
if(strlen($password)<4 ||strlen($password)>16 ){
    $response=["status"=>false,"message"=> "pasword should be minimum 8 character and maximum 16 character"];
    echo json_encode($response);
    return;
    }
    else if(preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/',$password)){
    $response=["status"=>false,"message"=> " password should dont have any spiceial character"];
    echo json_encode($response);
    return;
    }


try{
$statement = $pdo->prepare("select id,username,user_types_id,email,phone from users where email=? and password=? ");
$statement->execute([$email,md5($password)]);
$result = $statement->fetchAll(PDO::FETCH_ASSOC);
   if(count($result)==0){
    $response=["status"=>false,"message"=> "invalid login credential"];
    echo json_encode($response);
    return;
   }

   $token = rand(10000,10000000);

   $userId=$result[0]['id'];
   
  
   $statment1=$pdo->prepare('insert into session_table (users_id,user_tokan) values(?,?)');
   $statment1->execute([$userId,$token]);

   $response2 = [
    "token" =>$token,
    "myResult" =>$result
   ];
   $response=["status"=>true,"message"=>"login sucessfully","data"=>$response2];
   

 echo json_encode($response);
  

}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}