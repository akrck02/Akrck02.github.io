<?php
include_once "./CountlessDAO.php";

function response()
{
    $worth = checkOrigin();
    if($worth == false) return;

    /**
     * Getting actions in the rest API 
     */
    if (isset($_REQUEST['login']))
        login($_REQUEST['login']);

    if (isset($_REQUEST['getMonthTickets']))
        getMonthTickets($_REQUEST['getMonthTickets']);

    if (isset($_REQUEST['getMonthEvents']))
        echo "{'msg' : 'not yet implemented'}";

    if (isset($_REQUEST['getLastNotifications']))
        echo "{'msg' : 'not yet implemented'}";

    if (isset($_REQUEST['getToken']))
        echo "{'msg' : 'not yet implemented'}";


    /**
     * Setting actions in the rest API
     */
    if (isset($_REQUEST['saveMonthTickets']))
        echo "{'msg' : 'not yet implemented'}";

    if (isset($_REQUEST['newEvent']))
        echo "{'msg' : 'not yet implemented'}";
}

function checkOrigin(){
    return true;   
}

response();