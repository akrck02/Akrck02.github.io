import { PATHS } from "../../../config/config.js";
import { UIComponent } from "../../../lib/gtd/web/uicomponent.js";
import { PROJECT_INFO } from "../../../services/projects.js";

export class ProjectCard {

    private project: { name: string, description: string, image: string, link: string, id: string };
    private component : UIComponent;

    constructor( name: string, description: string, image: string, link: string, id: string ) {
        this.project = {
            name: name,
            description: description,
            image: image,
            link: link,
            id: id
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
            },
            data : {
                id : this.project.id
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

        if(PROJECT_INFO[id]) {

            const langs = PROJECT_INFO[id];
            const langBar = new UIComponent({
                type : "div",
                styles : {
                    width : "100%",
                    height : "20px",
                    fontSize : ".6em",  
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign : "left",
                    color : "#202020",
                    marginTop : "10px",
                },
            });

            const length = langs.length < 2 ? langs.length : 2;
            for(let i = 0; i < length; i++) {
                const lang = langs[i];
                const langComp = new UIComponent({
                    type : "div",
                    styles : {
                        height : "25px",
                        width: "auto",
                        fontSize : ".75em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign : "left",
                        color : "#fff",
                        padding : "5px 9px",
                        background : lang.color,
                        borderRadius: "100px",
                        fontWeight : "bold",
                        letterSpacing: "2px",
                        marginRight : "3%",
                    },
                    text : lang.name
                });
                langComp.appendTo(langBar);
            }            
            langBar.appendTo(this.component);
        }
    }

    appendTo(parent: UIComponent) {
        this.component.appendTo(parent);
    }

    show() {        
        this.component.element.style.opacity = "1";
        this.component.element.style.boxShadow = "0px 4px 4px rgba(0,0,0,.15)";
    }
}