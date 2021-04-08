import { projects_menu } from "../components/project_view/projectMenu.js";
import { projects_menu_entry } from "../components/project_view/projectsMenuEntry.js";
import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";


export const show = () =>{

    window.title = 'LSS Maker - Your projects';
    document.title ='LSS Maker - Your projects';

    const mobile = document.body.dataset.mobile;

    const bar = create({
        type : 'minimal_bar',
        classes : ['minimal_bar'],
        styles : {
            'box-shadow' : '0px 2px 4px rgba(0,0,0,.1)',
            'justify-content' : 'space-between',
        }
    });

    const title = create({
        type : 'h1',
        text : 'Projects',
        styles : {
            color: '#fff',
            'font-family' : 'Roboto Mono',
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
            color: '#fff',
            'font-family' : 'Roboto Mono',
            'font-weight' : 400,
            'font-size' : '1.2em',
            height : '70%',
            cursor : 'pointer'
        }
    }); 

    title.appendTo(bar.element);
    search.appendTo(bar.element);
    bar.appendTo(document.body);

    const main = create({
        type: 'view',
        classes : ['main','box-y-center',,'no_copy', 'box-column' ],
        styles : {
            width : '100%',
            height: '100%',
            padding: '10%',
            'padding-top' : '20px',
            opacity : 0,
            transition : '1s'
        }
    });
    main.appendTo(document.body);
    projects_menu({main : main});
}
