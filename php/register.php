<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "connection.php";


$data = file_get_contents("php://input");
$users = json_decode($data, true);

$user = $users['username'];
$pass = $users['password'];
$fname=$users['fname'];
$lname=$users['lname'];;
$hashed=password_hash($pass,PASSWORD_DEFAULT);
$sql=$connection->prepare("INSERT INTO users (UserName,Password,FirstName,LastName) VALUES (?,?,?,?)");
$sql->bind_param('ssss',$user ,$hashed, $fname ,$lname);
if ($sql->execute()) {
    echo "Record added successfully";
} else {
    echo "Error inserting Credentials: " . $connection->error;
}