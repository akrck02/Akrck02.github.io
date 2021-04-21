import { settings } from "../config/settings";
import { fetchJSON, fetchText } from "../lib/GTD_EasyFetch";

 export const getMonthEventService = (funct,auth,start,end) =>{

    const request = {
        content : {
            auth: auth,
            start: start,
            end, end
        }
    };

    fetchJSON({
        url : "http://localhost/akrck02.com/countless/api/CountlessAPI.php?getEventsBetween=" + JSON.stringify(request),
        method : "GET",
        request : request,
        success : (json) => funct(json),
        fail :    (fail) =>  console.log("[Fail] : " + fail),
        error :   (error) =>  console.log("[Error] : " + error),

    });

    
 }