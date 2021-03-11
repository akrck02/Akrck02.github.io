import * as common from "./common/common.js";

export function import_module(){
    let link = document.createElement('link');
    link.href = common.URI;
    link.type = "text/css";
    link.rel = "stylesheet";

    document.querySelector("head").appendChild( link );
}
