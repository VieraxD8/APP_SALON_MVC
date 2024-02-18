<?php


namespace Controllers;

use Model\Servicio;
use Model\Cita;
use Model\CitaServicio;


class APIControllers {

    public static function index() {
        
        $servicios = Servicio::all();
        echo json_encode($servicios);

       
    }


    public static function guardar(){
        
        //Alemna la cita y deuelve el id
       $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $id = $resultado['id'];

        //Almacena la cita y el servicio con el id  de la cita

        $idServicios = explode(",", $_POST['servicios']);

        foreach($idServicios as $idServicio){
            $args = [
                'citaid' => $id,
                'servicioid' => $idServicio
            ];

            $citaServicio = new CitaServicio($args); 
            $citaServicio->guardar();
        }

        //Retornamos una repuesta

    echo json_encode(['resultado' => $resultado]);

    }

public static function eliminar(){
    
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $id = $_POST['id'];

        $cita = Cita::find($id);
        $cita->eliminar();
        header('Location:' . $_SERVER['HTTP_REFERER']);
    }
}


}





?>