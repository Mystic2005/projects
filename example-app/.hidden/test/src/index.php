<?php
  session_start();
  echo '<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
    <div class="topnav">';

  if (isset($_SESSION['username']))
  echo '<b class="active">Welcome back, ' . $_SESSION['username'] . '!</b>';
  else echo '<b class="active">Login please!</b>';
  if (!isset($_SESSION['username']))
  echo '<a href="/login.php">Login</a>';
  else echo '<a href="/logout.php">Logout</a>';
  echo '<a href="/">Home</a>
    </div>
  </header>';
  if (isset($_SESSION['username']) && $_SESSION['username'] == "luca") {
    require_once 'db.php';
    $error = '';
    $pdo = connect_db();
    $stmt = $pdo->query("SELECT id, username, password FROM users");

    if (isset($_GET['delete'])) {
      $id = (int)$_GET['delete'];

      $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
      $stmt->execute([$id]);
      echo '<meta http-equiv="refresh" content="0;url=index.php">';
      exit;
    }

    echo "<h2 style='font-weight: 100'>Lista utilizatorilor</h2>";
    echo "<table>";
    echo "<tr><th>ID</th><th>Username</th><th>Password</th><th>Acțiuni</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>
                <td>" . htmlspecialchars($row['id']) . "</td>
                <td>" . htmlspecialchars($row['username']) . "</td>
                <td>" . htmlspecialchars($row['password']) . "</td>
                <td><a href='?delete=' style='color: red; text-decoration: none;'" . $row['id'] . "' onclick=\"return confirm('Sigur vrei să ștergi?');\">Șterge</a></td>
              </tr>";
    }
    echo "</table>";

    $stmt2 = $pdo->query("SELECT id, user_id, action, timestamp FROM log");
    
    echo "<h2 style='font-weight: 100'>Logs</h2>";
    echo "<table>";
    echo "<tr><th>ID</th><th>User_id</th><th>Action</th><th>Time</th></tr>";

    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>
                <td>" . htmlspecialchars($row2['id']) . "</td>
                <td>" . htmlspecialchars($row2['user_id']) . "</td>
                <td>" . htmlspecialchars($row2['action']) . "</td>
                <td>" . htmlspecialchars($row2['timestamp']) . "</td>
              </tr>";
    }
    echo "</table>";
  } else {
    echo "<h2>Nu ai acces la această pagină.</h2>";
  }
  echo '</html>';
?>