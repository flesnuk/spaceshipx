<?php

function retornarVista($central, $data=array()) {
  if (isset($_REQUEST['vista'])) {
    $vista=$_REQUEST['vista'];
  }

  switch ($vista) {
  case "fragment":
    require_once($central);
    break;
  case "json":
    header('Content-Type:application/json');
    $dat=json_encode($data);
    echo "{\"plantilla\":\"$central\",\"datos\":$dat}";
    break;
  default:
    require_once("./phtml/header.phtml");
    require_once($central);
    require_once("./phtml/footer.phtml");
  }  
}
?>

