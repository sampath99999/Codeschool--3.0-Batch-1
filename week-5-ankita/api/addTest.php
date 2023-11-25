<?php

require_once "DBConnction.php";
$status = true;
$subject_id = $_POST['id'];
$examName = $_POST['ExamName'];
$qustions_Count = $_POST['qustionCount'];
$qustions = $_POST['qustions'];




try {

    $pdo->beginTransaction();

    $addExamDetail = $pdo->prepare("insert into subject_exam (subject_id,exam_name,total_no_of_qustions,status) values (?,?,?,1); ");
    $addExamDetail->execute([$subject_id, $examName, $qustions_Count]);


    $getExamId = $pdo->prepare("select id from subject_exam where subject_id=? order by id desc limit 1;");
    $getExamId->execute([$subject_id]);
    $isExamId = $getExamId->fetchAll(PDO::FETCH_ASSOC);




    for ($i = 0; $i < count($qustions); $i++) {
        $qustionName = $qustions[$i]['qustionName'];

        $addQustions = $pdo->prepare("insert into  qustions(subject_exam_id,qustion_name) values(?,?);");
        $addQustions->execute([$isExamId[0]['id'], $qustionName]);






        $getQustionsId = $pdo->prepare("select id from qustions where subject_exam_id=? order by id desc limit 1;");
        $getQustionsId->execute([$isExamId[0]['id']]);
        $isQustionsId = $getQustionsId->fetchAll(PDO::FETCH_ASSOC);

        $insertAnswerQuery = "insert into answers(qustion_id,option_name,is_answer) values ";


        $option = $qustions[$i]['option'];
        for ($j = 0; $j < count($option); $j++) {
            
          $addAnswers = $pdo->prepare("insert into answers(qustion_id,option_name,is_answer) values (?,?,?);");
            $addAnswers->execute([$isQustionsId[0]['id'], $option[$j]['optionName'], $option[$j]['is_Answer']]);
            }

            }

            

            



           $pdo->commit();
          
            $response = ["status" => true, "message" => "test  added sucessfully", "data" => null];
            echo json_encode($response);
}
    
 catch (PDOException $e) {
    $pdo->rollBack();
    $response = ["status" => false, "message" => $e->getMessage()];
    echo json_encode($response);
    return;
}
