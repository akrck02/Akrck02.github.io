import { getMonth } from "../core/monthCalc.js";
import { create } from "../lib/GTD_Component.js";

export const months = () => {

    let month = 12;
    const comp = create({
        type : 'div',
        classes : ['no_copy','tab_bar','box-row'],
        styles : {
            background : 'transparent',
            border : 'none'
        }
    });


    for (let i = 0; i < month; i++) {
       const tab = create({
           type:'div',
           text : getMonth(i).substr(0,3),
           id : 'month' + i,
           classes : ['tab','monthTab','center_text','box-center',(i == 0) ? 'selected':'.'],
           data:{
                month : i
           },
           styles : {
               width: 'calc(100% / 12)'
           }
       });

       tab.appendTo(comp.element);
    }


    return comp;
} 