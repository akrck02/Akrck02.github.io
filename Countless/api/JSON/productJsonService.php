<?php 

include_once "./data/productDAO.php";

/**
 * getProducts_impl JSON wraper
 */
function getProducts($json_data)
{
    try {
        $data = json_decode($json_data, true);
        $json = [];

        if (isset($data['auth'])) {
            $conn = connectDDBB();
            $resp = getAllProducts_impl($conn, $data['auth']);

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