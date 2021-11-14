import { PATHS } from "../../../config/config.js";
import { UIComponent } from "../../../lib/gtd/web/uicomponent.js";

export class ProjectCard {

    private project: { name: string, description: string, image: string, link: string };
    private component : UIComponent;

    constructor( name: string, description: string, image: string, link: string ) {
        this.project = {
            name: name,
            description: description,
            image: image,
            link: link
        }
        
        this.component = new UIComponent({
            type : "div",
            styles : {
                display : "flex",
                flexDirection: "column",
                width : "160px",
                height : "230px",
                maxHeight : "300px",
                alignItems: "center",
                transition: ".25s",
                opacity: "0",
                background: "#f1f1f1",
                padding: "15px",
                margin: "20px",
                borderRadius: "16px",
                transform: "scale(1)",
                cursor: "pointer",
            },
            events : {
                mouseover : () => {
                    this.component.element.style.transform = "scale(1.1)";
                },
                mouseout : () => {
                    this.component.element.style.transform = "scale(1)";
                }
            }
        });
        
        if(!image)
            image = PATHS.GITHUB_IMAGES + "unknown.png";
           
        let imageComp = new UIComponent({
            type : "img",
            styles : {
                width : "100%",
                height : "105px",
                maxHeight : "105px",
                objectFit: "cover",
                borderRadius: "16px",
                fontSize: "0",
            },
            attributes : {
                id: image,
                src : image,
                onerror:"this.src = '" + PATHS.GITHUB_IMAGES + "unknown.png'"
            }
        });       

        const titleComp = new UIComponent({
            type : "div",
            styles : {
                width : "100%",
                height : "40px",
                fontSize : "1em",
                padding: "10px 0",
                fontWeight : "bold",
                textAlign : "left",
                color : "#202020",
                transition: ".25s",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
            text : name
        });

        const descriptionComp = new UIComponent({
            type : "div",
            styles : {
                width : "100%",
                height : "50px",
                fontSize : ".7em",
                textAlign : "left",
                color : "#202020",
            },
            text : description
        });

        imageComp.appendTo(this.component);
        titleComp.appendTo(this.component);
        descriptionComp.appendTo(this.component);
    }

    appendTo(parent: UIComponent) {
        this.component.appendTo(parent);
    }

    show() {        
        this.component.element.style.opacity = "1";
        this.component.element.style.boxShadow = "0px 4px 4px rgba(0,0,0,.15)";
    }
}