import { create } from "./lib/GTD_Component"


export const start = (params) => {
  const view = create({
    text: "nightlight Studios",
  });

  view.appendTo(document.body);
}