import { create, removeAll, setEvents } from "../lib/GTD_Component.js";
import { isEmpty, orElse } from "../lib/GTD_DataTools.js";
import { EXPAND } from "../lib/GTD_MaterialIcons.js";

const getMatchingOptions = (list,text) => {
    let options = []

    list.forEach(opt => {
        if(opt.key.toUpperCase().indexOf(text.toUpperCase()) != -1)
            options.push(opt);
    });

    return options;
}

export const materialSelect = (properties) => {
  properties = check(properties);
  console.log(properties);

  const comp = create({
    type: "materialSelect",
    classes: ["box-y-center"],
    styles: {
      width: orElse(properties.width, "200px"),
      "border-bottom": "1px solid var(--border-color)",
      padding: "5px",
      margin: "15px",
      height: "40px",
      color: "var(--color)",
    },
  });

  const search = create({
    type: "input",
    classes: ["box-center", "box-column"],
    options: {
      placeholder: properties.placeholder,
    },
    styles: {
      border: "none",
      background: "transparent",
      width: "100%",
      color: "var(--color)",
    },
  });

  const icon = create({
    type: "icon",
    classes: ["box-center"],
    text: EXPAND({
      fill: "var(--color)",
      size: "20px",
    }),
  });

  comp.element.onclick = () => {
    icon.element.style.transform = "rotate(180deg)";
  };

  search.element.oninput = () => {
    const value = search.element.value;
    let options = [];
    removeAll(".inputHandler");
    options = getMatchingOptions(properties.options,value);

    if(options.length != 0)
        createHandler(comp.element,options);
  };

  search.element.onfocus = () => {
    comp.element.classList.add("focus");
    let options = properties.options;

    if(search.element.value != "")
        options = getMatchingOptions(properties.options,search.element.value);

    createHandler(comp.element, options);
  };
  
  search.element.addEventListener("focusout", () => {
    const handler = document.querySelector("materialselecthandler");
    if (!handler.dataset.selected) {
      removeAll(".inputHandler");
      comp.element.classList.remove("focus");
    }
    comp.element.classList.remove("focus");

  });

  search.appendTo(comp.element);
  icon.appendTo(comp.element);

  return comp;
};

/**
 * Check th properties to fill compulsory data
 * @param {*} properties
 */
const check = (properties) => {
  if (isEmpty(properties)) properties = {};

  if (properties.options == undefined)
    properties.options = [
      {
        key: "No hay opciones disponibles",
        value: false,
      },
    ];

  if (properties.icon == undefined) properties.icon = "";

  if (properties.placeholder == undefined)
    properties.placeholder = "Seleccione una opción";

  return properties;
};

/**
 * Creates handler
 * @param {*} options
 */
const createHandler = (parent, options) => {
  removeAll(".inputHandler");
  const rect = parent.getBoundingClientRect();
  const comp = create({
    type: "materialselecthandler",
    classes: ["box-column", "no_copy", "inputHandler"],
    styles: {
      position: "fixed",
      width: "150px",
      maxHeight: "150px",
      top: rect.bottom + 10 + "px",
      right: rect.right - 120 + "px",
      padding: "10px",
      background: "#fff",
      borderRadius: "8px",
      color: "#c5c5c5",
      boxShadow: "0px 1px 4px rgba(0,0,0,.1)",
      overflow: "auto",
    },
    data: {
      selected: true,
    },
  });

  options.forEach((option) => {
    const optionEl = create({
      type: "optionbox",
      text: option.key,
      id: "opt" + option.value,
      classes: ["accent_hover"],
      styles: {
        padding: "7px",
        fontSize: ".9em",
        cursor: "pointer",
      },
      data: {
        value: option.value,
      },
    });

    setEvents(optionEl.element, {
      click: () => {
        removeAll(".inputHandler");
        
        const input = parent.querySelector("input");
        if(option.value) input.value = option.key;
        input.dataset.value = option.value;
        parent.classList.remove("focus");
      },
    });
        comp.appendChild(optionEl.element);
  });

  comp.appendTo(document.body);
};
