import { create } from "../../lib/GTD_Component.js";
import { isEmpty } from "../../lib/GTD_DataTools.js";
import { CLOCK, EDIT, EVENTS, EXPAND, INFO, LOCATION, NO_LOCATION } from "../../lib/GTD_MaterialIcons.js";
import { isSmallDevice } from "../../lib/GTD_ResponsiveTools.js";

export const eventBreakout = (data) => {
  const fontColor = isSmallDevice() ? "#404040" : "#c5c5c5" ;
  const fontWeight = isSmallDevice() ? 600 : 100 ;

    const event = create({
        type: "event",
        classes: ["box-y-center", "box-column"],
        styles: {
          "min-height": "50px",
          "border-bottom": "1px solid #e9e9e9",
        },
        data : {
          closed : true
        },
        id: "event" + data.id,
      });
  
      const eventTitlebar = create({
        type: "eventtitlebar",
        classes: [
          "box-y-center",
          "box-x-between",
          "eventBreakout",
        ],
        styles: {
          padding: "10px",
          width: "100%",
          "margin-bottom": "-0px",
          "min-height": "50px",
          "border-left": "1px solid #e9e9e9",
          cursor: "pointer",
   
        },
        events: {
          click: () => {
            const eventComponent = document.querySelector("#event" + data.id);
            hideAll();
            if(eventComponent.dataset.closed){
              open(eventComponent, data);
              eventComponent.dataset.closed = "true"
            }
             
          },
        },
      });
  
      const title = create({
        type: "eventtitle",
        text: data.title,
        classes: ["box-y-center"],
        styles: {
          "font-size": isSmallDevice() ? "1.1em" : ".9em",
          "font-family": "Roboto light",
          "padding-left": "5px",
          fontWeight: fontWeight
        },
        data : {
          selected : false
        }
      });
  
      const expand = create({
        id: 'expand',
        text : EXPAND({
          size: '25px',
          fill: fontColor,
          classes : ['transitionNormal']
        })
      });
  
      title.appendTo(eventTitlebar.element);
      expand.appendTo(eventTitlebar.element);
      eventTitlebar.appendTo(event.element);
      return event;
}


/**
 * Fill a coponent
 * @param {*} parent
 */
 const open = (parent,data) => {
    const titleBar  = parent.querySelector("eventTitleBar");
    const fontColor = isSmallDevice() ? "#404040" : "#c5c5c5" ;

    if(titleBar.dataset.selected) 
      titleBar.classList.remove("selected");
    else 
        titleBar.classList.add("selected");

    titleBar.dataset.selected =! titleBar.dataset.selected;

    const infoComp = parent.querySelector("info");
    if (infoComp == null) {
      const info = create({
        type: "info",
        classes : ['box-column','transitionNormal'],
        styles: {
          'padding-left': '17px',
          width: '100%',
          overflow: 'hidden',
          height:'0px',
          opacity: 0,
        }
      });
  
      const row1 = create({
        type: 'row',
        classes : ['box-row','box-x-start','box-y-center'],
        styles : {
          'min-height' : '35px',
          width : '100%'
        }
      });
  
      const hour = create({
        type: 'text',
        text: data.hour,
        classes : ['box-center'],
        styles: {
          'padding-left': '5px',
          color : fontColor,
          'font-size' :isSmallDevice() ? '1em' : '.8em'
        }
      });
  
      const clockIcon = create({
       classes : ['box-center'],
       text : CLOCK({
          size: '20px',
          fill: fontColor
       })
      });
  
      const row2 = create({
        type: 'row',
        classes : ['box-row','box-x-start','box-y-center'],
        styles : {
          'min-height' : '35px',
          width : '100%'
        }
      });
  
      const description = create({
        type: 'text',
        text: data.content,
        classes : ['box-center'],
        styles: {
          'padding-left': '5px',
          color : fontColor,
          'font-size' :isSmallDevice() ? '1em' : '.8em'
        }
      });
  
  
      const descriptionIcon = create({
        classes : ['box-center'],
        text : INFO({
           size: '20px',
           fill: fontColor
        })
       });

       const row3 = create({
        type: 'row',
        classes : ['box-row','box-x-start','box-y-center'],
        styles : {
          'min-height' : '35px',
          width : '100%'
        }
      });
  
      let location = create({
        type : 'add',
        text : data.location ?  data.location : "Ubicación desconocida",
        classes : ['box-center'],
        styles : {
          'padding-left': '5px',
          color : fontColor,
          'font-size' :isSmallDevice() ? '1em' : '.8em',
          cursor : data.location ? 'pointer': ''
        },
        events : data.location ? 
        {
          click : () => {
            window.open("https://www.google.es/maps/search/" + data.location,'maps')
          }
        }
        :{}
      });

      const locationIcon = create({
        classes : ['box-center'],
        text : 
        data.location ?
        LOCATION({
           size: '20px',
           fill: fontColor
        })
        :
        NO_LOCATION({
          size: '20px',
          fill: fontColor
       })
      }); 

      
      const row4 = create({
        type: 'row',
        classes : ['box-row','box-x-start','box-y-center'],
        styles : {
          'min-height' : '35px',
          width : '100%'
        }
      });
      
      let edit = create({
        type : 'edit',
        text : "Editar evento",
        classes : ['box-center','accent_hover'],
        styles : {
          'padding-left': '5px',
          'font-size' :isSmallDevice() ? '1em' : '.8em',
          color: 'var(--accent_color)',
          cursor : 'pointer'
        },
        events : 
        {
          click : () => {
           
          }
        }
      });

      const editIcon = create({
        text : EDIT({
          size: '20px',
          fill: fontColor,
          classes : ['transitionNormal']
        })
      });
  
      clockIcon.appendTo(row1.element);
      hour.appendTo(row1.element);  
  
      descriptionIcon.appendTo(row2.element);
      description.appendTo(row2.element);
  
      locationIcon.appendTo(row3.element);
      location.appendTo(row3.element);

      editIcon.appendTo(row4.element)
      edit.appendTo(row4.element)

      row1.appendTo(info.element)
      row2.appendTo(info.element)
      row3.appendTo(info.element)
      row4.appendTo(info.element)
      info.appendTo(parent);
  
      setTimeout(() => {
        info.element.style.height = "150px";
        info.element.style.opacity = 1;
      }, 100);

    }
  };


  /**
   * Hide all the breakouts
   */
  const hideAll = () => {
    const events = document.querySelectorAll("event");
    events.forEach((event) => hide(event));
  } 

/**
 * Hide a event breakout
 * @param {*} comp 
 */
  const hide = (comp) => {
    
    const titleBar = comp.querySelector("eventtitlebar");
    titleBar.classList.remove("selected");
    
    const info = comp.querySelector("info");
    if(info){
      info.style.height = "0px";
      info.style.paddingTop = "0px";
      setTimeout(() => {
      try{
        if(!isEmpty(info)) comp.removeChild(info);
      }catch(err){};
      }, 500);
    }
  }