import { BubbleUI } from "../lib/bubble.js";
import { uiComponent } from "../lib/dom.js";
import { Html } from "../lib/html.js";
import { getIcon } from "../lib/icons.js";
import { IconBundle, MaterialIcons } from "../model/configurations/icons.js";
import { getWebUrl } from "../service/path.service.js";
import { setOpaqueBackground } from "../service/ui.service.js";

/** papiro, the wiki library, kept in resources/lib/papiro */
const PAPIRO = "resources/lib/papiro";

/** the opinions folder, indexed by papiro-indexer when deploying */
const OPINIONS = "resources/opinions";

/**
 * Opinions: markdown pages shown with papiro. Its pages live under
 * #/opinions/wiki/…, so they can be shared and the back button works.
 */
export async function showOpinionsView(parameters: string[], container: HTMLElement) {
  setOpaqueBackground();
  loadPapiroStyles();

  const view = uiComponent({
    type: Html.View,
    id: "opinions",
    classes: [BubbleUI.BoxColumn]
  });

  const header = uiComponent({
    id: "opinions-header",
    classes: [BubbleUI.BoxRow, BubbleUI.BoxYCenter]
  });

  const homeButton = uiComponent({
    type: Html.Button,
    id: "home-button",
    classes: [BubbleUI.BoxCenter]
  });
  homeButton.innerHTML = getIcon(IconBundle.Material, MaterialIcons.Home, "24px", "#ffffff").outerHTML;
  homeButton.onclick = () => (location.href = getWebUrl("#/"));
  header.appendChild(homeButton);

  header.appendChild(uiComponent({ type: Html.H1, text: "Opinions" }));
  view.appendChild(header);

  const wiki = uiComponent({ id: "opinions-wiki" });
  view.appendChild(wiki);
  container.appendChild(view);

  // loaded at runtime, typed with the declarations kept next to it
  const papiro: typeof import("../../resources/lib/papiro/papiro.js") = await import(`${getWebUrl(PAPIRO)}/papiro.js`);
  const { createPapiro } = papiro;
  await createPapiro(wiki, {
    source: OPINIONS,
    title: "Opinions",
    hashPrefix: "opinions",
    graph: true,
    footer: false
  });
}

/** papiro's styles, only once and only when the section is opened */
function loadPapiroStyles() {
  if (null != document.getElementById("papiro-styles")) return;
  const link = document.createElement("link");
  link.id = "papiro-styles";
  link.rel = "stylesheet";
  link.href = getWebUrl(`${PAPIRO}/papiro.css`);
  document.head.appendChild(link);
}
