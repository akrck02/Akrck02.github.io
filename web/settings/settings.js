export const SETTINGS = {};
export const PATHS = {};
export const VIEWS = {};
export const API = {};
export const AKRCK02 = {};

export const setUp = () => {
  /** Setting up general parameters */
  SETTINGS.APP_NAME = "Akrck02.com";
  SETTINGS.APP_VERSION = "v.01b";
  SETTINGS.HOST = "http://192.168.0.16/akrck02.com/";
  SETTINGS.URL = SETTINGS.HOST + "#/";

  AKRCK02.GITHUB = "https://Github.com/Akrck02/";
  AKRCK02.TWITTER = "https://twitter.com/Akrck_02/";
  AKRCK02.TWITCH = "https://www.twitch.tv/akrck02/";
  AKRCK02.YOUTUBE = "https://www.youtube.com/channel/UC4aP0PZoBiCIiM2NmBnxGbw";

  /** Setting up paths */
  PATHS.ROOT = SETTINGS.HOST;
  PATHS.RESOURCES = PATHS.ROOT + "resources/";
  PATHS.IMAGES = PATHS.RESOURCES + "images/";
  PATHS.FONTS = PATHS.RESOURCES + "fonts/";

  /** Setting up API */
  API.AKRCK02 = {};
  API.AKRCK02.URL = "http://" + SETTINGS.HOST + ":3333/api/";

  /** Setting up views */
  VIEWS.URL = SETTINGS.URL;
  VIEWS.CODE = VIEWS.URL + "code/";
  VIEWS.GAMES = VIEWS.URL + "nightlight/";
  VIEWS.MEDIA = VIEWS.URL + "media/";
  VIEWS.ABOUT = VIEWS.URL + "about/";
  VIEWS.HOME = VIEWS.URL + "home/";

  /** projects */
  VIEWS.BUBBLE = VIEWS.URL + "bubble/"; 
  VIEWS.LITTLESTYLES = VIEWS.BUBBLE + "littlestyles/"; 

  VIEWS.GTD = VIEWS.URL + "gtd/";
  VIEWS.GTD_LIB = VIEWS.GTD + "lib/";
  VIEWS.GTD_FRAMEWORK = VIEWS.GTD + "framework";
  VIEWS.GTD_TEST = VIEWS.GTD + "test";

  VIEWS.LSS = VIEWS.URL + "lss/"; 
  VIEWS.LSS_LIB = VIEWS.LSS + "lib/"; 
  VIEWS.LSS_MAKER = VIEWS.LSS + "maker/"; 

  VIEWS.CONSOLE = VIEWS.URL + "console/";
  VIEWS.ERROR = VIEWS.URL + "error/";
};
