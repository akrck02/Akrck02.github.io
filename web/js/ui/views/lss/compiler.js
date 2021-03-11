import * as ui_tools from "../../tools/component.js";
import * as test from "../../../../../LSS/code/compiler/test.js";

const title = 'LSS - Compiler';
export const show = (params) => {
    window.title = title;
    document.title = title;

    document.body.classList.add('box-center');
    document.body.classList.add('box-column');

    const main = ui_tools.create({
        classes : ['box-center','b-12','box-column'],
        styles  : {
            height: '90vh',
            'max-width' : '1000px'
        } 
    });
    main.appendTo(document.body);

    const title_e = ui_tools.create({
        type : 'h1',
        classes : ['h1'],
        text : 'LSS Compiler'
    });
    title_e.appendTo(main.element);

    const box = ui_tools.create({
        type    : 'p',
        classes : ['code_paragraph'],
        styles : {
            'min-width' : '400px', 
            'min-height' : '200px' 
        }
    }); 
    box.appendTo(main.element);

    const compile_btn = ui_tools.create({
        type : 'button',
        classes : ['elegant_btn'],
        text : 'Compile',
        events : {
            click : () => test.demo(box.element)
        }
    });
    compile_btn.appendTo(main.element);

    const erase_btn = ui_tools.create({
        type : 'button',
        classes : ['minimal_btn'],
        text : 'Erase',
        events : {
            click : () => box.clean()
        }
    });
    erase_btn.appendTo(main.element);
}
