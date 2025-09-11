<?php
if(isset($_POST['name']) && isset($_POST['message'])) {
    $name = htmlspecialchars($_POST['name']);
    $message = htmlspecialchars($_POST['message']);
    $entry = "<strong>$name</strong>: $message<br>\n";

    file_put_contents("entries.txt", $entry, FILE_APPEND);
}
header("Location: index.html");
exit();
?>

