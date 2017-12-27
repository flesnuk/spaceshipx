<?php

if (isset($_REQUEST['action'])) {
    $action=$_REQUEST['action'];
}

switch ($action) {
    case "register":
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_REQUEST["username"]; // 0 < length <= 15 and not already taken
        $name = $_REQUEST["name"]; // len < 100
        $email = $_REQUEST["email"]; // maybe PHP has check_email? also len<100
        // TODO: store error msg in $data["error-username"], $data["error-email"], etc
        $passwd = password_hash($_REQUEST["passwd"], PASSWORD_BCRYPT); 
        $BaseDatos->query="INSERT INTO usuarios (username, name, email, password) 
                                        VALUES ('$username', '$name', '$email', '$passwd') ";
        $BaseDatos->execute_single_query();
        header('Location: ./');
        die();
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
            $data["username"] = $user["username"];


            $hash = $user["password"];
            if (password_verify($_REQUEST["passwd"], $hash)) {
                $_SESSION["username"] = $user["username"];
                $_SESSION["is_admin"] = $user["admin"];
                if ($user["admin"]){
                    //header('Location: ./?module=admin&action=list');
                } else {
                    //header('Location: ./');
                }
                break;
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