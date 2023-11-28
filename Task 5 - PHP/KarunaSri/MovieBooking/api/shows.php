<?php

require("./utils/functions.php");

function addShow($showName, $showTime)
{
    $pdo = connect();

    $query = 'INSERT INTO shows (show_name, show_time) VALUES (:showName, :showTime)';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":showName", $showName, PDO::PARAM_STR);
    $stmt->bindParam(":showTime", $showTime, PDO::PARAM_STR);

    $stmt->execute();

    return $stmt->rowCount() > 0;
}


function getShowList()
{
    $pdo = connect();

    $query = 'SELECT * FROM theaterbranchmovieshows';
    $stmt = $pdo->prepare($query);
    $stmt->execute();


    $show = $stmt->fetchAll(PDO::FETCH_ASSOC);
    json_encode($show);

    foreach ($show as $row) {
        echo "<tr>
            <td>{$row['showid']}</td>
            <td>{$row['branchid']}</td>
            <td>{$row['movieid']}</td>
            <td>{$row['showtime']}</td>
            <td>{$row['showdate']}</td>
           
            <td><button class='btn btn-danger' onclick='deleteTheater({$row['showid']})'>Delete</button></td>
            <td>
              
        <button
        type='button'
        class='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#staticBackdrop'
      >
    Update
      </button>        
           </td>
        </tr>";
    }
}


function deleteShow($showId)
{
    $pdo = connect();

    // Check if the show is running 

    $query = 'DELETE FROM shows WHERE show_id = :showId';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":showId", $showId, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->rowCount() > 0;
}

// Use switch to determine the API action based on the 'action' parameter
$action = $_POST['action'] ?? '';

switch ($action) {
    case 'addShow':
        $showName = $_POST['showName'] ?? '';
        $showTime = $_POST['showTime'] ?? '';
        $result = addShow($showName, $showTime);
        echo json_encode(['success' => $result]);
        break;

    case 'getShowList':
        $showList = getShowList();
        // echo json_encode($showList);
        break;

    case 'deleteShow':
        $showId = $_POST['showId'] ?? 0;
        $result = deleteShow($showId);
        echo json_encode(['success' => $result]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action']);
}
