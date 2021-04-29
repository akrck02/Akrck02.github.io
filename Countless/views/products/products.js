import { bar } from "../../components/bar.js";
import { create } from "../../lib/GTD_Component.js";
import { SHIPPING , SHOPPING_KART } from "../../lib/GTD_MaterialIcons.js";
import { getProductsService } from "../../services/productService.js";

export const productView = (params) => {    
  
    const web_tittle = "Countless - Productos";
    window.title = web_tittle;
    document.title = web_tittle;
  
    const view = create({
      type: "view",
      classes: ["main", "box-column","no_copy"],
      styles: {
        height: "100vh",
        width: "100vw",
      },
    });

    const content = create({
      type: "boz",
      classes: ["main", "box-row"],
      styles: {
        height: "100%",
        width: "100%",
      },
    });
  
    const titleBar = bar({
      title : "Productos"
    });
    const menu = createMenu();

    menu.appendTo(content.element);

    titleBar.appendTo(view.element);
    content.appendTo(view.element);

    view.appendTo(document.body);
}

const createMenu = () => {
  const menu = create({
    type : 'box',
    classes : ['box-column'],
    styles : {
      height: '100%',
      width : "300px",
      "border-right" : "1px solid #e9e9e9"
    }
  });

  const stockOption = create({
    type: 'productMenuItem',
    classes: ['box-y-center','box-row','selected'],
    styles: {
      width : '100%',
      padding : '10px',
      height: '50px',
      'border-bottom': '1px solid #e9e9e9'
    }
  });

  
  stockOption.element.onclick = () => {
    const items = document.querySelectorAll("productMenuItem");
    items.forEach(p => p.classList.remove("selected"));
    stockOption.element.classList.add("selected");
  }


  const stockTitle = create({
    text : "En stock",
    styles: {
      'font-family' : 'Roboto',
      'font-size' : '1.05em',
      'margin-left' : '.5em',
      color: "#404040",
    }
  });

  const stockIcon = create({
    classes : ['box-center'],
    text : SHIPPING({
      fill: "#404040",
      size: "17px"
    })
  });

  const noStockOption = create({
    type: 'productMenuItem',
    classes: ['box-y-center','box-row'],
    styles: {
      width : '100%',
      padding : '10px',
      height: '50px',
      'border-bottom': '1px solid #e9e9e9'
    }
  });

  noStockOption.element.onclick = () => {
    const items = document.querySelectorAll("productMenuItem");
    items.forEach(p => p.classList.remove("selected"));
    noStockOption.element.classList.add("selected");
  }

  const noStockTitle = create({
    text : "Fuera de stock",
    styles: {
      'font-family' : 'Roboto',
      'font-size' : '1.05em',
      'margin-left' : '.5em',
      color: "#404040",
    }
  });

  const noStockIcon = create({
    classes : ['box-center'],
    text : SHOPPING_KART({
      fill: "#404040",
      size: "17px"
    })
  });


  stockIcon.appendTo(stockOption.element);
  stockTitle.appendTo(stockOption.element);
  stockOption.appendTo(menu.element);

  noStockIcon.appendTo(noStockOption.element);
  noStockTitle.appendTo(noStockOption.element);
  noStockOption.appendTo(menu.element);


  return menu;

}