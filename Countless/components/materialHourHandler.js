import { create, removeAll } from "../lib/GTD_Component.js";
import { CLOSE, EXPAND, EXPAND_LESS } from "../lib/GTD_MaterialIcons.js";

/**
 * Creates a maerial hour chooser
 * @param {*} properties
 */
 export const materialHourChooser = (properties) => {
    const comp = create({
      type: "hourChooser",
      classes: ["inputHandler","box-column","no_copy"],
      styles: {
        opacity: 0,
        padding: "10px",
        'margin-bottom': "30px",
        position: "fixed",
        transition: "1s",
        height: "100px",
        width: "150px",
        background: "#fff",
        "border-radius": "3px",
        "box-shadow": "0px 1px 4px rgba(0,0,0,.1)",
        "font-size": "1em",
        "font-family": "Roboto light",
        color: "#c5c5c5",
      },
      data: {
          focus : false
      },
    });
  
    comp.element.onclick = (e) => {
      if(!comp.element.dataset.focus)
          comp.element.dataset.focus = true;
    }



    const rowOne = row1();
    const rowTwo = row2(properties);
    const rowThree = row3();
    
    const close = create({
        type : 'close',
        classes : ['box-y-center','box-x-end'],
        text  : CLOSE({
          fill: "#C5C5C5",
          size: "15px",
        }),
        events :  {
            click : () => removeAll(".inputHandler")
        }
    });

    close.appendTo(comp.element);
    rowOne.appendTo(comp.element);
    rowTwo.appendTo(comp.element);
    rowThree.appendTo(comp.element);
  
    comp.validate = (input) => {
      let pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!pattern.test(input.value)) input.value = "00:00";
    }

    comp.handle = (input) => {
      let rect = input.getBoundingClientRect();
      comp.element.style.top = rect.bottom + 20 + "px";
      comp.element.style.left = rect.left + 10 + "px";
  
      let pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (input.value == "" || !pattern.test(input.value)) input.value = "00:00";

        const minUp = rowOne.element.querySelector("minutesUp");
        minUp.onclick = () =>{
            let hours = +input.value.split(':')[0];
            let mins = +input.value.split(':')[1];

            mins++;
            if(mins > 59) mins = 0;
            if(hours < 9)
                hours = "0" + hours;

            if(mins < 10)
                mins = "0" + mins;

            input.value =  hours + ":" + mins;
            document.querySelector(".hours").value = hours;
            document.querySelector(".minutes").value = mins;
        };

        const hourUp = rowOne.element.querySelector("hoursUp");
        hourUp.onclick = () =>{
            let hours = +input.value.split(':')[0];
            let mins = +input.value.split(':')[1];

            hours++;
            if(hours > 23) hours = 0;
            if(hours < 9)
                hours = "0" + hours;

            if(mins < 10)
                mins = "0" + mins;

            input.value =  hours + ":" + mins;
            document.querySelector(".hours").value = hours;
            document.querySelector(".minutes").value = mins;
        };

        const minDown = rowThree.element.querySelector("minutesDown");
        minDown.onclick = () =>{
            let hours = +input.value.split(':')[0];
            let mins = +input.value.split(':')[1];

            mins--;
            if(mins < 0) mins = 59;
            if(hours < 9)
                hours = "0" + hours;

            if(mins < 10)
                mins = "0" + mins;

            input.value =  hours + ":" + mins;
            document.querySelector(".hours").value = hours;
            document.querySelector(".minutes").value = mins;
        };

        const hourDown = rowThree.element.querySelector("hoursDown");
        hourDown.onclick = () =>{
            let hours = +input.value.split(':')[0];
            let mins = +input.value.split(':')[1];

            hours--;
            if(hours < 0) hours = 23;
            if(hours < 9)
                hours = "0" + hours;

            if(mins < 10)
                mins = "0" + mins;

            input.value =  hours + ":" + mins;
            document.querySelector(".hours").value = hours;
            document.querySelector(".minutes").value = mins;
        };
  
      comp.appendTo(document.body);
      setTimeout(() => comp.element.style.opacity = 1, 100);
    };

    comp.destroy = (comp) => document.body.removeChild(comp.element);
    comp.focusing = () =>{return comp.element.dataset.focus;}
  
    return comp;
  };
  
  const row1 = () => {
        
    const row = create({
        type: "row",
        classes: ["box-row", "box-y-center", "box-x-between"],
        styles: {
          height: "33%",
        },
      });
    
      const hoursUp = create({
        type: "hoursUp",
        classes: ["box-center", "b-4"],
        text: EXPAND_LESS({
          fill: "#c5c5c5",
          size: "20px",
        }),
        styles: {
          cursor: "pointer",
        },
      });
    
      const minutesUp = create({
        type: "minutesUp",
        classes: ["box-center", "b-4"],
        text: EXPAND_LESS({
          fill: "#c5c5c5",
          size: "20px",
        }),
        styles: {
          cursor: "pointer",
        },
      });

      hoursUp.appendTo(row.element);
      minutesUp.appendTo(row.element);
    
      return row;
  }

  const row2 = (properties) => {

    const row = create({
        type: "row",
        classes: ["box-row", "box-y-center"],
        styles: {
          height: "33%",
        },
      });
    
      const hours = create({
        type: "input",
        options: {
          value : '00'
        },
        styles :{
          border: 'none',
          color: 'var(--color)',

        },
        classes: ["hours","box-center","center_text", "b-4"],
      });
    
      const separator = create({
        type: "separator",
        text: " : ",
        classes: ["box-center", "b-4"],
      });
    
      const minutes = create({
        type: "input",
        options: {
          value : '00'
        },
        classes: ["minutes","box-center","center_text", "b-4"],
        styles :{
          border: 'none',
          color: 'var(--color)'
        }
      });
  
      const update = () =>{
        const input = document.querySelector("#input" + properties.id);        
        if(input != null){
          let h = +hours.element.value;
          let m = +minutes.element.value;

          
          if(m < 10) m = "0" + (+m);
          if(h < 10) h = "0" + (+h);

          if(h > 23)  h = 23
          if(h < 0)   h = "00"
          if(m > 59)  m = 59
          if(m < 0)   m = "00"

          hours.element.value = h;
          minutes.element.value = m;
          input.querySelector("input").value = h + ":" + m;
        }
      }

      minutes.element.oninput = update;
      hours.element.oninput = update;

      hours.appendTo(row.element);
      separator.appendTo(row.element);
      minutes.appendTo(row.element);

      return row;
  }

  const row3 = () => {
  
    const row = create({
        type: "row",
        classes: ["box-row", "box-y-center", "box-x-between"],
        styles: {
          height: "33%",
        },
      });
    
      const hoursDown = create({
        type: "hoursDown",
        classes: ["box-center", "b-4"],
        text: EXPAND({
          fill: "#c5c5c5",
          size: "20px",
        }),
        styles: {
          cursor: "pointer",
        },
      });
    
      const minutesDown = create({
        type: "minutesDown",
        classes: ["box-center", "b-4"],
        text: EXPAND({
          fill: "#c5c5c5",
          size: "20px",
        }),
        styles: {
          cursor: "pointer",
        },
      });

      hoursDown.appendTo(row.element);
      minutesDown.appendTo(row.element);

      return row;
  }