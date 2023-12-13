<?php
require('./utils/functions.php');

$pdo = connect();

$query = 'SELECT * FROM movies';
$stmt = $pdo->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $movie = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($movie);


    foreach ($movie as $row) {
        echo "<tr>
            <td>{$row['movieid']}</td>
            <td>{$row['title']}</td>
            <td>{$row['genre']}</td>
            <td>{$row['releasedate']}</td>
            <td>{$row['duration']}</td>
            <td><img src={$row['image']} ></td>
            <td><button class='btn btn-danger' onclick='deleteData({$row['movieid']})'>Delete</button></td>
            <td><button class='btn btn-primary' onclick='updateData({$row['movieid']})'>Update</button></td>
        </tr>";
    }
} else {
    echo "NO Movies here";
}
