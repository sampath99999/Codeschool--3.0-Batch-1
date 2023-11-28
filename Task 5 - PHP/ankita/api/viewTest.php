<?php

require_once "DBConnction.php";
$status = true;
$exam_id = $_POST["exam_id"];
$result = [];
$option = [];

$userId=$_POST['user_id'];
$token=$_POST['token'];

if(!$userId &&  !$token){
 $response=["status"=>false,"message"=> "Not a valid User"];
    echo json_encode($response);
 return;

}



if (!(array_key_exists('exam_id', $_POST)) || !$_POST['exam_id']) {
    $response = ["status" => false, "message" => "exam id is not valid"];
    echo json_encode($response);
    return;
}
if (!is_numeric($exam_id)) {
    $response = ["status" => false, "message" => "exam_id is not vaild"];
    echo json_encode($response);
    return;
}
try {

$checkVaildToken=$pdo->prepare("select * from session_token where user_tokan=? and users_id=?");
$checkVaildToken->execute([$token,$userId]);
$isVaildToken= $checkVaildToken->fetchAll(PDO::FETCH_ASSOC);
   if(count($isVaildToken)==0){
    $response=["status"=>false,"message"=> "Session  Time Expired"];
    echo json_encode($response);
    return;
   }
    $getQustion = $pdo->prepare("SELECT q.id, qustion_name, option_name, is_answer,a.id as answer_id FROM subject_exam AS se JOIN qustions AS q ON se.id = q.subject_exam_id JOIN answers AS a ON q.id = a.qustion_id WHERE subject_exam_id=?");
    $getQustion->execute([$exam_id]);
    $getQustionDetails = $getQustion->fetchAll(PDO::FETCH_ASSOC);

    if (count($getQustionDetails) == 0) {
        $response = ["status" => false, "message" => "No question is added yet!"];
        echo json_encode($response);
        return;
    }

    $result = [];
    foreach ($getQustionDetails as $row) {
        $option = [
            "option_name" => $row['option_name'],
            "is_answer" => $row['is_answer'],
            "option_id" => $row['answer_id']
        ];

        if (isset($result[$row['id']])) {
            $result[$row['id']]['options'][] = $option;
        } else {
            $result[$row['id']] = [
                "question_name" => $row['qustion_name'],
                "question_id" => $row['id'],
                "options" => [$option]
            ];
        }
    }

    $result = array_values($result);
    $response = ["status" => true, "message" => "data get  sucessfully", "data" => $result];
    echo json_encode($response);
} catch (PDOException $e) {
    $response = ["status" => false, "message" => $e->getMessage()];
    echo json_encode($response);
    return;
}
