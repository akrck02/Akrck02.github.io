<?php
    function generate_access_token($user){
        $date_time  = date_timestamp_get(date_create());
        $random = random_int(0,999999);
        $token = $user.".".$date_time.".".$random;
        return base64_encode($token);
    }
?>