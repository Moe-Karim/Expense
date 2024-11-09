<?php
include "connection.php";
$data = file_get_contents("php://input");

$transaction = json_decode($data, true);

$amount = $transaction['amount'];
$type = $transaction['type'];
$description = $transaction['description'];
$date = $transaction['date'];
$id = $transaction['id'];

if (isset($type, $amount, $description, $date, $id)) {
    $sql = $connection->prepare("UPDATE transactions
                                 SET amount = ?, type = ?, date = ?, description = ?
                                 WHERE id = ?");

    $sql->bind_param('sssss', $amount, $type, $date, $description, $id);

    if ($sql->execute()) {
        echo "Transaction edited successfully";
    } else {
        echo "Error editing transaction: " . $connection->error;
    }
} else {
    echo "Missing required fields";
}
