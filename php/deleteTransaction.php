<?php
include "connection.php";

if (isset($_GET['index'])) {
    $index = ($_GET['index']);

    $sql = $connection->prepare("DELETE FROM transactions WHERE id = ?");
    $sql->bind_param("i", $index);

    if ($sql->execute()) {
            echo "Transaction deleted successfully";}
     else {
        echo "Error executing query: " . $connection->error;
    }
}
