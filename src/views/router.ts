import homeV from './home/homeV.js';
import errorV from './error/errorV.js';
import { CONFIG } from '../config/config.js';
import codeV from './code/codeV.js';
import GamesV from './games/gamesV.js';
import mediaV from './media/mediaV.js';
import aboutV from './about/aboutV.js';
import nightlight from './nightlight/nightlight.js';

/**
 * Paths of the application
 */
 const PATHS = {
   //views
    home: (params : string[]) => show(homeV, params),
    code: (params : string[]) => show(codeV, params),
    games: (params : string[]) => show(GamesV, params),
    media: (params : string[]) => show(mediaV, params),
    about: (params : string[]) => show(aboutV, params),

    //especific websites
    nightlight: (params : string[]) => show(nightlight, params),

    //debug
    error: (params : string[]) => show(errorV, params),
  };
  
  /** show a view */
  const show = (view , params) => {
    try {
      if(document.querySelector('main'))
        document.querySelector('main').innerHTML = "";

      view(params);
    } catch (error) { 
      console.error(error);
      location.href = CONFIG.URL + "#/error/500";
    }
  };
  
  /**
   * Load a view
   * @param {array} params
   */
   export const load = (params) => {
      switch (params[0]) {
        case undefined:
        case "":
        case "home":
          PATHS.home(params);
          break;
        case "error":
          PATHS.error(params);
          break;
        default:
          location.href = CONFIG.URL + "#/error/404/";
      }
    };