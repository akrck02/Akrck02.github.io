
//MAKE A NEW COMPONENT
export function create(properties){
    if(properties == undefined) properties = {};
    properties.element  =  document.createElement('div');
    properties.appendTo =  (e) => e.appendChild(properties.element);

    if(properties.type != undefined)    properties.element           = document.createElement(properties.type);
    if(properties.id   != undefined)    properties.element.id        = properties.id;
    if(properties.text != undefined)    properties.element.innerHTML = properties.text;

    if(properties.options    != undefined) 
        for (const key in properties.options)  
            properties.element.setAttribute(key,properties.options[key]);

    if(properties.dataset    != undefined) 
        for (const key in properties.dataset) 
            properties.element.dataset[key] = properties.dataset[key];

    if(properties.events     != undefined) 
        for (const key in properties.events)  
            properties.element.addEventListener(key,properties.events[key]);

    if(properties.styles != undefined) 
        for (const key in properties.styles)  
            properties.element.style.setProperty(key,properties.styles[key]);  

    if(properties.classes != undefined) 
        properties.classes.forEach(cl => properties.element.classList.add(cl));
   
    if(properties.data != undefined) 
    for (const key in properties.data)  
        properties.element.dataset[key] = properties.data[key];

    properties.clean = function(){properties.element.innerHTML = '';};

    return properties;
} 

export function set_parameter(element,variable,value){
    element.style.setProperty("--"+variable,value);
}
