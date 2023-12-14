<?php

require_once "DBConn.php";
$status = true;
$userId = $_POST['user_id'];
$token = $_POST['token'];

if (!$userId &&  !$token) {
   $response = ["status" => false, "message" => "Not a Valid User"];
   echo json_encode($response);
   return;
}
date_default_timezone_set('Asia/Kolkata');

$currentDateTime = date("Y-m-d H:i:s");

try {

   $checkVaildToken = $pdo->prepare("select * from session_table where user_tokan= '".$token."' and users_id='".$userId."' and expire_time>'".$currentDateTime."'");
   $checkVaildToken->execute();
   $isVaildToken = $checkVaildToken->fetchAll(PDO::FETCH_ASSOC);

   if (count($isVaildToken) == 0) {
      $response = ["status" => false, "message" => "Session  Time Expired"];
      echo json_encode($response);
      return;
   }


   $response = ["status" => true, "message" => "User Verified Successfully"];
   echo json_encode($response);
} catch (PDOException) {
   $response = ["status" => false, "message" => "Something Went Wrong !"];
   echo json_encode($response);
   return;
}
