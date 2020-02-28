<?php

$to      = 'ors73343@eoopy.com';
$name    = $_POST['namee'];
$email   = $_POST['emaill'];
$subject = 'Nowy e-mail od ' . $name . ' (' . $email . ')';
$message = $_POST['messagee'];
$headers = 'From: ' . $name . ' (' . $email . ')';
$headers .= 'Content-Type: text/html; charset=utf-8';

mail($to, $subject, $message, $headers);

header('Location:index.html');
?>