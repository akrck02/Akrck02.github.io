
//MAKE A NEW COMPONENT
export function create(properties){
    if(properties == undefined) properties = {};
    properties.element  =  document.createElement('div');

    //inner functions
    properties.appendChild = (e) => properties.element.appendChild(e);
    properties.appendTo =  (e) => e.appendChild(properties.element);
    properties.clean = () => properties.element.innerHTML = '';

    //check properties
    if(properties.type)   
        properties.element = document.createElement(properties.type);

    if(properties.id)   
        properties.element.id = properties.id;

    if(properties.text)
        properties.element.innerHTML = properties.text;

    //set properties to th element
    setOptions(properties.element , properties.options);
    setDataset(properties.element , properties.dataset);
    setDataset(properties.element , properties.data);
    setEvents(properties.element , properties.events);
    setStyles(properties.element , properties.styles)
    setClasses(properties.element , properties.classes);
   
    return properties;
} 

/**
 * Set attributes to a DOM element
 * @param {*} element 
 * @param {*} options 
 */
export const setOptions = (element,options) => {
    if(options) 
        for (const key in options)  
            element.setAttribute(key,options[key]);
}

/**
 * Set dataset to a DOM element
 * @param {*} element 
 * @param {*} dataset 
 */
export const setDataset = (element,dataset) => {
    if(dataset) 
        for (const key in dataset) 
            element.dataset[key] = dataset[key];
}

/**
 * Set events to a DOM element
 * @param {*} element 
 * @param {*} events 
 */
export const setEvents = (element , events) =>{
    if(events) 
        for (const key in events)  
            element.addEventListener(key , events[key]);
}

/**
 * Set styles to a DOM element
 * @param {*} element 
 * @param {*} styles 
 */
export const setStyles = (element , styles) => {
    if(styles) 
        for (const key in styles)  
            element.style[key] = styles[key];  
}

/**
 * Set classes to a DOM element
 * @param {*} element 
 * @param {*} classes 
 */
export const setClasses = (element , classes) => {
    if(classes) 
        classes.forEach(cl => element.classList.add(cl));
}

/**
 * Remove the NODE matching the selector
 * @param {*} selector 
 */
export const remove = (selector) => {
    const comp = document.querySelector(selector);
    if(comp != null)
        comp.parentNode.removeChild(comp);
}

/**
 * Remove all the NODEs matching the selector
 * @param {*} selector 
 */
export const removeAll = (selector) => {
    const comps = document.querySelectorAll(selector);
    if(comps != null)
        comps.forEach(comp => comp.parentNode.removeChild(comp));
}


export const forAll = (selector,funct) => {
    const comps = document.querySelectorAll(selector);
    if(comps != null)
        comps.forEach(comp => funct(comp));
}