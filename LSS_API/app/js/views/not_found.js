import { create } from "../lib/component.js";

export const show = () => {

    window.title = 'LSS Maker - Not found';
    document.title ='LSS Maker - Not found';

    const main = create({
        type : 'view',
        classes : ['main','box-column','box-center'],
    });
    main.appendTo(document.body);

    create({
        type : 'h1',
        text : '404 : Not found'
    })
    .appendTo(main.element);

    create({
        type : 'p',
        text : 'This page is no longer alive :('
    })
    .appendTo(main.element);


}