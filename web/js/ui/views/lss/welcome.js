import { create } from "../../tools/component.js";

const title = 'LSS - Gettting started';
export const show = (params) => {
    window.title = title;
    document.title = title;

    const main = create({
        classes : ['main'],
        styles : {
            padding: '50px',
            'max-width' : '1000px',
        }
    });
    main.appendTo(document.body);

    const title_e = create ({
        type : 'h1',
        text : 'Getting started'
    });
    title_e.appendTo(main.element);

    create ({
        type : 'p',
        text : 
        `
            LSS is a CSS UI design API made in javascript.
            <br><br>

            <a href="https://github.com/akrck02/LSS_API">github.com/akrck02/LSS_API</a>

        `,
    }).appendTo(main.element);

    create ({
        type      : 'h4',
        text      : `Setting up LSS API...`,
    }).appendTo(main.element);

    create ({
        type      : 'p',
        classes   : ['code_paragraph'],
        styles    : {'max-width': '500px'},
        text      : `npm install LSS_API --latest`,
    }).appendTo(main.element);
    
    create ({
        type      : 'i',
        text      : `or download here, <b>versions:</b><br><br>`,
    }).appendTo(main.element);

    create ({
        type      : 'button',
        text      : `Minimal`,
        classes   : ['framed_btn','center_text'],
        styles    : {'max-width': '100px'}
    }).appendTo(main.element);

    create ({
        type      : 'button',
        text      : `Pretty`,
        classes   : ['framed_btn','center_text'],
        styles    : {'max-width': '100px'}
    }).appendTo(main.element);


}