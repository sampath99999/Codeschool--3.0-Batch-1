<?php

require("./utils/connection.php");

$pdo=connect();

$sql= " SELECT
match_id,
matchname,
username,
score,
player_rank
FROM
(
    SELECT
        m.match_id,
        m.matchname,
        u.username,
        m.score,
        (
            SELECT
                COUNT(*) + 1
            FROM
                matches m2
            WHERE
                m2.match_id = m.match_id
                AND m2.score > m.score
        ) AS player_rank
    FROM
        matches m
        JOIN users u ON m.user_id = u.id
) AS ranked_players
ORDER BY
match_id,
player_rank
";
try{
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["result"=>$result]);
}
catch(PDOException $e)
{
    sendResponse(false, $e->getMessage());
    }

?>