import { create } from "../../../lib/GTD_Component.js";

export const mobileEventPanel = () => {
  const panel = create({
    type: "panel",
    styles: {
      width: "100%",
      height: "100%",
      transition: "1s",
      opacity: 0,
    },
  });


  

  return panel;
};
