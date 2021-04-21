import { settings } from "../config/settings.js";
import { fetchJSON } from "../lib/GTD_EasyFetch.js";

/**
 * Login
 * @param {*} funct     - The callback function
 * @param {*} user      - The user 
 * @param {*} password  - The password
 */
export function loginService(funct, user, password, token) {
  let request = {
    token: token,
    content: {
      user: user,
      password: password,
    },
  };
  
  fetchJSON({
    url: settings().API + "?login=" + JSON.stringify(request),
    method: "GET",
    request: request,
    success: (json) => funct(json),
    fail : (json) => {console.log("FAIL: " + json);},
    error : (err) => {console.log("ERROR: " + err);},
  });
}
