import * as home      from './home.js'; 
import * as app       from '../../../../../LSS_API/app/js/main.js'; 
import * as not_found from '../not_found.js'; 

export const PATHS = {
  home:       {show: (params) => show(home,params)},
  app:        {show: (params) => app.droga(params)},
  not_found:  {show: (params) => show(not_found,params)},
};

export const load = (params) => {
  
  document.body.innerHTML = '';
  document.body.className = '';

  switch (params[0]) {
      case undefined:  
      case "":          PATHS.home.show([]);                  break;
      case "app":       PATHS.app.show(params.slice(1)); break;
      default:          console.log("others");  break;
  }
}


function show(view,params){
  document.title = view.title;
  window.title = view.title;
  view.show(params);

  const main = document.querySelector('.main');
  if(main != null){
    main.style.transition = '.75';
    main.style.opacity = '0';
  } 

  setTimeout(() =>{
    const main = document.querySelector('.main');
    if(main != null) main.style.opacity = '1';
}, 150);
}