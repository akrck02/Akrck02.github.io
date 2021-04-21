import { isEmpty } from "../lib/GTD_DataTools.js";
import { getProperty } from "./userSettings.js";

const configuration = {};

/**
 * Set app basic settings
 */
export const setSettings = () => {
    configuration.URL = "http://localhost/akrck02.com/countless/#/";
    configuration.REAL_URL = "http://localhost/akrck02.com/countless/";
    configuration.API = configuration.REAL_URL + "api/CountlessAPI.php";
    configuration.RESOURCES = configuration.REAL_URL + "resources/";
    configuration.ICONS = configuration.RESOURCES + "icons/";

    const user = getProperty("user");
    setUser(user);
}

/**
 * Get settings 
 * @returns settings
 */
export const settings = () => {
    return configuration;
}

/**
 * Set user in configuration
 */
export const setUser = (user) => {
    if(isEmpty(user)) user = '';
    configuration.USER = user;
}

/**
 * Set company name in configuration
 */
 export const setCompany = (company) => {
    if(isEmpty(company)) company = '';
    configuration.COMPANY = company;
}


String.prototype.initCap = function(){
    const str1 = this.substr(0,1).toUpperCase();
    const str2 = this.substr(1).toLowerCase();
    return str1 + "" + str2;
}