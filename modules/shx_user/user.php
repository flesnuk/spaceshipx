<?php

if (isset($_REQUEST['action'])) {
    $action=$_REQUEST['action'];
}

switch ($action) {
    case "register":
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
    } else {
        $central='./modules/shx_user/phtml/register.phtml';
    }
        break;
    case "login":
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $central='./modules/shx_user/phtml/login.phtml';
            if (!isset($_REQUEST["username"]) || !isset($_REQUEST["passwd"])){
                $data["error"] = "Bad request";
            }
            
            $username = $_REQUEST["username"];
            if ($username == "") {
                $data["error"] = "¡No has introducido ningún usuario!";
                break;
            }

            $BaseDatos->query="SELECT * FROM usuarios WHERE username='$username'";
            $data["error"]= $BaseDatos->mensaje;
            if ($data["error"] != "")
                break;

            $user = $BaseDatos->get_results_from_query();
            if ( sizeof($user) < 1 ) {
                $data["error"]= "Usuario no encontrado";
                break;
            }

            $user = $user[0];
            


            $hash = $user["password"];
            if (password_verify($_REQUEST["passwd"], $hash)) {
                
            } else {
                $data["error"] = "Contraseña invalida";
            }
            
        } else {
            $central='./modules/shx_user/phtml/login.phtml';
        }
        break;
    default:
        $data["error"]="Acción no permitida";
        $central="./phtml/error.phtml";
}

?>