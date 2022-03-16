
//global runtime configurations
export const CONFIG  = {
    APP_NAME: 'Akrck02.com',
    APP_VERSION: 'v1.0',
    HOST: 'akrck02.github.io',
    PORT: 80,
    URL: '',
    ENVIROMENT : 'development',
    DEBUG : true,
    LOG_LEVEL : 'debug',
    LOG_FILE : 'app.log',
};

//paths on server
export const PATHS = {
    ROOT : '',
    RESOURCES : '',
    LOGS : '',
    FONTS : '',
    IMAGES : '',
    GITHUB_IMAGES : '',
    VIDEOS : '' ,
    AUDIOS : '',
    JSON : ''     
}


//api calls
export const API = {};  

//view URLs
export const VIEWS = {
    BASE_URL : '',
    HOME : '',
    CODE : '',
    GAMES : '',
    MEDIA : '',
    ABOUT : ''
};

//akrck02 social media
export const SOCIAL = {
    GITHUB : '',
    TWITTER : '',
    TWITCH : '',
    YOUTUBE : ''
}

export const GITHUB = {
    URL : 'https://akrck-git.herokuapp.com/api/v1/',
    USERNAME : '',
};
//start settings
export function setUpConfigurations() : void {

    //global runtime configurations
    CONFIG['URL'] = 'http://' + CONFIG['HOST'] + "/";
    
    //Paths
    PATHS['ROOT'] = CONFIG['URL'];
    PATHS['LOGS'] = PATHS['ROOT'] + 'logs/';
    PATHS['RESOURCES'] = PATHS['ROOT'] + 'resources/';
    PATHS['FONTS'] = PATHS['RESOURCES'] + 'fonts/';

    PATHS['IMAGES'] = PATHS['RESOURCES'] + 'images/';
    PATHS['GITHUB_IMAGES'] = PATHS['IMAGES'] + 'github/';

    PATHS['VIDEOS'] = PATHS['RESOURCES'] + 'videos/';
    PATHS['AUDIOS'] = PATHS['RESOURCES'] + 'audios/';
    PATHS['JSON'] = PATHS['RESOURCES'] + 'json/'; 

    //views 
    VIEWS['BASE_URL'] = CONFIG['URL'] + '#/';
    VIEWS['HOME'] = VIEWS['BASE_URL'] + 'home';
    VIEWS['CODE'] = VIEWS['BASE_URL'] + 'code/';
    VIEWS['GAMES'] = VIEWS['BASE_URL'] + 'games/';
    VIEWS['MEDIA'] = VIEWS['BASE_URL'] + 'media/';
    VIEWS['ABOUT'] = VIEWS['BASE_URL'] + 'about/';

    //social media
    SOCIAL['GITHUB'] = "https://Github.com/Akrck02/";
    SOCIAL['TWITTER'] = "https://twitter.com/Akrck_02/";
    SOCIAL['TWITCH'] = "https://www.twitch.tv/akrck02/";
    SOCIAL['YOUTUBE'] = "https://www.youtube.com/channel/UC4aP0PZoBiCIiM2NmBnxGbw";

    //Github data
    GITHUB['USERNAME'] = "Akrck02";

}