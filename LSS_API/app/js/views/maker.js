import { settings } from "../config/settings.js";
import { create } from "../lib/component.js";
import { maker_bar } from "../components/maker_view/makerBar.js";

let content;
let data;

/**
 * Show the editor view
 * @param {Array} params 
 */
export const show = (params) =>{

    window.title = 'LSS Maker - Home';
    document.title ='LSS Maker - Home';

    if( params == undefined || params == "" || params[0] == "")
        location.href = settings.PATH;

    fetch_data(params[0]);

    const mobile = document.body.dataset.mobile;
    const bar =  maker_bar({
        name  : "Component",
        saved : true,
        data  : data
    });
    
    bar.appendTo(document.body);

    const main = create({
        type: 'view',
        classes : ['main','box-warp','no_copy', (mobile == "true")? 'box-column':'box-row' ],
        styles : {
            width : '100%',
            height : 'calc(100% - 8vh)',
            opacity : 0,
            transition : '1s'
        },
        show : () =>{
            document.querySelector('.main').style.opacity = '1';
        }
    });
    main.appendTo(document.body);

    content = create({
        type : 'div',
        classes : ['content','box-center'],
        styles : 
        (mobile == "true") ? {
            background : 'var(--bg)',
            height : '50%',
            width : '100%'
        }:{
            background : 'var(--bg)',
            height : '100%',
            width : 'calc(100% - 400px)'
        }  
    });
    content.appendTo(main.element);

    const plus = create({
        type : 'div',
        text : '+',
        classes : ['box-center', 'hover_accent'],
        styles:{
            width : '5vh',
            height : '5vh',
            color : 'var(--smooth_txt_color)',
            'font-weight' : 'bold',
            'font-size' : '3em',
            position: 'fixed',
            top: '15px',
            left : '15px',
            cursor: 'pointer'
        },
        events:{
            click : () => {
                const obj = document.querySelector('.object');
                if(obj != null){
                    const zoom = +obj.dataset.zoom + .2;
                    obj.style['transform'] = 'scale('+ zoom +')';
                    obj.dataset.zoom = zoom;
                    console.log(obj)
                }
                
            }
        }
    });
    plus.appendTo(main.element);

    const minus = create({
        type : 'div',
        text : '-',
        classes : ['box-center', 'hover_accent'],
        styles:{
            width : '5vh',
            height : '5vh',
            color : 'var(--smooth_txt_color)',
            'font-weight' : 'bold',
            'font-size' : '4em',
            position: 'fixed',
            top: '15px',
            left : 'calc(27px + 5vh)',
            cursor: 'pointer'
        },
        events:{
            click : () => {
                const obj = document.querySelector('.object');
                if(obj != null){
                    const zoom = +obj.dataset.zoom - .2;
                    obj.style['transform'] = 'scale('+ zoom +')';
                    obj.dataset.zoom = zoom;
                }
                
            }
        }
    });
    minus.appendTo(main.element);
    
    create_menu(main,mobile);
}

/**
 * Create the menu for the editor view
 * @param {Component} main 
 * @param {Boolean} mobile 
 */
function create_menu(main,mobile){
    
    const menu = create({
        type : 'menu',
        
        styles :
        (mobile == "true") ? {
            background : 'var(--b3)', 
            height : '50%',
            width : '100%',
            padding: '20px',
            display : 'block',
            margin : 0,
            'box-shadow' : '-1px 0px 4px rgba(0,0,0,.05)'
        }:{
            background : 'var(--b3)', 
            height : '100%',
            width : '400px',
            padding: '10px',
            margin : 0,
            display : 'block',
            'box-shadow' : '-1px 0px 4px rgba(0,0,0,.05)'
        }  
    });
    menu.appendTo(main.element);

    const select_element = create({
        type : 'select',
        classes : ['lss_select'],
        events : {
            input : (e) => {
                content.clean();
                create({
                    type : e.target.options[e.target.selectedIndex].value,
                    text : e.target.options[e.target.selectedIndex].text,
                    classes : ['object'],
                    data:{ zoom : 1 }
                }).appendTo(content.element);
            }
        }
    });
    select_element.appendTo(menu.element);

    const button_option = create({
        type : 'option',
        text : 'Button',
        options : {
            value : 'button'
        }  
    });
    button_option.appendTo(select_element.element);

    const div_option = create({
        type : 'option',
        text : 'Div',
        options : {
            value : 'div'
        }  
    });
    div_option.appendTo(select_element.element);

    create_button_bar(menu);
}

/**
 * Create boton bar for the menu
 * @param {Component} menu 
 */
function create_button_bar(menu){

    const button_bar = create({
        type : 'div',
        id : 'toolbar',
        classes :   ['box-row','box-x-around'],
        styles : {
            width   : '90%',
            height  : '50px',
            'margin-left'  : '5%',
            'margin-right'  : '5%',
        }
    });
    button_bar.appendTo(menu.element);

    const color_button  = create({type : 'div',classes : ['rounded_tool_btn','box-center','selected']});
    const color_icon    = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "color_white.svg"
        }
    });

    const font_button   = create({type : 'div',classes : ['rounded_tool_btn','box-center']});
    const font_icon     = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "letter_gray.svg"
        }
    });

    const size_button   = create({type : 'div',classes : ['rounded_tool_btn','box-center']});
    const size_icon     = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "size_gray.svg"
        }
    });

    const layout_button = create({type : 'div',classes : ['rounded_tool_btn','box-center']});
    const layout_icon   = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "layout_gray.svg"
        }
    });

    const misc_button   = create({type : 'div',classes : ['rounded_tool_btn','box-center']});
    const misc_icon     = create({
        type : 'img',
        options : {
            src : settings.COMMON_ICONS + "settings_gray.svg"
        }
    });

    color_icon.appendTo(color_button.element);
    color_button.appendTo(button_bar.element);

    font_icon.appendTo(font_button.element);
    font_button.appendTo(button_bar.element);

    size_icon.appendTo(size_button.element);
    size_button.appendTo(button_bar.element);

    layout_icon.appendTo(layout_button.element);
    layout_button.appendTo(button_bar.element);

    misc_icon.appendTo(misc_button.element);
    misc_button.appendTo(button_bar.element);

}

/**
 * Fetch component data from database
 * @param {int} id 
 */
const fetch_data = (id) => {


}