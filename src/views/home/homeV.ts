import { CONFIG, PATHS, VIEWS } from "../../config/config.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { isShortDevice, isSmallDevice } from "../../lib/gtd/web/responsivetools.js";
import { CLASS } from "../../core/css.js";
import IconButton from "../../components/iconButton.js";
import { CODE } from "../../lib/gtd/material/materialicons.js";

export default function show(): void {
    let title = CONFIG.APP_NAME;
    document.title = title;

    const view = new UIComponent({
        classes: [CLASS.BOX_COLUMN, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
        type: "div",
        styles: {
            width: "100%",
            height: "100%",
            background: "URL('" + PATHS.IMAGES + "Wallpaper.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
    });

    const logo = new UIComponent({
        type: "img",
        attributes: {
            src: PATHS.IMAGES + "logo.svg",
            alt: "Logo",
        },
        styles: { 
            maxHeight: isShortDevice() ? "35vh" : "50vh",
        },
    });

    const mainTitle = new UIComponent({
        
            type: "h1",
            text: "Akrck02",
            classes: [CLASS.H1, CLASS.CENTER_TEXT],
            styles: {
              fontFamily: "Caesar dressing",
              fontWeight: "400",
              padding: "10px",
              fontSize: "3em",
              margin: "0 3px",
              color: '#fff'
            },
        
    });

    const buttonBar = new UIComponent({
        classes: [CLASS.BOX_ROW, CLASS.BOX_X_CENTER, CLASS.BOX_Y_CENTER],
    });


    const codeButton = new IconButton({
        icon: CODE({
          size: isSmallDevice() || isShortDevice() ? 28 : 40,
          fill: "#fff",
        }),
        title : "Code",
        color: "#fff",
        accent : "#fff",
        index : 1,
        events: {
          click : () => location.href = VIEWS.CODE
        }
      }).get();

    //codeButton.appendTo(buttonBar);

    logo.appendTo(view);
    mainTitle.appendTo(view);
    buttonBar.appendTo(view);
    view.appendTo(document.body);
}
