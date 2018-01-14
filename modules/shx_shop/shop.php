<?php

$BaseDatos->query="SELECT * FROM naves";
$data = $BaseDatos->get_results_from_query();
$central='./modules/shx_shop/phtml/shop.phtml';
?>

