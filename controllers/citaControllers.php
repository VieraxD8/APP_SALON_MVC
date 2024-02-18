<?php
namespace Controllers;

use Clases\Email;
use Model\Usuario;
use MVC\Router;

class citaControllers {

    public static function index(Router $router) {

        session_start();

        isAtuth();

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id']

        ]);

    }


}


?>