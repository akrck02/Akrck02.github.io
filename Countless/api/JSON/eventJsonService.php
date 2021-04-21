<?php

include_once "./data/eventsDAO.php";

function get_auth_events_between($json_data)
{
    try {
        $data = json_decode($json_data, true);
        $json = [];

        if (isset($data['content']['auth']) && isset($data['content']['start']) && isset($data['content']['end'])) {

            $conn = connectDDBB();
            $auth = $data['content']['auth'];
            $start = $data['content']['start'];
            $end = $data['content']['end'];

            $resp = get_auth_events_between_impl($conn, $auth, $start, $end);

            if ($resp == false) {
                $json['success'] = false;
                echo json_encode($json, JSON_FORCE_OBJECT);
                return;
            } else  $json['success'] = true;

            foreach ($resp as $key => $event) {

                $dateArray =  explode("-", $event['date']);
                $month = +$dateArray[1];
                $day = +explode(" ", $dateArray[2])[0];

                $hours = explode(" ", $dateArray[2])[1];
                $event['hour'] = substr($hours,0,5);

                if (!isset($json['content'][$month])) {
                    $json['content'][$month] = [];
                }

                if (!isset($json['content'][$month][$day])) {
                    $json['content'][$month][$day] = [];
                }

                $json['content'][$month][$day][] = $event;
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
