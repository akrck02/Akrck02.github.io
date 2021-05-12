import { firstload, get_current_view, load } from "./config/router.js";

export function show(params){
  document.documentElement.style.background = 'var(--b2)';
  events();
  firstload(params);
};
window.onhashchange = load;

let mobile = false;

async function events() {
      await new Promise(() => {
        //possible events
        check_mobile();

        document.documentElement.dataset.theme = 'light';
     }).then(setTimeout(events, 150));
}

const check_mobile = () => {
  let main = document.querySelector('.main');
  if(main!= null) {
    main.style.opacity = 1;
    if(window.innerWidth < 700 && mobile != true){
      main.style.opacity = 0;

      mobile = true;
      document.body.dataset.mobile = true;
      load([get_current_view().name].concat(get_current_view().params));
      
    } 
    if(window.innerWidth >= 700 && mobile != false){
      main.style.opacity = 0;
      mobile = false;
      document.body.dataset.mobile = false;
      load([get_current_view().name].concat(get_current_view().params));
      
    }
  }        
}