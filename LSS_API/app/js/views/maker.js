import { create } from "../lib/component.js";

let content;

export const show = () =>{

    window.title = 'LSS Maker - Home';
    document.title ='LSS Maker - Home';

    const mobile = document.body.dataset.mobile;
    const main = create({
        type: 'view',
        classes : ['main','box-warp','no_copy', (mobile == "true")? 'box-column':'box-row' ],
        styles : {
            width : '100%',
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
            height : '50vh',
            width : '100%'
        }:{
            background : 'var(--bg)',
            height : '100vh',
            width : 'calc(100% - 300px)'
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


function create_menu(main,mobile){
    
    const menu = create({
        type : 'div',
        
        styles :
        (mobile == "true") ? {
            background : 'var(--b3)', 
            height : '50vh',
            width : '100%',
            padding: '20px',
            'box-shadow' : '-1px 0px 4px rgba(0,0,0,.05)'
        }:{
            background : 'var(--b3)', 
            height : '100vh',
            width : '300px',
            padding: '20px',
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

function create_button_bar(menu){

    const button_bar = create({
        type : 'div',
        id : 'toolbar',
        classes :   ['box-row','box-x-around'],
        styles : {
            width   : '90%',
            height  : '50px',
            margin  : '5%'
        }
    });
    button_bar.appendTo(menu.element);

    const color_button  = create({type : 'div',classes : ['rounded_tool_btn']});
    const font_button   = create({type : 'div',classes : ['rounded_tool_btn']});
    const size_button   = create({type : 'div',classes : ['rounded_tool_btn']});
    const layout_button = create({type : 'div',classes : ['rounded_tool_btn']});
    const misc_button   = create({type : 'div',classes : ['rounded_tool_btn']});

    color_button.appendTo(button_bar.element);
    font_button.appendTo(button_bar.element);
    size_button.appendTo(button_bar.element);
    layout_button.appendTo(button_bar.element);
    misc_button.appendTo(button_bar.element);

}
