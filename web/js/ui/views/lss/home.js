import { create } from "../../../../../LSS_API/app/js/lib/component.js";
import { settings } from "../../../config/settings.js";
import { lss_button } from "../../components/lss_button.js";
import * as ui_tools from "../../tools/component.js";
import * as router from "./router.js";

const title = 'LSS - Logic UI';
export const show = (params) => {
    console.log(params);
    window.title = title;
    document.title = title;

    document.body.className = 'box-center';
    const main = ui_tools.create({
        type: 'view',
        classes : ['main','no-copy','box-center','box-column'],
        styles : {
            padding : '50px',
            height : '100%', 
            width : '100%',
            background : '#fff'
        }
    });
    main.appendTo(document.body);

    const title_e = ui_tools.create({
        type    : 'h1',
        text    : 'Logic Style Sheets',
        classes : ['h1'],
        styles : {
            'max-width' : '500px',
            'margin-bottom' : '10px',
        }
    });
    title_e.appendTo(main.element);

    const desc_text = ui_tools.create({
        type    : 'p',
        text    : 'A new way to design.',
        styles : {
            'margin-top' : '10px',
            'margin-bottom' : '10px',
        }
    });
    desc_text.appendTo(main.element);

    const menu = create({
        type : 'menu',
        classes : ['box-row','box-center','box-warp'],
        styles : {
            display : 'flex',
            padding : 0
        } 
    });

    const api_box = create({
        type : 'box',
        classes : ['box-column'],
        styles : {
            display : 'flex',
            padding : '10px'
        }
    });

    const api_subbox = create({
        type : 'box',
        classes : ['box-row'],
        style : {
            'justify-content' : 'space-between'
        } 
    });

    const api_button = lss_button( 
        settings().LSS_ICONS + 'lss_api_logo.svg',
        'LSS API', 
        () => window.location.href = settings().PATH + '#/lss/api'
    );
    
    const maker_box = create({
        type : 'box',
        classes : ['box-column'],
        styles : {
            display : 'flex',
            padding : '10px'
        }
    });
        
    const maker_button = lss_button( 
        settings().LSS_ICONS + 'lss_maker_logo.svg',
        'LSS Maker', 
        () => window.location.href = settings().PATH + '#/lss/app'
    );

    const message_box = create({
        type : 'message',
        classes : ['box-row'],
        styles : {
            color : '#D6D6D6'
        }
    });

    const message = create({
        type : 'content',
        text : 'Choose your weapon',
        styles : {
            'font-style' : 'italic',
            'font-weight' : '600' 
        }
    });

    const shield_icon = create({
        type : 'img',
        options : {
            src : settings().LSS_ICONS + 'shield_gray.svg'
        },
        styles : {
            height : '100%',
            'margin-left' : '5px'
        }
    });

    api_button.appendTo(api_box.element);
    maker_button.appendTo(maker_box.element);

    api_box.appendTo(menu.element);
    maker_box.appendTo(menu.element);

    message.appendTo(message_box.element);
    shield_icon.appendTo(message_box.element);

    menu.appendTo(main.element);
    message_box.appendTo(main.element);

    
}