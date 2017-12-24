<?php

if (isset($_REQUEST['vista'])) {
    $vista=$_REQUEST['vista'];
}
switch ($vista) {
case "json":
    header('Content-Type:application/json');
    $BaseDatos->query="SELECT * FROM naves";
    $naves = $BaseDatos->get_results_from_query();
    echo json_encode($naves);
    exit();
default:
    $central='./modules/shx_shop/phtml/shop.phtml';
}
?>

