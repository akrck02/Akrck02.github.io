<?php
    include_once "./config.php";

/**
 * Get events between two dates for a rol
 */
function get_auth_events_between_impl($conn,$auth,$start,$end){
    $query = 'SELECT * FROM ' . DB_DB . '.event WHERE auth = "' . $auth . '" and date between "' . $start . '" AND "' . $end . '" ORDER BY date';
    
    $rs = mysqli_query($conn, $query);
    if (!$rs) return [];

    $user_data = [];
    while ($row = mysqli_fetch_assoc($rs))
        $user_data[] = $row;


    if ($user_data == null) return [];
    return $user_data;
}

/**
 * Create a new event
 */
function new_event_impl($conn,$auth,$type,$content,$title,$date,$location){
    $query = 'INSERT INTO ' . DB_DB . '.event(auth,type,content,title,date,location) VALUES("' . $auth . '","' . $type . '", "' . $content . '" , "'.$date.'","'.$location.'")';
    $rs = mysqli_query($conn, $query);
    



}
