import { lastday } from "../core/monthCalc.js";
import { create } from "../lib/GTD_Component.js"

export const  monthTable = (monthDraft) => {
    const i = monthDraft.month;
    const info = monthDraft.info;

    let y = new Date().getFullYear();
    let max_day = lastday(y,i);
  
    const table = create({
        type : 'table',
        classes : ['prettyTable'],
        id: 'monthTable',
        styles : {
            opacity : '0',
            display : 'table',
            transition : '1.5s',
            'padding-bottom' : '30px' 
        }
    });

    const headers = create({
        type : 'tr',
        classes : ['prettyTableRow','b-12'],
    });

    const day = create({
        type : 'th',
        text : 'Día',
        classes : ['prettyTableHeader'],
        styles: {
            'width' : '10px '
        }
    });

    const id = create({
        type : 'th',
        text : 'Id',
        classes : ['prettyTableHeader','b-6'],
    });

    const number = create({
        type : 'th',
        text : 'Número tickets',
        classes : ['prettyTableHeader','b-2'],
    });

    const price = create({
        type : 'th',
        text : 'Euros',
        classes : ['prettyTableHeader','b-3'],
    });



    day.appendTo(headers.element);
    id.appendTo(headers.element);
    number.appendTo(headers.element);
    price.appendTo(headers.element);
    headers.appendTo(table.element);

    for (let i = 1; i <= max_day; i++) {
        const row = create({
            type : 'tr',
            classes : ['prettyTableRow','b-12','row' + i],
        });

        let classes = ['prettyTableData','day'];
        
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();
        

        if(+ monthDraft.month == month && + monthDraft.year == year && i == day){
            classes = ['prettyTableData','day','selected'];
        }

        const day_c = create({
            type : 'td',
            text : i,
            classes : classes,
            styles : {
                'word-wrap': 'break-word',
            }
        });

        let idString = "";

        for (const key in info[i].id) {
            idString += info[i].id[key] + ",";
        }

        const id_c = create({
            type : 'td',
            text : idString,
            classes : ['prettyTableData','b-2','id','justify'],
            styles : {
                'max-width' : '20px',
                'height': 'auto',
                'word-wrap': 'break-word',
                'text-align': 'justify'
            }
        });

        const number_c = create({
            type : 'td',
            classes : ['prettyTableData','b-4','number'],
            events : {
                input : () =>{
                    const input = document.querySelector(".row"+ i + " .number input");
                    input.value = Math.abs(input.value);
                    monthDraft.info[i].number = input.value;

                    changeIdSequence(monthDraft,0);
                } 
            }
        });

        const numberInput = create({
            type : 'input',
            options : {
                type : 'number',
                value : info[i].number,
                min: 0
            }, 
            styles : {
                width : '100%',
                height : '100%',
                border : 'none',
            }
        });
        numberInput.appendTo(number_c.element);

        let euros =  info[i].price;
        if(euros != '') euros += "€"; 

        const euros_c = create({
            type : 'td',
            classes : ['prettyTableData','b-4','price'],
        });

        const eurosInput = create({
            type : 'input',
            options : {
                type : 'number',
                value : info[i].number,
                min: 0
            }, 
            styles : {
                width : '100%',
                height : '100%',
                border : 'none'
            },
            events : {
                input : () =>{
                    const input = document.querySelector(".row"+ i + " .price input");
                    input.value = Math.abs(input.value);
                    monthDraft.info[i].price = input.value;

                    const total = document.querySelector("#total");
                    total.innerHTML = "Total : " + calculateTotal(monthDraft).toFixed(2) + "€"
                } 
            }
        });
        eurosInput.appendTo(euros_c.element);

        day_c.appendTo(row.element);
        id_c.appendTo(row.element);
        number_c.appendTo(row.element);
        euros_c.appendTo(row.element);
        row.appendTo(table.element);
    }

    return table;
}

/**
 * Change the id sequence
 */
const changeIdSequence = (draft,lastID) =>{

    let last = +lastID + 1 ;
    for (const day in draft.info) {
       const number = draft.info[day].number;
       const cell = document.querySelector(".row"+ +day + " .id");
       
       cell.innerHTML = "";
       let cellStr = "";

       for (let i = 0; i < number; i++) {
          cellStr += last + ", ";
           draft.info[day].id[i] = last;
           last++;
       }
       cell.innerHTML = cellStr.substr(0,cellStr.length-2);
    }
    draft.lastID = last-1;
    console.log(draft);
}

/**
 * Calculate price total
 * @param {*} draft  - The month ticket's draft
 * @returns Total price
 */
const calculateTotal = (draft) => {

    let total = 0;
    for (const day in draft.info) {
       total += +draft.info[day].price;
    }

    return total;
}