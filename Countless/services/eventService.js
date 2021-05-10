import { settings } from "../config/settings.js";
import { fetchJSON } from "../lib/GTD_EasyFetch.js";

 export const getMonthEventService = (funct,auth,start,end) =>{

    const request = {
        content : {
            auth: auth,
            start: start,
            end, end
        }
    };

    fetchJSON({
        url : settings().API + "?getEventsBetween=" + JSON.stringify(request),
        method : "GET",
        request : request,
        success : (json) => funct(json),
        fail :    (fail) =>  console.log("[Fail] : " + fail),
        error :   (error) =>  console.log("[Error] : " + error),

    });

    
 }