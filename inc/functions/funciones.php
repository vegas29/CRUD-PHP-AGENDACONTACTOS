<?php

function obtenerDatos(){
    include 'bd.php';

    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos");
    }catch(Exception $e){
        echo "Error" . $e->getMessage() . "<br>";
        return false;
    }
}

function obtenerContacto($id){
    include 'bd.php';

    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos WHERE id = $id");
    }catch(Exception $e){
        echo "Error" . $e->getMessage() . "<br>";
        return false;
    }
}