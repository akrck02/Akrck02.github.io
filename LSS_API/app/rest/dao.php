<?php
define("DB_HOST","localhost");
define("DB_USER","root");
define("DB_PASS","");
define("DB_DB","lss_maker");

function connectDDBB(){
    $conn = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_DB);
    if(mysqli_error($conn) < 0)  return false;
    else return $conn;
}

function dao_login($conn,$username, $password){
    $query = 'SELECT * FROM '.DB_DB.'.users WHERE username = "' . $username . '" AND password = "' . $password . '"';
    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $user_data = mysqli_fetch_assoc($rs);
    if ($user_data == null) return false;
    return true;
}

function dao_register($conn,$username, $password, $mail){
    $query = "INSERT INTO ".DB_DB.".users(username,password,mail,token) VALUES('$username','$password','$mail','token')";
    return mysqli_query($conn, $query);
}

function dao_get_project($conn,$id){
    $query = 'SELECT * FROM '.DB_DB.'.styles WHERE project_id = "' . $id . '"';
    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $result = [];
    while(($row =  mysqli_fetch_assoc($rs)) != null){
       $result[$row['type']][] = $row;
      //  $result[] = $row;
    }       

    return $result; 
}

function dao_get_projects($conn, $username){
    $query = 'SELECT * FROM '.DB_DB.'.projects WHERE user = "' . $username . '"';
    $rs = mysqli_query($conn, $query);
    if (!$rs) return false;

    $result = [];
    while(($row =  mysqli_fetch_assoc($rs)) != null)
        $result[] = $row;

    return $result; 
}

function dao_new_project($json){

}

function dao_get_style($json){

}

function dao_new_style($json){

}

function dao_get_token($json){

}

function dao_new_token($json){

}
