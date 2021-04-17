import { settings } from "../config/settings.js";

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
  
  const url = settings().API + "?login=" + JSON.stringify(request);
  const method = { method: "GET" };

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.json();
      else return {
          success : 'false',
          error: '503'
      };
    })
    .then((json) => {
      funct(json);
    })
    .catch(function (err) {
        return {
            error : err,
            type : 'Runtime error'
        }
    });
}
