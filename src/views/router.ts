import homeV from './home/homeV.js';
import errorV from './error/errorV.js';
import { CONFIG } from '../config/config.js';
import docsV from './docs/docsV.js';
import codeV from './code/codeV.js';
import GamesV from './games/gamesV.js';
import mediaV from './media/mediaV.js';
import aboutV from './about/aboutV.js';
import nightlight from './nightlight/nightlight.js';
import Construction from './construction/constructionV.js';

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
    docs: (params : string[]) => show(docsV, params),
    construction: (params : string[]) => show(new Construction().show, params),

    //especific websites
    nightlight: (params : string[]) => show(nightlight, params),

    //debug
    error: (params : string[]) => show(errorV, params),
  };
  
  /** show a view */
  const show = (view , params) => {
    try {
      if(document.querySelector('body'))
        document.querySelector('body').innerHTML = "";

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
     console.log(params);
     
      switch (params[0]) {
        /*
        case undefined:
        case "":
        case "home":
          PATHS.home(params);
          break;
        case "code":
          PATHS.code(params);
          break;
        case "about":
          PATHS.about(params);
          break;
        case "docs":
          PATHS.docs(params); 
          break;
        case "error":
          PATHS.error(params);
          break;*/
        default: 
          PATHS.construction(params);
          //location.href = CONFIG.URL + "#/error/404/";
      }
    };