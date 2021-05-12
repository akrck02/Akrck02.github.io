import { settings } from "../../config/settings.js";
import { create } from "../../lib/component.js";

export const minimal_bar = (search_function,name) =>
{

    const bar = create({
        type : 'minimal_bar',
        classes : ['minimal_bar'],
        styles : {
            'box-shadow' : '0px 2px 4px rgba(0,0,0,.1)',
            'justify-content' : 'space-between',
            'height' : '8vh'
        }
    });

    const title = create({
        type : 'h1',
        text : name,
        styles : {
            color: '#fff',
            'font-family' : 'Roboto',
            'font-weight' : 400,
            'font-size' : '1.2em',
        }
    }); 

    const search = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "search_white.svg"
        },
        styles : {
            height : '70%',
            cursor : 'pointer'
        }
    }); 

    title.appendTo(bar.element);
    search.appendTo(bar.element);


    return bar;
}
