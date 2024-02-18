<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function esUltimo($actual, $proximo){

    if($actual !== $proximo){
        return true;
    }
    return false;

}

//fucion que un usuario este autentitcado

function isAtuth(){

    if(!isset($_SESSION['login'])){
        header('Location: /');
    }

}

function isAdmin() {
    if(!isset($_SESSION['admin'])){
        header('Location: /');
    } 
}