
/**
 * Get if is small device
 * @returns 
 */
export const isSmallDevice = () =>{
    return  window.matchMedia("only screen and (max-width: 760px)").matches;
}

/**
 * Get if is mobile
 * @returns true | false
 */
export const isMobile = () => userAgent.any();

    
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
        any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
};