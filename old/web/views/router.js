import { SETTINGS } from "../settings/settings.js";
import { errorV } from "./error/errorV.js";
import { homeV } from "./home/homeV.js";
import { consoleV } from "./console/consoleV.js";
import { mediaV } from "./media/mediaV.js";
import { aboutV } from "./about/aboutV.js";
import { codeV } from "./code/codeV.js";
import { start as nightlight } from "../../nightlight/app.js";


/**
 * Paths of the application
 */
 const PATHS = {
    home: (params) => show(homeV, params),
    code: (params) => show(codeV, params),
    games: (params) => show(gamesV, params),
    media: (params) => show(mediaV, params),
    about: (params) => show(aboutV, params),

    nightlight: (params) => show(nightlight, params),

    error: (params) => show(errorV, params),
    console: (params) => show(consoleV, params),
  };
  
  /** show a view */
  const show = (view , params) => {
    try {
      document.body.innerHTML = "";
      view(params);
    } catch (error) {
      console.error(error);
      location.href = SETTINGS.URL + "error/500";
    }
  };
  
  /**
   * Load a view
   * @param {array} params
   */
   export const load = (params) => {
      switch (params[0]) {

        /* Views */
        case undefined:
        case "":
        case "home":
          PATHS.home(params);
          break;
        case "code":
          PATHS.code(params);
          break;
        case "media":
          PATHS.media(params);
          break;
        case "about":
          PATHS.about(params);
          break;

        /* Special sites */
        case "games":
        case "nightlight":
          PATHS.nightlight(params);
          break;

        /* Debuging tools */
        case "error":
          PATHS.error(params);
          break;
        case "console":
          PATHS.console(params);
          break;

        /* Default state (Not found) */
        default:
          console.log(params);
          location = SETTINGS.URL + "error/404/";
      }
    };