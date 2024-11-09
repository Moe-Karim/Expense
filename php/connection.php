<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "expense-tracker";
$port = 3307;
$connection = new mysqli($servername, $username, $password, $dbname,$port);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
