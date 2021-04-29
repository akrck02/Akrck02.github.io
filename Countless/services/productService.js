import { settings } from "../config/settings.js";
import { getProperty } from "../config/userSettings.js";
import { fetchJSON, fetchText } from "../lib/GTD_EasyFetch.js";

 /**
  * Get all products
  * @param {*} funct - The callback
  */
 export function getProductsService(funct) {
    let request = {
      token: getProperty("token"),
      auth: getProperty("auth"),
      content: {},
    };
  
    fetchJSON({
      url: settings().API + "?getProducts=" + JSON.stringify(request),
      request: request,
      method: "GET",
      success: (json) => funct(json),
      fail: (fail) => console.log("[Fail] : " + fail),
      error: (error) => console.log("[Error] : " + error),
    });
  }
  