<?php
require_once "DBConn.php";
$status = true;


try {
    $showWorkingStatusDetails = $pdo->prepare("select * from working_status");
    $showWorkingStatusDetails->execute();
    $isWorkingStatusDetails = $showWorkingStatusDetails->fetchAll(PDO::FETCH_ASSOC);

    $showLocationsDetails = $pdo->prepare("select * from location");
    $showLocationsDetails->execute();
    $isLocationsDetails = $showLocationsDetails->fetchAll(PDO::FETCH_ASSOC);


    $showWorkingPostionsDetails = $pdo->prepare("select * from working_postions");
    $showWorkingPostionsDetails->execute();
    $isWorkingPostionsDetails = $showWorkingPostionsDetails->fetchAll(PDO::FETCH_ASSOC);
    $showEmployeesDetails = $pdo->prepare("select  empcode, concat(f_name, ' ', l_name) as name, phone,email,ws.description as working_status, l.description as location, wp.description as working_postions from employees as e join working_status as ws on ws.id = e.working_status_id   join working_postions as wp on wp.id =e.working_postions_id  join location as l on  l.id =e.location_id  order by empcode;
 ");
    $showEmployeesDetails->execute();
    $isEmployeesDetails = $showEmployeesDetails->fetchAll(PDO::FETCH_ASSOC);

    if (count($isWorkingStatusDetails) == 0) {
        $status = false;
        $message = " Working Status Not Found";
    }
    if (count($isLocationsDetails) == 0) {
        $status = false;
        $message = " Location  Not Found";
    }
    if (count($isWorkingPostionsDetails) == 0) {
        $status = false;
        $message = "Working Postions  Not Found";
    }
    if (count($isEmployeesDetails) == 0) {
        $response = [
            "status" => false, "message" => " Employees Details is Empty ", "data" => null
        ];
        echo json_encode($response);
        return;
    }
    $response = ["status" => true, "message" => "Employees Details ", "data" => ["working_status" => $isWorkingStatusDetails, "location" => $isLocationsDetails, "working_postions" => $isWorkingPostionsDetails, "empDetail" => $isEmployeesDetails]];
    echo json_encode($response);
} catch (PDOException) {
    $response = ["status" => false, "message" => "Something went Wrong !"];
    echo json_encode($response);
    return;
}
