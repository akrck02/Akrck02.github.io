import { Component } from "./classes/component.js";
import { Variable }  from "./classes/variable.js";
import { Style }  from "./classes/style.js";
import { compile } from "./compiler.js";

export function demo(box){

    const comp = new Component('accent_btn');

    const accent_color = new Variable('accent_color','#3f51ff'); 
    const sm_mg = new Variable('sm_mg','10px'); 
    
    const background = new Style('background',accent_color.css_var());
    const margin = new Style('margin',sm_mg.css_var());
    
    comp._variable(accent_color);
    comp._variable(sm_mg);
    
    comp._style(background);
    comp._style(margin);
    

   write_text(box,compile(comp));
}

let speed = 20;
function write_text(box, text){
    box.innerHTML = '';
    let i = 0;
      
    const printNextLetter = function() {
        if (i < text.length) {
            box.innerHTML += text[i++];
            setTimeout(printNextLetter, speed);
        }
    }
    printNextLetter();
    change_text(box);
}