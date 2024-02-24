<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$title = strip_tags($_POST['title']);
$email = strip_tags($_POST['email']);
$message = strip_tags($_POST['tel']);



$pdo = new PDO('mysql:host=localhost;dbname=gejinsjm_jivica', 'gejinsjm_jivica', 'Kojzgsf123');
$sql = "INSERT INTO `jivicasite` (`title`, `phone`, `message`) VALUES ('$title', '$phone','$message')";

$query = $pdo->prepare($sql);
$query->execute();

$mail = new PHPMailer(true);

try {
    //Server settings

    $mail->isSMTP();                                             // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                        // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                    // Enable SMTP authentication
    $mail->Username   = 'chelovekizzet@gmail.com';                     // SMTP username
    $mail->Password   = 'kojzgsf123';                                  // SMTP password
    $mail->SMTPSecure = 'ssl';                                   // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet      = 'UTF-8'; 

    //Recipients получатели
    // $mail->setFrom('jivica2020@mail.ru', 'заявка с сайта Freedprod');
    // $mail->addAddress('pirilkin@mail.ru', 'Freedprod');     // Add a recipient
    // //Recipients
    $mail->setFrom('chelovekizzet@gmail.com', 'заявка с личного сайта по йоге');
    $mail->addAddress('chelovekizzet@gmail.com', 'администратору сайта');     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML00
    $mail->Subject = $title;
    $mail->Body    = "
    <h2>Адрес отправителя :  <a href=\"$email\"><b>$email/</b></a></h2>
    <p>Клиент: <span style=\"border-bottom:1px solid #000000\"><b>$title</b></span> </p> 
    <p>Номер клиента: <b>$message</b> </p>

        
    $mail->send();
    $_SESSION['sent'] = 'успешно принят';
    header ("Location: http://gejinsjm.beget.tech/");
    
} catch (Exception $e) {
    $_SESSION['notsent'] = 'Заказ не принят. Ошибка : {$mail->ErrorInfo}';
    header ("Location: http://gejinsjm.beget.tech/");
   }

   
   
   $_SESSION['sent'] = 'Your message has been sent';
   header ("Location: /?route=contact");
