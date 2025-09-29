<?php
  function connect_db() {
      $host = 'db';
      $port = 5432;
      $dbname = 'mydb';
      $user = 'myuser';
      $pass = 'mypass';

      $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
      try {
          return new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
      } catch (PDOException $e) {
          die("Database error: " . $e->getMessage());
      }
  }
?>
