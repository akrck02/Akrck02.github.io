import { bar } from "../../components/bar.js";
import { create } from "../../lib/GTD_Component.js";

export const analiticsView = (params) => {
    const web_tittle = "Countless - Analisis";
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
  
    const titleBar = bar({
      title: "Análisis"
    });

    const tit = create({
      type : 'p',
      text : '',
      styles : {
        
      }
    });

    titleBar.appendTo(view.element);
    tit.appendTo(view.element);

    view.appendTo(document.body);

}