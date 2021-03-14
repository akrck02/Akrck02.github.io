import * as ui_tools from "../tools/component.js";

const title = 'Akrck02.com';
export const show = () => {
    window.location = '/#/';
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
            text    : 'Akrck02.com',
            classes : ['h1'],
            styles : {
                padding : '50px', 
                'font-size': '3.5em'
            }
    });
    title_e.appendTo(main.element);

    const game = ui_tools.create({
        type    : 'p',
        classes : ['code_paragraph'],
        dataset : {text : ''},
        styles   : {'min-height' : '200px'},
        text    : ''
    });
    game.appendTo(main.element);

    const accept = ui_tools.create({
        type    : 'button',
        text    : '&nbsp; NEXT &nbsp;',
        classes : ['framed_btn','center_text'],
        events  : {
            click : () => write_text(game.element)
        } ,
        styles : {'--accent_color': '#404040'}
    });
    accept.appendTo(main.element);

    const btn_container = ui_tools.create({
        classes : [
            'box-center',
            'b-12',
            'box-warp'
        ]
    });
    btn_container.appendTo(main.element);

    const alice_btn = ui_tools.create({
        type    : 'button',
        text    : 'Alice',
        classes : ['accent_btn','b-2','center_text'],
        styles: {
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/alice'}
    } );
    alice_btn.appendTo(btn_container.element);

    const bubble_btn = ui_tools.create({
        type    : 'button',
        text    : 'Bubble',
        classes : ['accent_btn','b-2','center_text'],
        styles: {
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/bubble'}
    });
    bubble_btn.appendTo(btn_container.element);
    
    const lss_btn = ui_tools.create({
        type    : 'button',
        text    : 'LSS',
        classes : ['accent_btn','b-2','center_text'],
        styles: {
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/lss'}
    });
    lss_btn.appendTo(btn_container.element);

   ui_tools.create({
        type    : 'button',
        text    : 'GTD',
        classes : ['accent_btn','b-2','center_text'],
        styles: {
            'min-width'     : '80px',
            'max-width'     : '120px', 
            '--accent_color': '#404040'
        },
        events  : {click : () => window.location = '#/GTD_API'}
    }).appendTo(btn_container.element);
}

let t_index = 0;
let speed = 20;

function write_text(box){
    const text = texts[t_index];
    box.innerHTML = '';
    let i = 0;
      
    const printNextLetter = function() {
        if (i < text.length) {
            box.innerHTML += text[i++];
            setTimeout(printNextLetter, speed);
        }
    }
    printNextLetter();
    change_text(box);
}

function change_text(box){
    if(t_index < texts.length - 1){
        box.dataset.text = texts[t_index];
        t_index++;
    }else box.dataset.text = ' ';

}

let texts = 
[
    'Hello player..',
    '¿How are you?',
    'This is a Test of TEXT SHOWING :D',
];