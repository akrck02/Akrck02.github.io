export const SETTINGS = {};
export const PATHS = {};
export const VIEWS = {};
export const API = {};

export const setUp = () => { 
    
    /** Setting up general parameters */
    SETTINGS.APP_NAME = "Akrck02.com",
    SETTINGS.APP_VERSION = "v.01b",
    SETTINGS.HOST = "http://192.168.0.16/akrck02.com/",
    SETTINGS.URL = SETTINGS.HOST + "#/";

    /** Setting up views */
    VIEWS.URL = SETTINGS.URL + "#/";
    VIEWS.LOGIN = VIEWS.URL + "login/";
    VIEWS.HOME = VIEWS.URL + "home/";
    VIEWS.ERROR = VIEWS.URL + "error/";

    /** Setting up paths */
    PATHS.ROOT = SETTINGS.HOST + "/";
    PATHS.RESOURCES = PATHS.ROOT + "resources/";
    PATHS.IMAGES = PATHS.RESOURCES + "images/";
    PATHS.FONTS = PATHS.RESOURCES + "fonts/";

    /** Setting up API */
    API.AKRCK02 = {};
    API.AKRCK02.URL = "http://" + SETTINGS.HOST + ":3333/api/";
};