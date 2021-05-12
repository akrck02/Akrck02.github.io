
/**
 * Get parameters of a url by breakpoint
 */
export const getParametersByBreakPoint = (url,breakpoint) => {
    let params = url.split("/");
    const index = params.indexOf(breakpoint);
   
    if(index == -1)
        return [];

    params = params.slice(index,params.length);
    return params;
}

/**
 * Get parameters of a url by index 
 */
 export const getParametersByIndex = (url,index) => {
    let params = url.split("/");
    params = params.slice(index,params.length);
    return params;
}



const params = getParametersByBreakPoint("Akrck02.com/#/lss/app/maker/4/u/akrck02/z/100", "mker");
console.log(params);

const params2 = getParametersByIndex("Akrck02.com/#/lss/app/maker/4/u/akrck02/z/100", 5);
console.log(params2);