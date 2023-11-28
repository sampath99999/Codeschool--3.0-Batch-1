<?php

require_once "DBConnction.php";
$status=true;
$subject_id=$_POST["subject_id"];
$userId=$_POST['user_id'];
$token=$_POST['token'];

if(!$userId &&  !$token){
 $response=["status"=>false,"message"=> "Not a valid User"];
    echo json_encode($response);
 return;

}


if(!(array_key_exists('subject_id',$_POST)) || !$_POST['subject_id']){
    $response=["status"=>false,"message"=> "subject id is not valid"];
    echo json_encode($response);
    return;
  }
if(! is_numeric($subject_id)){
    $response=["status"=>false,"message"=> "subject_id only contain numbers"];
    echo json_encode($response);
    return;

  }
try{
$checkVaildToken=$pdo->prepare("select * from session_token where user_tokan=? and users_id=?");
$checkVaildToken->execute([$token,$userId]);
$isVaildToken= $checkVaildToken->fetchAll(PDO::FETCH_ASSOC);
   if(count($isVaildToken)==0){
    $response=["status"=>false,"message"=> "Session  Time Expired"];
    echo json_encode($response);
    return;
   }

$getExam=$pdo->prepare("select s.name, se.exam_name,se.total_no_of_qustions from subject_exam as se join subjects as s on se.subject_id=s.id where subject_id=?;");
$getExam->execute([$subject_id]);
$getExamDetails= $getExam->fetchAll(PDO::FETCH_ASSOC);
   if(count($getExamDetails)==0){
    $response=["status"=>false,"message"=> "No Test is added yet !"];
    echo json_encode($response);
    return;
   }
$response=["status"=>true,"message"=>"data get  sucessfully","data"=>$getExamDetails];
echo json_encode($response);
}
catch(PDOException $e){
    $response=["status"=>false,"message"=> $e->getMessage()];
  echo json_encode($response);
  return;
}
?>

