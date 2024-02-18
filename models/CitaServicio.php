<?php

namespace Model;


class citaServicio extends ActiveRecord {

    protected static $tabla = 'citaservicio';
    protected static $columnasDB = ['id', 'citaid', 'servicioid' ];


    public $id;
    public $citaid;
    public $servicioid;


    public function __construct($args = []){
        
        $this->id = $args['id'] ?? null;
        $this->citaid = $args['citaid'] ?? '';
        $this->servicioid = $args['servicioid'] ?? '';
    }


}