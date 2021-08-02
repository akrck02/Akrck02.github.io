import { SETTINGS } from "../settings/settings.js";
import { errorV } from "./error/errorV.js";
import { homeV } from "./home/homeV.js";
import { projectsV } from "./projects/projectsV.js";
import { consoleV } from "./console/consoleV.js";


/**
 * Paths of the application
 */
 const PATHS = {
    home: (params) => show(homeV, params),
    projects: (params) => show(projectsV, params),
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
      location.href = SETTINGS.URL + "#/error/500";
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
        case "projects":
          PATHS.projects(params);
          break;
        case "error":
          PATHS.error(params);
          break;
        case "console":
          PATHS.console(params);
          break;
        default:
          console.log(params);
          location = SETTINGS.URL + "#/error/404/";
      }
    };