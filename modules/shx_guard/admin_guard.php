<?php
if ( ! isset($_SESSION["is_admin"]) ) {
    header('Location: ./?module=user&action=login');
    die();
}

?>