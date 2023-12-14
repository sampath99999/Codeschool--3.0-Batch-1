<?php

require_once "DBConn.php";
$status=true;

$email = $_POST['emailId'];
$fName= $_POST['fName'];
$lName=$_POST['lname'];
$location_id=$_POST['location_id'];
$working_status_id=$_POST['working_status_id'];
$working_postion_id=$_POST['working_postions_id'];
$phone = $_POST['phone'];







try{
 
  

$statement2 = $pdo->prepare("insert into employees (f_name,l_name,phone,email,working_status_id,working_postions_id ,location_id) values (?,?,?,?,?,?); ");
$statement2->execute([$fName,$lName,$phone,$email,$working_status_id,$working_postion_id,$location_id ]);

 $response=["status"=>true,"message"=>"added sucessfully","data"=>null];
 echo json_encode($response);
 

}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}

?>