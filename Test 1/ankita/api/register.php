<?php

require_once "DBConn.php";
$status=true;

$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$name = $_POST['name'];



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

if(strlen($name)>12){
   $response=["status"=>false,"message"=> "please enter the name less than 12 characters"];
    echo json_encode($response);
    return;
}else if(preg_match('/[\'{#~?><>@,.|=_^£$%&*()}+¬-]/',$name)){
    $response=["status"=>false,"message"=> "name sholud not have any special symbol"];
    echo json_encode($response);
    return;

}

if(strlen($phone)!= 10){
    $response=["status"=>false,"message"=> "please enter 10 digit phone Number"];
    echo json_encode($response);
    return;
}else if(! is_numeric($phone)){
    $response=["status"=>false,"message"=> "please enter only number"];
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
  $statement1=$pdo->prepare("select * from users where email=? or phone=?");
  $statement1->execute([$email,$phone]);
  $result = $statement1->fetchAll(PDO::FETCH_ASSOC);
  if(count($result)!=0){
    $response=["status"=>true,"message"=>"phone no or email exits ","myResult"=>$result];
    echo json_encode($response);
     return;
  }
  
$statement2 = $pdo->prepare("insert into users (username,email,password,phone) values (?,?,?,?); ");
$statement2->execute([$name,$email,md5($password),$phone]);

 $response=["status"=>true,"message"=>"register sucessfully","myResult"=>null];
 echo json_encode($response);
 

}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}

?>