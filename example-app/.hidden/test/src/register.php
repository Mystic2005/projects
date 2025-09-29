<?php
  session_start();
  require_once 'db.php';
  $error = '';

  if (isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = $_POST["password"];

    $pattern = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/";
    if (!preg_match($pattern, $password)) {
      $error ="Parola trebuie să aibă minim 8 caractere, o literă mare, o literă mică, o cifră și un caracter special.";
    } else {

      $pdo = connect_db();
      $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
      $stmt->execute([$username]);

      if ($stmt->rowCount() > 0) {
          $error = "Username already taken!";
      } else {
          $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
          $insert = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
          if ($insert->execute([$username, $hashedPassword])) {
              $error = "Registered successfully!";
              header("Location: login.php");
              exit;
          } else {
              $error = "Registration failed.";
          }
      }
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
        else echo '<b class="active">Register please!</b>'; ?>
        <a href="/">Home</a>
      </div>
    </header>
      <h2 style="font-weight: 100">Register</h2>  
      <?php if ($error)
      echo '<p style="color:red">' . $error . '</p>'; ?>
      <form method="post" action="register.php">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Register</button>
      </form>
  </body>
</html>