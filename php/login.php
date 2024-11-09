<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "connection.php";


$data = file_get_contents("php://input");
$users = json_decode($data, true);

$user = $users['user'];
$pass = $users['pass'];

$sql = $connection->prepare("SELECT * FROM users WHERE UserName = ?");
$sql->bind_param('s', $user);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows != 0) {
    $record = $result->fetch_assoc();
    if (password_verify($pass, $record['Password'])) {
        echo json_encode([
            "status" => "Login successful",
            "user" => $record
        ]);
    } else {
        echo json_encode(["status" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}
