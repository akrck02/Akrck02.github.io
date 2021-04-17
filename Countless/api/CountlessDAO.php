<?php
include_once "./config.php";
include_once "./crypt.php";

/**
 * Json converting functions
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
            }else  $json['success'] = true;

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
 * Implemented functions
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

function getMonthTickets_impl($conn, $auth, $year, $month)
{
    $day = 1;
    $query = 'SELECT * FROM ' . DB_DB . '.ticket_registry WHERE auth = "' . $auth . '" AND date ="' . $year . '-' . $month . '-'. $day . '"';
   
    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $user_data = mysqli_fetch_assoc($rs);
    if ($user_data == null) return false;
    return $user_data;
}