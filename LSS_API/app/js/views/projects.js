import * as router from "../config/router.js";
import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";

let content;

export const show = () =>{

    window.title = 'LSS Maker - Your projects';
    document.title ='LSS Maker - Your projects';

    const mobile = document.body.dataset.mobile;
    const main = create({
        type: 'div',
        classes : ['main','box-center','no_copy', 'box-column' ],
        styles : {
            width : '100%',
            height: '100%',
            opacity : 0,
            transition : '1s'
        }
    });
    main.appendTo(document.body);

    const title = create({
        type: 'h1',
        text: 'Your projects :)',
        classes : ['h1','box-center','no_copy', 'box-column' ]
    });
    title.appendTo(main.element);

    const sub = create({
        type: 'i',
        text: 'No proyects found, start one!',
        classes : ['h1','box-center','no_copy', 'box-column' ],
        styles : {
            'font-size' : '1em'
        }
    });
    sub.appendTo(main.element);

    const new_btn = create({
        type: 'button',
        text: 'Start',
        classes : ['framed_dashed_btn','box-center','no_copy', 'box-column' ],
        styles : {
            margin: '50px',
            'color' : 'white',
        },
        events : {
            click : () => { window.location = settings.PATH + "maker/"}
        }
    });
    new_btn.appendTo(main.element);


}