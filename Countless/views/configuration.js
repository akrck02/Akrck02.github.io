import { bar } from "../components/bar.js";
import { settings } from "../config/settings.js";
import { destroy } from "../config/userSettings.js";
import { create } from "../lib/component.js";

/**
 * Show the calendar view
 * @param {array} params
 */
 export const configurationView = (params) => {

    const web_tittle = "Countless - Configuration";
    window.title = web_tittle;
    document.title = web_tittle;
 

    const view = create({
        type: "view",
        classes: ["main", "box-column"],
        styles: {
          height: "100vh",
          width: "100vw",
        },
      });
    
      const titleBar = bar("Configuration");

      const exit = create({
          type: 'exitbutton',
          classes : ['box-y-center'] ,
          styles : {
              padding : '10px',
              width : '100px',
              cursor: 'pointer'
          },
          events : {
              click : () => destroy()
          }
      });

      const exitIcon = create({
          type : 'img',
          options : {
            src : settings().ICONS + "logout.svg"
          }
      });

      const exitMsg = create({
        type : 'msg',
        text : 'Salir',
        styles : {
            padding: '5px'
        }
    });

      exitIcon.appendTo(exit.element);
      exitMsg.appendTo(exit.element);

      titleBar.appendTo(view.element);
      exit.appendTo(view.element);
      view.appendTo(document.body);
}