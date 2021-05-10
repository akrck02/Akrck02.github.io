import { create, forAll, removeAll } from "../lib/GTD_Component.js";
import { isEmpty, orElse } from "../lib/GTD_DataTools.js";

export const MATERIAL_HANDLERS = {
  HOUR: "HOUR",
};

/**
 * Creates a material input
 * @param {*} properties
 * @returns
 */
export const materialInput = (properties) => {
  const comp = create({
    type: "MaterialInput",
    classes: ["box-y-start", "box-column"],
    id: orElse("input"+properties.id, "NoId"),
    styles: {
      width: orElse(properties.width, "150px"),
    },
  });

  const title = create({
    type: "text",
    text: orElse(properties.title, "Titulo"),
    classes: ["input" + orElse(properties.id, "NoId")],
  });

  const events = {};
  const inputRow = create({
    type: "box",
    classes: ["box-row"],
  });

  const input = create({
    type: "input",
    options: {
      placeholder: orElse(properties.placeholder, ""),
      type: orElse(properties.type, "text"),
      value : properties.default ? properties.default : ""
    },
    events: events,
  });

  const icon = create({
    type: "icon",
    text: orElse(properties.svg, ""),
    classes: ["box-row", "box-center"],
  });

  if (isEmpty(properties.handler))
    properties.handler = {};

  if(properties.handler.handle == undefined)
  properties.handler.handle = () => {};

  if(properties.handler.destroy == undefined)
  properties.handler.destroy = () => {};

  if(properties.handler.focusing == undefined)
  properties.handler.focusing = () => { return false;};

  if(properties.handler.validate == undefined)
  properties.handler.validate = () => {};

  input.element.addEventListener("focusout", (e) => {
      if (input.element.value != "") comp.element.classList.add("filled");
      else if (comp.element.classList.contains("filled"))
        comp.element.classList.remove("filled");  
  });

  input.element.addEventListener("focusin", (e) => {
   forAll("materialInput",(handler) => {
    if (handler.classList.contains("focus"))
      handler.classList.remove("focus");
   })
    removeAll(".inputHandler");
    properties.handler.handle(input.element);
    comp.element.classList.add("focus");
  });

  if (isEmpty(properties.condition))
    properties.condition = (value) => {
      return true;
    };
  if (isEmpty(properties.error)) properties.error = (value) => {};
  if (isEmpty(properties.success)) properties.success = (value) => {};

  input.element.oninput = () => {
    properties.handler.validate(input.element);
    if (properties.condition(input.element.value)) {
      if (comp.element.classList.contains("error"))
        comp.element.classList.remove("error");

      properties.success(input.element.value);
    } else {
      comp.element.classList.add("error");
      properties.error(input.element.value);
    }
  };

  input.appendTo(inputRow.element);
  icon.appendTo(inputRow.element);

  title.appendTo(comp.element);
  inputRow.appendTo(comp.element);

  //functions
  comp.getInput = () => input.element;
  comp.getValue = () => input.element.value;
  comp.clear = () => input.element.value = '';

  return comp;
};

