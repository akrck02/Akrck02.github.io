<?php
include_once "./JSON/accessJsonService.php";
include_once "./JSON/ticketJsonService.php";
include_once "./JSON/eventJsonService.php";

function response()
{
    $worth = checkOrigin();
    if ($worth == false) return;

    /**
     *  ACCESS FUNCTIONS
     */
    if (isset($_REQUEST['login']))
        login($_REQUEST['login']);

    if (isset($_REQUEST['getToken']))
        echo "{'msg' : 'not yet implemented'}";



    /**
     * TICKET FUNCTIONS
     */
    if (isset($_REQUEST['getMonthTickets']))
        getMonthTickets($_REQUEST['getMonthTickets']);

    if (isset($_REQUEST['getAllTickets']))
        getAllTickets($_REQUEST['getAllTickets']);

    if (isset($_REQUEST['saveMonthTickets']))
        echo "{'msg' : 'not yet implemented'}";


    /**
     * EVENT FUNXTIONS
     */
    if (isset($_REQUEST['getEventsBetween']))
        get_auth_events_between($_REQUEST['getEventsBetween']);

    if (isset($_REQUEST['newEvent']))
        echo "{'msg' : 'not yet implemented'}";

        
    /**
     * NOTIFICATION FUNCTIONS
     */
    if (isset($_REQUEST['getLastNotifications']))
        echo "{'msg' : 'not yet implemented'}";
}

function checkOrigin()
{
    return true;
}

response();
