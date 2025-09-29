<?php
require_once 'db.php';

class logger {
    private $db;

    public function __construct() {
        $this->db = connect_db();
    }

    public function log($userId, $action) {
        $stmt = $this->db->prepare("INSERT INTO log (user_id, action) VALUES (:user_id, :action)");
        $stmt->execute([
            ':user_id' => $userId,
            ':action' => $action
        ]);
    }
}
?>