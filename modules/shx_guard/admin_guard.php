<?php
if ( !$_SESSION["is_admin"] ) {
    header('Location: ./?module=user&action=login');
    die();
}

?>