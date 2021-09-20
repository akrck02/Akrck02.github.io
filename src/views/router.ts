import homeV from './home/homeV';
import errorV from './error/errorV';
import { CONFIG } from '../config/config';
import codeV from './code/codeV';
import GamesV from './games/gamesV';
import mediaV from './media/mediaV';
import aboutV from './about/aboutV';
import nightlight from './nightlight/nightlight';

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