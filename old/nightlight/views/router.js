
  /**
   * Load a view
   * @param {array} params
   */
   export const load = (params) => {
    switch (params[0]) {

      /* Views */
      case undefined:
      case "":
        PATHS.home(params);
        break;
         

      /* Default state (Not found) */
      default:
        console.log(params);
        location = SETTINGS.URL + "error/404/";
    }
  };