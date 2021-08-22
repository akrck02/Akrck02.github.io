
/**
 * Get if is small device
 * @returns 
 */
export const isSmallDevice = () =>{
    return  window.matchMedia("only screen and (max-width: 760px)").matches;
}
/**
 * Get if is small device
 * @returns 
 */
 export const isShortDevice = () =>{
    return  window.matchMedia("only screen and (max-height: 460px)").matches;
}


/**
 *  Get userAgent of a device
 * @returns Bundle of functions
 */
export const userAgent = () => {
    return {
        Android: () => navigator.userAgent.match(/Android/i),
        BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
        iOS:() => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        Opera: () => navigator.userAgent.match(/Opera Mini/i),
        Windows: () => navigator.userAgent.match(/IEMobile/i),
        any: () => (userAgent().Android() || userAgent().BlackBerry() || userAgent().iOS() || userAgent().Opera() || userAgent().Windows())
    }
};

/**
* Get if is mobile
* @returns true | false
*/
export const isMobile = () => userAgent().any();


export const getOS = () => {
    let platform = window.navigator.userAgent;
    let OSName = "Generic";
    
    if (platform.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    else if (platform.indexOf("Windows NT 6.3") != -1) OSName="Windows 8.1";
    else if (platform.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    else if (platform.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    else if (platform.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    else if (platform.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    else if (platform.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    
    if (platform.indexOf("Mac")            != -1) OSName="Mac/iOS";
    if (platform.indexOf("X11")            != -1) OSName="UNIX";
    if (platform.indexOf("Linux")          != -1) OSName="Linux";

    return OSName;   
}