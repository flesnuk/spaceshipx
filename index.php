<?php
    //view_form.php
    
    /**
     * * Descripción: Controlador principal
     * *
     * * Descripción extensa: Iremos añadiendo cosas complejas en PHP.
     * *
     * * @author  Lola <dllido@uji.es>
     * * @copyright 2017 Lola
     * * @license http://www.fsf.org/licensing/licenses/gpl.txt GPL 2 or later
     * * @version 1
     * * @link http://dllido.al.nisu.org/P0/holaMundo.php
     * */

session_start([
  'cookie_lifetime' => 3600,
]);
require_once('./core/db_model.php');
require_once('./core/view.php') ;

/*evitar codigo malicioso*/
function _H($cadena)
{
    echo htmlspecialchars($cadena, ENT_QUOTES);
}

$BaseDatos=new DBModel();
//variable para paso de parámetros a las plantillas.
$data=array();
//plantilla central por defecto del portal
$central='./principal.phtml';
$jsImport='ge';

function addJS($name) {
    global $jsImport;
    $jsImport .= "<script src='./modules/shx_$name/js/$name.js' async defer></script>";
}


if (isset($_REQUEST['module'])) {
    $modulo=$_REQUEST["module"];
  
    switch ($modulo) {
        case "shop":
            require_once("./modules/shx_shop/shop.php");
            addJS("shop");
            break;
        case "game":
            require_once("./modules/shx_game/game.php");
            addJS("game");
            break;
        case "user":
            require_once("./modules/shx_user/user.php");
            addJS("user");
            break;
        case "admin":
            require_once("./modules/shx_admin/admin.php");
            break;
        default:
            $data["error"]="Modulo no permitido";
            $central="./phtml/error.phtml";
    }
}
retornarVista($central, $data);
