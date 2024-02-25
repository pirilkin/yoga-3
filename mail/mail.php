<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$title = strip_tags($_POST['title']);
$email = strip_tags($_POST['email']);
$tel = strip_tags($_POST['tel']);



$mail = new PHPMailer(true);

try {
    //Server settings

    $mail->isSMTP();                                             // Send using SMTP
    $mail->Host       = 'smtp.mail.ru';                        // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                    // Enable SMTP authentication
    $mail->Username   = 'ppproweb@mail.ru';                     // SMTP username
    $mail->Password   = 'tXaCMvLT76M3TTqcFQTe';                                  // SMTP password
    $mail->SMTPSecure = 'ssl';                                   // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet      = 'UTF-8'; 

    //Recipients получатели
    $mail->setFrom('ppproweb@mail.ru', 'заявка с личного сайта по йоге');
    $mail->addAddress('ppproweb@mail.ru', 'администратору сайта');     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML00
    $mail->Subject = $title;
    $mail->Body    = "
    <h2>Адрес отправителя :  <a href=\"$email\"><b>$email/</b></a></h2>
    <h2>Клиент: <span style=\"border-bottom:1px solid #000000\"><b>$title</b></span> </h2> 
    <h2>Номер клиента: <b>$tel</b> </h2>";

        
    $mail->send();
    
    $_SESSION['sent'] = "Thank you! Your application has been sent!";
    header("Location: /");
    
} catch (Exception $e) {
    $_SESSION['notsent'] = "Sorry! your application has not been sent {$mail->ErrorInfo}";
    header("Location: /");
   }
