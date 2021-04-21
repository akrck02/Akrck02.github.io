<?php

include_once "./data/accessDAO.php";

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
