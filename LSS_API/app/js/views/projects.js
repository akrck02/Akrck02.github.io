import { minimal_bar } from "../components/project_view/minimalBar.js";
import { projects_menu } from "../components/project_view/projectMenu.js";
import { create } from "../lib/component.js";


export const show = () =>{

    window.title = 'LSS Maker - Your projects';
    document.title ='LSS Maker - Your projects';

    const bar = minimal_bar(() =>{}, 'Projects');
    bar.appendTo(document.body);

    const main = create({
        type: 'view',
        classes : ['main','box-y-center','no_copy', 'box-column' ],
        styles : {
            width : '100%',
            height: 'calc(100% - 8vh)',
            padding: '10%',
            'padding-top' : '20px',
            opacity : 0,
            transition : '1s'
        }
    });
    main.appendTo(document.body);
    projects_menu({main : main});
}
