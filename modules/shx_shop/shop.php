<?php

if (isset($_REQUEST['action'])) {
    $action=$_REQUEST['action'];
}
switch ($action) {
case "list":
    $BaseDatos->query="SELECT * FROM naves";
    $naves = $BaseDatos->get_results_from_query();
    echo json_encode($naves);
    exit();
default:
    $central='./modules/shx_shop/phtml/shop.phtml';
}
?>

