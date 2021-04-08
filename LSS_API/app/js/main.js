import { current_view, firstload, load } from "./config/router.js";
import { create } from "./lib/component.js";

export function show(params){
  console.log("loaded");
  document.documentElement.style.background = 'var(--b2)';
  events();
  firstload(params);
};
window.onhashchange = load;
//if(location.hash.slice(1) == "") location += "#/";

let mobile = false; 
async function events() {
      await new Promise(() => {
        let main = document.querySelector('.main');
        if(main!= null) {
          main.style.opacity = 1;
          loading_screen(false);

          if(window.innerWidth < 700 && mobile != true){
            main.style.opacity = 0;
            loading_screen(true);
            mobile = true;
            document.body.dataset.mobile = true;
            load([current_view.name]);
            
          } 
          if(window.innerWidth >= 700 && mobile != false){
            main.style.opacity = 0;
            loading_screen(true);
            mobile = false;
            document.body.dataset.mobile = false;
            load([current_view.name]);
          }

        }        
        let d = new Date();
        let h = d.getHours();

       // if(h > 20 || h < 7) document.documentElement.dataset.theme = 'dark';
        //else 
        document.documentElement.dataset.theme = 'light';
     }).then(setTimeout(events, 150));
}

function loading_screen(on){
  if(on){
    const loading = create({
      type: 'div',
      classes : ['loading','box-center', 'box-column'],
      styles : {
          width : '100%',
          height: '100vh',
          background: 'blue',
          opacity : 1,
          position : 'fixed',
          top: '0',
          left : '0'
      },
    });
    loading.appendTo(document.body);
  }else{
    const loading = document.querySelector('.loading');
    if(loading != null) document.body.removeChild(loading);
  }
}
