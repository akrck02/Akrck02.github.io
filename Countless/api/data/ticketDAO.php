<?php

include_once "./config.php";

/**
 * Get tickets in a month of an auth implemented
 */
function getMonthTickets_impl($conn, $auth, $year, $month)
{
    $day = 1;
    $query = 'SELECT * FROM ' . DB_DB . '.ticket_registry WHERE auth = "' . $auth . '" AND date ="' . $year . '-' . $month . '-' . $day . '"';

    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $user_data = mysqli_fetch_assoc($rs);
    if ($user_data == null) return false;
    return $user_data;
}

/**
 * Get all tickets of an auth implemented
 */
function getAllTickets_impl($conn, $auth)
{
    $query = 'SELECT * FROM ' . DB_DB . '.ticket_registry WHERE auth = "' . $auth . '" ORDER BY date';

    $rs = mysqli_query($conn, $query);
    if (!$rs) return [];

    $user_data = [];
    while ($row = mysqli_fetch_assoc($rs))
        $user_data[] = $row;


    if ($user_data == null) return [];
    return $user_data;
}
