<?php
function retornarVista($central, $data=array()) {
  require_once("./phtml/header.phtml");
  require_once("./phtml/menu.phtml");
  require_once($central);
  require_once("./phtml/footer.phtml");
	
}
?>

