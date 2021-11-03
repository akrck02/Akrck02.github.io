/**
 * Get parameters of a url by breakpoint
 */
export function getParametersByBreakPoint (url: string, breakpoint: string) : string[] {
    let params = url.split("/");
    const index = params.indexOf(breakpoint);

    if (index == -1) return [];

    params = params.slice(index, params.length);
    return params;
};

/**
 * Get parameters of a url by index
 */
export function getParametersByIndex (url: string, index: number) : string[]{
    let params = url.split("/");
    params = params.slice(index, params.length);
    return params;
};

/**
 *  Download a file 
 */
export function downloadURI(uri: string, name: string) :void {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
