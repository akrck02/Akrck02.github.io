<?php
include_once "./config.php";
include_once "./crypt.php";

#
# JSON CONVERTING FUNCTIONS 
#
# By @akrck02 

/**
 * login_impl JSON wraper
 */
function login($json_data)
{
    try {
        $data = json_decode($json_data, true);
        $json = [];

        if (isset($data['content']['user']) && isset($data['content']['password'])) {
            $conn = connectDDBB();
            $resp = login_impl($conn, $data['content']['user'], $data['content']['password']);

            if ($resp == false) {
                $json['success'] = false;
                echo json_encode($json, JSON_FORCE_OBJECT);
                return;
            } else  $json['success'] = true;

            $json['content']['auth'] = $resp['id'];
            $json['content']['user'] = $resp['user'];

            if ($json['content']['auth']) {
                $json['token'] = generate_access_token($data['content']['user']);
            }
        } else $json['success'] = false;
        echo json_encode($json, JSON_FORCE_OBJECT);
    } catch (Exception $e) {
        $json = [];
        $json['success'] = false;
        $json['error'] = $e->getMessage();
        echo json_encode($json, JSON_FORCE_OBJECT);
    }
}

/**
 * getMonthTickets_impl JSON wraper
 */
function getMonthTickets($json_data)
{
    try {
        $data = json_decode($json_data, true);
        $json = [];

        if (isset($data['auth']) && isset($data['content']['year']) && isset($data['content']['month'])) {
            $conn = connectDDBB();
            $resp = getMonthTickets_impl($conn, $data['auth'], $data['content']['year'], $data['content']['month']);

            if ($resp == false) {
                $json['success'] = false;
                echo json_encode($json, JSON_FORCE_OBJECT);
                return;
            }

            $json['success'] = true;
            $json['content'] = $resp;
        } else $json['success'] = false;

        echo json_encode($json, JSON_FORCE_OBJECT);
    } catch (Exception $e) {
        $json = [];
        $json['success'] = false;
        $json['error'] = $e->getMessage();
        echo json_encode($json, JSON_FORCE_OBJECT);
    }
}


/**
 * getAllTickets_impl JSON wraper
 */
function getAllTickets($json_data)
{
    try {
        $data = json_decode($json_data, true);
        $json = [];

        if (isset($data['auth'])) {
            $conn = connectDDBB();
            $resp = getAllTickets_impl($conn, $data['auth']);

            if ($resp == false) {
                $json['success'] = [];
                echo json_encode($json, JSON_FORCE_OBJECT);
                return;
            }

            $json['success'] = true;
            $json['content'] = $resp;
        } else $json['success'] = false;

        echo json_encode($json, JSON_FORCE_OBJECT);
    } catch (Exception $e) {
        $json = [];
        $json['success'] = false;
        $json['error'] = $e->getMessage();
        echo json_encode($json, JSON_FORCE_OBJECT);
    }
}



#
# DATABASE FETCH FUNCTIONS 
#
# By @akrck02 

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
    while($row = mysqli_fetch_assoc($rs))
        $user_data[] = $row;
    

    if ($user_data == null) return [];
    return $user_data;
}
