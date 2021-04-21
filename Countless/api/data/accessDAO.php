<?php

include_once "./config.php";
include_once "./crypt.php";

/**
 * login implemented
 */
function login_impl($conn, $username, $password)
{
    $query = 'SELECT * FROM ' . DB_DB . '.auth WHERE user = "' . $username . '" AND password = "' . $password . '"';
    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $user_data = mysqli_fetch_assoc($rs);
    if ($user_data == null) return false;
    return $user_data;
}
