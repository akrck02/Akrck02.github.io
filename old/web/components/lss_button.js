import { create } from "../services/component.js";

export const lss_button = (icon , name, func) =>{
    const api_button = create({
        type : 'lss_button',
        classes : ['lss_button','box-row'],
        events : {
            click : func
        }
    });

    const api_logo = create({
        type : 'img',
        options : {
            src : icon
        },
        styles: {
            'border-radius' : '120px',
            'box-shadow' : '0px 2px 2px rgba(0,0,0,.10)',
            'max-height' : '100%',
            'margin-left' : '5px'
        }
    });

    const api_name = create({
        type : 'name',
        text : name,
        styles : {
            color : '#202020',
            'font-size' : '1.2em',
            'font-weight' : '600',
            padding: '15px'
        }
    });

    api_logo.appendTo(api_button.element);
    api_name.appendTo(api_button.element);

    return api_button;
}