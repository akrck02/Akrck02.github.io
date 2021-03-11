import * as ui_tools from "../../tools/component.js";
import * as router from "../router_lss.js";

const title = 'LSS - Logic UI';
export const show = (params) => {
    console.log(params);
    window.title = title;
    document.title = title;

    document.body.className = 'box-center';
    const main = ui_tools.create({
        styles : {
            padding: '50px',
            'max-width' : '1000px'
        }
    });
    main.appendTo(document.body);

    const title_e = ui_tools.create({
        type    : 'h1',
        text    : 'Logic Style Sheets',
        classes : ['h1']
    });
    title_e.appendTo(main.element);

    const desc_text = ui_tools.create({
        type    : 'p',
        text    : 'A new way to design.'
    });
    desc_text.appendTo(main.element);

    const button_bar = ui_tools.create({
        classes : ['b-12','box-center','box-warp']
    });
    button_bar.appendTo(main.element);

    const getting_started_btn = ui_tools.create({
        type    :  'button',
        text    :  'Getting started',
        classes :  ['elegant_btn','horizontal'],
        styles :  {width : '140px', '--color': 'var(--accent_color)'}
    });
    getting_started_btn.appendTo(button_bar.element);


    const compiler_btn = ui_tools.create({
        type    :  'button',
        text    :  'Online compiler',
        classes :  ['minimal_btn','horizontal','center_text'],
        styles :  {width : '190px', '--color': '#ccc'},
        events :  {click : () =>{ window.location += "/compiler"}}
    });
    compiler_btn.appendTo(button_bar.element);
}