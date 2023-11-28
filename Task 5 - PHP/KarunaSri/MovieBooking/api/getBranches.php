<?php

require("./utils/functions.php");

$pdo = connect();

$query = 'SELECT * FROM theaterbranches';

$stmt = $pdo->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $theaterbranches = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($theaterbranches);

    foreach ($theaterbranches as $row) {
        echo "<tr>
        <td>{$row['branchid']}</td>
        <td>{$row['theaterid']}</td>
        <td>{$row['branchname']}</td>
        <td>{$row['location']}</td>
        <td>{$row['capacity']}</td>
       
        <td><button class='btn btn-danger' onclick='deleteBranch({$row['branchid']})'>Delete</button></td>
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
