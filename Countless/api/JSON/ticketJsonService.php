<?php

include_once "./data/ticketDAO.php";

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


