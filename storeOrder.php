<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON data from the frontend
$data = json_decode(file_get_contents("php://input"), true);

$userid = $data['userid'];
$customername = $data['customername'];
$customeraddress = $data['customeraddress'];
$customercontactnum = $data['customercontactnum'];
$modeofpayment = $data['modeofpayment'];
$cartItems = $data['cartItems'];

// Insert into `orderdetails`
$stmt = $conn->prepare("INSERT INTO orderdetails (userid, customername, customeraddress, customercontactnum, modeofpayment) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $userid, $customername, $customeraddress, $customercontactnum, $modeofpayment);
$stmt->execute();

// Get the generated order ID
$orderid = $conn->insert_id;

// Insert into `orderitems`
$stmt = $conn->prepare("INSERT INTO orderitems (orderid, productname, quantity, total) VALUES (?, ?, ?, ?)");

foreach ($cartItems as $item) {
    $stmt->bind_param("isid", $orderid, $item['productname'], $item['quantity'], $item['total']);
    $stmt->execute();
}

echo json_encode(["status" => "success", "orderid" => $orderid]);

$conn->close();
?>
