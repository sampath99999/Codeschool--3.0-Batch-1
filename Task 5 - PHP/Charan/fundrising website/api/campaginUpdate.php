<?php
    require("./utils/functions.php");



    if(!isset($_POST["name"])){
        sendResponse("false","Username is required");
    }
    if(!isset($_POST["mobile"])) {
        sendResponse("false","Mobile is required");
    }

    if(!isset($_POST["program"])){
        sendResponse("false","Campaign name is required");

    }

    if(!isset($_POST["description"])){
        sendResponse("false","Description is required ");
    }

    if(!isset($_POST["goal"])){
        sendResponse("false","Goal amount is required");
    }

    $name = $_POST["name"];
    $campagin = $_POST["program"];
    $description = $_POST["description"];
    $mobile = $_POST["mobile"];
    $goal = $_POST["goal"];

    // $query = "SELECT * FROM campagins WHERE name = :name";
    // $stmt = $pdo->prepare($query);
    // $stmt->bindParam(":name", $name, PDO::PARAM_STR);
    // $stmt->execute();

    //     if ($stmt->rowCount() > 0) {
    //         sendResponse(false, "name already exists");
    //     }
    $pdo=connect();

        $query = "INSERT INTO campaigns (name, campagin_name, description, mobile,goal) VALUES (:name, :program, :description, :mobile,:goal)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":name", $name, PDO::PARAM_STR);
        $stmt->bindParam(":program", $campagin, PDO::PARAM_STR);
        $stmt->bindParam(":description", $description, PDO::PARAM_STR);
        $stmt->bindParam(":mobile",$mobile, PDO::PARAM_STR);
        $stmt->bindParam(":goal", $goal, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            sendResponse(true, "Registered Successfully");
        }

        sendResponse(false, "User registration failed");





        ?>