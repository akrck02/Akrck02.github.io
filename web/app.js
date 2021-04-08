
import * as router from "./js/config/router.js";

window.onhashchange = router.load;
window.onload = router.load;
