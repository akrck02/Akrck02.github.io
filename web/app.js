
import * as router from "./js/config/router.js";

window.onhashchange = router.load;
window.onload = router.load;

events();


async function events() {
    await new Promise(() => {
      let d = new Date();
      let h = d.getHours();

      if(h > 20 || h < 7) document.documentElement.dataset.theme = 'dark';
      else document.documentElement.dataset.theme = 'light';
   }).then(setTimeout(events, 150));
}
