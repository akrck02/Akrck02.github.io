import * as home      from './lss/home.js'; 
import * as compiler  from './lss/compiler.js'; 
import * as not_found from '../views/not_found.js'; 

export const PATHS = {
  home:       {show: (params) => show(home,params)},
  compiler:   {show: (params) => show(compiler,params)},
  not_found:  {show: (params) => show(not_found,params)},
};

export const load = (params) => {
  
  document.body.innerHTML = '';
  document.body.className = '';

  switch (params[0]) {
      case undefined:  
      case "":          PATHS.home.show([]);                  break;
      case "compiler":  PATHS.compiler.show(params.slice(1)); break;
      default:          console.log("others");  break;
  }
}


function show(view,params){
  document.title = view.title;
  window.title = view.title;
  view.show(params);
}