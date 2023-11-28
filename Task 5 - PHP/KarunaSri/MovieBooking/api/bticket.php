<?php

require("./utils/functions.php");

$pdo = connect();

try {
    $pdo = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Fetch available movies and showtimes
$stmt = $pdo->prepare("SELECT s.showid, m.title, s.showtime FROM theaterbranchmovieshows s
                      JOIN movies m ON s.movieid = m.movieid
                      WHERE s.showtime > NOW()");
$stmt->execute();
$shows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Display available movies and showtimes in a dropdown
echo '<div class="form-group">
        <label for="show_id">Select Movie and Showtime:</label>
        <select class="form-control" name="show_id" required>';
foreach ($shows as $show) {
    echo '<option value="' . $show['showid'] . '">' . $show['title'] . ' - ' . $show['showtime'] . '</option>';
}
echo '</select>
    </div>';
