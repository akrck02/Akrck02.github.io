import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";


export const bar = (msg) => {
    const bar = create({
        type : 'bar',
        classes : ['minimal_bar','no_copy'],
        styles : {
            background  : '#202020'
        }
    });

    const logo = create({
        type : 'img',
        classes : ['logo'],
        options : {
            src : settings().ICONS + "funct.svg",
            alt : 'Logo'
        },
        events  : {
            click : () => {
               location.href = settings().URL + "home/";
            }
        }
    });

    msg = (msg == undefined )? 'Bienvenido ' + settings().USER : msg; 
    const title = create({
        type : 'h1',
        text : msg,
        classes : [],
        styles : {
            margin : '20px',
            color : '#fff',
            'font-family' : 'Roboto thin',
            'font-size' : '1.4em'

        }
    });

    logo.appendTo(bar.element);
    title.appendTo(bar.element);



    return bar;
}


export const miniBar = () => {
    const bar = create({
        type : 'bar',
        classes : ['minimal_bar','no_copy'],
        styles : {
            background  : '#202020'
        }
    });

    const logo = create({
        type : 'img',
        classes : ['logo'],
        options : {
            src : settings().ICONS + "funct.svg",
            alt : 'Logo'
        },
        events  : {
            click : () => {
               location.href = settings().URL + "home/";
            }
        }
    });

    const title = create({
        type : 'h1',
        text : window.title,
        classes : [],
        styles : {
            margin : '20px',
            color : '#fff',
            'font-family' : 'Roboto thin',
            'font-size' : '1.4em'

        }
    });

    logo.appendTo(bar.element);
    title.appendTo(bar.element);



    return bar;
}