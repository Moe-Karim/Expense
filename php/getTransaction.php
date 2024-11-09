<?php
include "connection.php";

$sql = "SELECT * FROM transactions";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    $items = [];
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
} else {
    echo json_encode([]);
}
