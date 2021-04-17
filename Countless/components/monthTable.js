import { lastday } from "../core/monthCalc.js";
import { create } from "../lib/component.js"

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
    });

    const id = create({
        type : 'th',
        text : 'Id',
        classes : ['prettyTableHeader','b-2'],
    });

    const number = create({
        type : 'th',
        text : 'Número tickets',
        classes : ['prettyTableHeader','b-6'],
    });

    const price = create({
        type : 'th',
        text : 'Euros',
        classes : ['prettyTableHeader','b-4'],
    });



    day.appendTo(headers.element);
    id.appendTo(headers.element);
    number.appendTo(headers.element);
    price.appendTo(headers.element);
    headers.appendTo(table.element);

    for (let i = 1; i <= max_day; i++) {
        const row = create({
            type : 'tr',
            classes : ['prettyTableRow','b-12'],
        });

        const day_c = create({
            type : 'td',
            text : i,
            classes : ['prettyTableData','b-2'],
        });

        const id_c = create({
            type : 'td',
            text : info[i].id,
            classes : ['prettyTableData','b-2'],
        });

        const number_c = create({
            type : 'td',
            classes : ['prettyTableData','b-4'],
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
                border : 'none'
            }
        });
        numberInput.appendTo(number_c.element);

        let euros =  info[i].price;
        if(euros != '') euros += "€"; 

        const euros_c = create({
            type : 'td',
            classes : ['prettyTableData','b-4'],
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