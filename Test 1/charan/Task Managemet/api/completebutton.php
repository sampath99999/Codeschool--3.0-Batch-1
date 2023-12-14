<?php
    require("utils/function.php");
    $pdo = connect();

    $query = "SELECT * FROM completedbutton";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    
    $jsonResult = json_encode($result);


    echo $jsonResult;
?>
