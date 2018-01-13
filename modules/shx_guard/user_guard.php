<?php
if ( ! isset($_SESSION["username"]) ) {
    header('Location: ./?module=user&action=login');
    die();
}

?>