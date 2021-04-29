import { settings } from "../config/settings.js";
import { createQR } from "../core/createQR.js";
import { create } from "../lib/GTD_Component.js";
import { QR_CODE, SUMMATION } from "../lib/GTD_MaterialIcons.js";
import { downloadURI } from "../lib/GTD_UrlTools.js";

export const bar = (properties) => {
    if(!properties)
        properties = {};

    let msg = properties.title;
    const showQR = properties.showQR;
    const extraOptions = properties.options;

    const bar = create({
        type : 'bar',
        classes : ['minimal_bar','no_copy','box-x-between'],
        styles : {
            background  : '#202020'
        }
    });

    const left = create({
        type: 'box',
        classes : ['box-y-center','box-x-start']
    }); 

    const right = create({
        type: 'box',
        classes : ['box-y-center','box-x-end'],
        styles : {
            'margin-right' : '5px',
        }
    }); 


    const logo = create({
        text: SUMMATION({
            size : "28px",
            classes : ['logo'],
            fill: '#fff'
        }),
        classes : ['box-y-center'],
        styles : {
            margin: 0,
            height: '100%'
        },
        events  : {
            click : () => location.href = settings().URL + "home/"
        }
    });

    msg = (msg == undefined )? 'Bienvenido ' + settings().USER : msg; 
    const title = create({
        type : 'text',
        text : msg,
        classes : [],
        styles : {
            margin : 0,
            'margin-left' : '10px',
            color : '#fff',
            'font-family' : 'Roboto thin',
            'font-weight' : '600',
            'font-size' : '1.4em'

        }
    });

    logo.appendTo(left.element);
    title.appendTo(left.element);

    if(showQR){
        const qrIcon = create({
            type:'icon',
            classes: ['box-center'],
            styles:{
                cursor : 'pointer'
            },
            text: QR_CODE({
                size: '28px',
                fill: '#fff',
            }),
            events : {
                click : () => {
                    let uri = createQR({
                        url : location.href
                    });
                    downloadURI(uri,"QR_CODE.png");
                }
            }
        });

       qrIcon.appendTo(right.element);
    }

    if(extraOptions)
        extraOptions.forEach(option => option.appendTo(right.element));

    left.appendTo(bar.element);
    right.appendTo(bar.element);
   
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