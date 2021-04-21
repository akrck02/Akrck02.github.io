import { isEmpty } from "../lib/GTD_DataTools.js";
import { loginService } from "../services/accessService.js";
import { setCompany, settings, setUser } from "./settings.js";

export const isLogged = () => {
  const token = getProperty("token");
  const auth = getProperty("auth");

  if (isEmpty(token) || isEmpty(auth)) return false;

  return true;
};

export const loginInApp = (user, password, token) => {
  loginService(
    (json) => {
      if (json.success) {
        setProperty("token", json.token);
        setProperty("auth", json.content.auth);
        setProperty("user", json.content.user);

        setUser(json.content.user);
        setCompany(json.content.company);

        location.href = settings().URL + "home/";
      } else {
      }
    },
    user,
    password,
    token
  );
};

/**
 * Get user property
 * @param {*} name - The property name
 */
export const getProperty = (name) => {
  let properties = JSON.parse(localStorage.getItem("CLSS"));
  if (properties == null){
    properties = {};
    localStorage.setItem("CLSS", JSON.stringify(properties));
  }

  const result = properties[name];
  return result;
};

/**
 * Set user property
 * @param {*} name  - The property name
 * @param {*} value - The property value
 */
export const setProperty = (name, value) => {
  let properties = JSON.parse(localStorage.getItem("CLSS"));
  if (properties == null) properties = {};

  properties[name] = value;
  localStorage.setItem("CLSS", JSON.stringify(properties));
};

/**
 * Logout of the app
 */
export const destroy = () =>{
  localStorage.removeItem("CLSS");
  location.href = settings().URL;
}