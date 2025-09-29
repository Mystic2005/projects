<?php
session_start();
require_once 'db.php';
require_once 'log.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Neautorizat"]);
    exit;
}

$db = connect_db();
$user_id = $_SESSION['username'];

$db->beginTransaction();

$stmt = $db->prepare("SELECT value FROM counters WHERE user_id = ?");
$stmt->execute([$user_id]);

$logger = new logger();
$logger->log($user_id, "Incremented counter");

if ($row = $stmt->fetch()) {
    $value = $row['value'] + 1;
    $update = $db->prepare("UPDATE counters SET value = ? WHERE user_id = ?");
    $update->execute([$value, $user_id]);
} else {
    $value = 1;
    $insert = $db->prepare("INSERT INTO counters (user_id, value) VALUES (?, ?)");
    $insert->execute([$user_id, $value]);
}

$db->commit();

echo json_encode(["status" => "success", "count" => $value]);
?>