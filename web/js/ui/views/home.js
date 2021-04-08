import { settings } from "../../config/settings.js";
import * as ui_tools from "../tools/component.js";

const title = 'Akrck02.com';
export const show = () => {
    window.location = settings().PATH + '#/';
    window.title = title;
    document.title = title;
    document.body.className = 'box-center';

    const little = window.innerWidth < 700;

    const main = ui_tools.create({
       classes : ['main','box-center','box-column'],
        styles : {
           padding: '50px',
           'max-width' : '1000px',
           width : '100%',
           height: '100%',
           opacity : '0',
           transition : '.75s'
        }
    });
    main.appendTo(document.body);

    const title_e = ui_tools.create({
            type    : 'h1',
            text    : 'Akrck02.com',
            classes : ['h1','center_text'],
            styles : {
                padding : '10px', 
                'font-size': '2.5em'
            }
    });
    title_e.appendTo(main.element);

    const btn_container = ui_tools.create({
        classes : [
            'box-center',
            'b-12',
            (little)? 'box-column' :'box-warp'
        ]
    });
    btn_container.appendTo(main.element);

    const alice_btn = ui_tools.create({
        type    : 'button',
        text    : 'Alice',
        classes : ['framed_btn','b-2','center_text'],
        styles:
        (little)? {
            width            : '80%',
            '--accent_color' : '#404040'
        }
        :{
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/alice/'}
    } );
   // alice_btn.appendTo(btn_container.element);

    const bubble_btn = ui_tools.create({
        type    : 'button',
        text    : 'Bubble',
        classes : ['framed_btn','b-2','center_text'],
        styles:
        (little)? {
            width            : '80%',
            '--accent_color' : '#404040'
        }
        :{
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/bubble/'}
    });
    bubble_btn.appendTo(btn_container.element);
    
    const lss_btn = ui_tools.create({
        type    : 'button',
        text    : 'LSS',
        classes : ['framed_btn','b-2','center_text'],
        styles:
        (little)? {
            width            : '80%',
            '--accent_color' : '#404040'
        }
        :{
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/lss/'}
    });
    lss_btn.appendTo(btn_container.element);

   ui_tools.create({
        type    : 'button',
        text    : 'GTD',
        classes : ['framed_btn','b-2','center_text'],
        styles:
        (little)? {
            width            : '80%',
            '--accent_color' : '#404040'
        }
        :{
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/GTD_API/'}
    })//.appendTo(btn_container.element);

    ui_tools.create({
        type    : 'i',
        text    : '<br>Love what u see, <a style="cursor:pointer">support us</a> <3',
        classes : ['minimal_text','center_text'],
        styles:
        (little)? {
            width            : '100%',
            '--accent_color' : '#404040'
        }
        :{
            'min-width'     : '80px',
            'max-width'     : '500px', 
            color: 'var(--smooth_txt_color)'
        },
        events  : {click : () => window.location = 'https://patreon.com/akrck02'}
    }).appendTo(main.element);
    ui_tools.create({
        type    : 'i',
        text    : '<br>this is a beta version',
        styles:
        {
            'min-width'     : '80px',
            'max-width'     : '500px', 
            'font-size'     : '.7em',
            color           : 'var(--smooth_txt_color)',
        },
        classes : ['minimal_text','center_text'],
    }).appendTo(main.element);
}


