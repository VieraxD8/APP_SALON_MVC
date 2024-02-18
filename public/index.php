<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminControllers;
use Controllers\APIControllers;
use Controllers\citaControllers;
use Controllers\loginControllers;
use Controllers\ServicioControllers;
use MVC\Router;

$router = new Router();

$router->get('/', [loginControllers::class, 'login']);
$router->post('/', [loginControllers::class, 'login']);
$router->get('/logout', [loginControllers::class, 'logout']);

//Recuperar password 

$router->get('/olvide-password', [loginControllers::class, 'olvide']);
$router->post('/olvide-password', [loginControllers::class, 'olvide']);
$router->get('/recuperar', [loginControllers::class, 'recuperar']);
$router->post('/recuperar', [loginControllers::class, 'recuperar']);


// Crear Cuenta

$router->get('/crear', [loginControllers::class, 'crear']);
$router->post('/crear', [loginControllers::class, 'crear']);

//Confirmar cuenta

$router->get('/confirmar-cuenta', [loginControllers::class, 'confirmar']);
$router->get('/mensaje', [loginControllers::class, 'mensaje']);

//Area privada

$router->get('/cita', [citaControllers::class, 'index']);
$router->get('/admin', [AdminControllers::class, 'index']);

// Api de citas

$router->get('/api/servicios', [APIControllers::class, 'index']);
$router->post('/api/citas', [APIControllers::class, 'guardar']);
$router->post('/api/eliminar', [APIControllers::class, 'eliminar']);


//CRUD de Servicios

$router->get('/servicios', [ServicioControllers::class, 'index']);
$router->get('/servicios/crear', [ServicioControllers::class, 'crear']);
$router->post('/servicios/crear', [ServicioControllers::class, 'crear']);
$router->get('/servicios/actualizar', [ServicioControllers::class, 'actualizar']);
$router->post('/servicios/actualizar', [ServicioControllers::class, 'actualizar']);
$router->post('/servicios/eliminar', [ServicioControllers::class, 'eliminar']);



// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();