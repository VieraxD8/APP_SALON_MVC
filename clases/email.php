<?php

namespace Clases;

use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token){
        
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;

    }

    public function enviarConfirmacion() {
        //Crear el objeto de email

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
       
        $mail->setFrom('Cuentas@appsalon.com');
        $mail->addAddress('Cuentas@appsalon.com', 'Appsalon.com'); 

        $mail->Subject = 'Confirma tu Cuenta';

        //Set HTML 

        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido .= "<p><strong>Hola ". $this->email . "</strong> Has Creado tu cuenta en AppSAlon, solo tienes que confirmar tu cuenta presionando el siguiente enlace</p>";
        $contenido .= "<p> Presiona aqui: <a href='".$_ENV['APP_URL']."/confirmar-cuenta?token=". $this->token ."'>Confirmar Cuenta</a>";
        $contenido .= "<p> Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= '</html>';

        $mail->Body = $contenido;

        // Enivar el Email

        $mail->send();

        }


                
    public function  enviarInstrucciones(){
         //Crear el objeto de email

         $mail = new PHPMailer();
         $mail->isSMTP();
         $mail->Host = $_ENV['EMAIL_HOST'];
         $mail->SMTPAuth = true;
         $mail->Port = $_ENV['EMAIL_PORT'];
         $mail->Username = $_ENV['EMAIL_USER'];
         $mail->Password = $_ENV['EMAIL_PASS'];
        
         $mail->setFrom('Cuentas@appsalon.com');
         $mail->addAddress('Cuentas@appsalon.com', 'Appsalon.com'); 
 
         $mail->Subject = 'Reestablece tu Password';
 
         //Set HTML 
 
         $mail->isHTML(TRUE);
         $mail->CharSet = 'UTF-8';
 
         $contenido = '<html>';
         $contenido .= "<p><strong>Hola ". $this->nombre . "</strong> Has solicitado Restablecer tu Password</p>";
         $contenido .= "<p> Presiona aqui: <a href='".$_ENV['APP_URL']."/recuperar?token=". $this->token ."'>Reestablecer Password</a>";
         $contenido .= "<p> Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
         $contenido .= '</html>';
 
         $mail->Body = $contenido;
 
         // Enivar el Email
 
         $mail->send();
    }

}



?>