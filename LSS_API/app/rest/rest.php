<?php

    include_once "./dao.php";

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    if(isset($_REQUEST['login']))           login($_REQUEST['login']);
    if(isset($_REQUEST['register']))        register($_REQUEST['register']);

    if(isset($_REQUEST['get_projects']))    get_projects($_REQUEST['get_projects']);
    if(isset($_REQUEST['get_project']))     get_project($_REQUEST['get_project']);
    if(isset($_REQUEST['new_project']))     new_project($_REQUEST['new_project']);

    if(isset($_REQUEST['get_style']))       get_style($_REQUEST['get_style']);
    if(isset($_REQUEST['new_style']))       new_style($_REQUEST['new_style']);

    if(isset($_REQUEST['get_token']))       get_token($_REQUEST['get_token']);
    if(isset($_REQUEST['new_token']))       new_token($_REQUEST['new_token']);


    /* REST FUNCTIONS */
    function login($json_data){
        $data = json_decode($json_data,true);
        $json = [];
        if(isset($data['content']['username']) && isset($data['content']['password'])){
            $conn = connectDDBB();
            $json['success'] = true;
            $json['content']['accepted'] =  dao_login($conn,$data['content']['username'],$data['content']['password']);
        }   
        else $json['success'] = false;
        echo json_encode($json, JSON_FORCE_OBJECT);      
    }

    function register($json_data){
        $data = json_decode($json_data,true);
        $json = [];
        if(isset($data['content']['username']) && isset($data['content']['password'])  && isset($data['content']['mail'])){
            $conn = connectDDBB();
            $json['success'] = true;
            $json['content']['accepted'] = dao_register($conn,$data['content']['username'],$data['content']['password'],$data['content']['mail']);
        }   
        else $json['success'] = false;
        echo json_encode($json, JSON_FORCE_OBJECT);    
    }

    function get_project($json_data){
        $data = json_decode($json_data,true);
        $json = [];
        if(isset($data['content']['id'])){
            $conn = connectDDBB();
            $json['success'] = true;
            $json['content']= dao_get_project($conn,$data['content']['id']);
        }   
        else $json['success'] = false;
        echo json_encode($json, JSON_FORCE_OBJECT);    
    }

    function new_project($json){

    }

    function get_projects($json_data){
        $data = json_decode($json_data,true);
        $json = [];
        if(isset($data['content']['username'])){
            $conn = connectDDBB();
            $json['success'] = true;
            $json['content'] =  dao_get_projects($conn,$data['content']['username']);
        }   
        else $json['success'] = false;
        echo json_encode($json, JSON_FORCE_OBJECT);      
    }

    function get_style($json){

    }

    function new_style($json){

    }

    function get_token($json){

    }

    function new_token($json){

    }

