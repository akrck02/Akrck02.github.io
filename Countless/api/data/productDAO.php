<?php 

include_once "./config.php";

/**
 * Get all tickets of an auth implemented
 */
function getAllProducts_impl($conn, $auth)
{
    $query = 'SELECT * FROM ' . DB_DB . '.product WHERE auth = "' . $auth . '" ORDER BY price';

    $rs = mysqli_query($conn, $query);
    if (!$rs) return [];

    $user_data = [];
    while ($row = mysqli_fetch_assoc($rs))
        $user_data[] = $row;


    if ($user_data == null) return [];
    return $user_data;
}
