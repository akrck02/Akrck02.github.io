import { bar } from "../components/bar";
import { create } from "../lib/component";

export const reservationView = (params) => {

    const web_tittle = "Countless - Reservas";
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
  
    const titleBar = bar("Reservas");

    const tit = create({
      type : 'p',
      text : 'Últimas resevas: ',
      styles : {
        
      }
    });

    titleBar.appendTo(view.element);
    tit.appendTo(view.element);

    view.appendTo(document.body);
}