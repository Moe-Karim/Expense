<?php
include "connection.php";

$data = file_get_contents("php://input");

$transaction = json_decode($data, true);
$amount=$transaction['amount'];
$type=$transaction['type'];
$description=$transaction['description'];
$date=$transaction['date'];

if (isset($type, $amount, $description, $date)) {
    $sql = $connection->prepare("INSERT INTO transactions (user,type, amount, description, date) VALUES ('JohnDoe',?, ?, ?, ?)");
    $sql->bind_param("ssss", $type, $amount, $description, $date);

    if ($sql->execute()) {
        echo "Transaction added successfully";
    } else {
        echo "Error inserting transaction: " . $connection->error;
    }
} else {
    echo "Missing required fields";
}

