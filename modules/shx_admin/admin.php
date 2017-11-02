<?php
/**
 * * Descripción: Modulo usuarios
 * *
 * * Descripción extensa: Iremos añadiendo cosas complejas en PHP.
 * *
 * * @author  Lola <dllido@uji.es>
 * * @copyright 2017 Lola
 * * @license http://www.fsf.org/licensing/licenses/gpl.txt GPL 2 or later
 * * @version 1
 * * @link http://dllido.al.nisu.org/P0/holaMundo.php
 * */
require_once("./modules/shx_guard/admin_guard.php");

global $data;
global $error;

$action="";
//Creo la tabla si no existe
$BaseDatos->query="CREATE TABLE IF NOT EXISTS usuarios (id INT(11) NOT NULL AUTO_INCREMENT,nombre VARCHAR(100), apellido VARCHAR(100), email VARCHAR(100), clave VARCHAR(25), PRIMARY KEY(id))";
$BaseDatos->execute_single_query();
echo $BaseDatos->mensaje;
  
  
if (isset($_REQUEST['action'])) {
    $action=$_REQUEST['action'];
}
  
      
switch ($action) {
    case "upload":
        $central="./modules/shx_admin/phtml/upload_ship.phtml";
        //move_uploaded_file($_FILES["imagen"]['tmp_name'],$destino);
        break;
    case "delete":
        $id = $_REQUEST['id'];
        $BaseDatos->query="DELETE FROM usuario WHERE id=$id";
        $BaseDatos->execute_single_query();
        $data["error"]= $BaseDatos->mensaje;
        if ($data["error"] != "") {
            $central="./phtml/error.phtml";
        } else {
            header('Location: ./?module=admin&action=list');
            die();
        }
        break;
    case "mod":
        $id = $_REQUEST['id'];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = $_REQUEST["username"];
            $name = $_REQUEST["name"];
            $email = $_REQUEST["email"];
            $BaseDatos->query="UPDATE usuarios SET username='$username', name='$name', email='$email' WHERE id=$id";
            $BaseDatos->execute_single_query();
            header('Location: ./?module=admin&action=list');
            die();
        } else {
            $BaseDatos->query="SELECT * FROM usuarios WHERE id=$id";
            $user = $BaseDatos->get_results_from_query()[0];
            $data["username"]=$user["username"];
            $data["name"]=$user["name"];
            $data["email"]=$user["email"];
            $central="./modules/shx_admin/phtml/modify.phtml";
        }
        break;
    case "list":
        $BaseDatos->query="SELECT     *  FROM        usuarios";
        $data["error"]= $BaseDatos->mensaje;
        $data["users"]= $BaseDatos->get_results_from_query();
        $central="./modules/shx_admin/phtml/list_users.phtml";
        break;
    case "register_form":
        $central="./modules/mod_userMVC/phtml/register_form.phtml";
        break;
    default:
        $data["error"]="Acción no permitida";
        $central="./phtml/error.phtml";
}
