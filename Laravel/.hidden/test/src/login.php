<?php
  session_start();
  require_once 'db.php';
  $error = '';

  if (isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    $db = connect_db();
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute([':username' => $user]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && password_verify($pass, $row['password'])) {
        $_SESSION['username'] = $row['username'];
        header("Location: index.php");
        exit();
    } else {
        $error = 'Date incorecte.';
    }
  }
?>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <div class="topnav">
        <?php if (isset($_SESSION['username']))
        echo '<b class="active">Welcome back, ' . $_SESSION['username'] . '!</b>';
        else echo '<b class="active">Login please!</b>'; ?>
        <a href="/">Home</a>
      </div>
    </header>
      <h2 style="font-weight: 100">Login</h2>  
      <?php if ($error)
      echo '<p style="color:red">' . $error . '</p>'; ?>
      <form method="post">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Parola" required><br>
        <a class="centered-text" href="/register.php"> Register </a>
        <button type="submit">Login</button>
      </form>
  </body>
</html>