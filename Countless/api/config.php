<?php
define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_DB", "countless");


function connectDDBB()
{
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_DB);
    if (mysqli_error($conn) < 0)  return false;
    else return $conn;
}
