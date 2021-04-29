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


export function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }