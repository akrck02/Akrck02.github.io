import * as fileSaver from "./FileSaver.js";

export function compile(comp){
    let out = "";
    
    for(let i = 0; i < 10; i++)
        out += "<br>" + comp.compile() + "<br>";
    
    save(out);
    return out;
}

function save(content){
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    fileSaver.saveAs(blob, "static.css");
}