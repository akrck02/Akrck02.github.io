import { isEmpty } from "./GTD_DataTools.js";

/**
 * Create svg in 24 x 24 viewBox
 * @param {*} properties
 * @returns svg innerHTML
 */
export const createSVG = (properties) => {
  if (isEmpty(properties.classes)) properties.classes = [];

  if (isEmpty(properties.fill)) properties.fill = "#202020";

  const svg = `
    <svg class="${properties.classes.join(" ")}" width="${
    properties.size
  }" height="${properties.size}" viewBox="0 0 24 24" fill="${
    properties.fill
  }" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
  return svg;
};

export const BACK = (properties) => {
  properties.svg = `<path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="inherit"/>`;
  return createSVG(properties);
};

export const CLOCK = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  `;
  return createSVG(properties);
};

export const EXPAND = (properties) => {
  properties.svg = `<path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="inherit"/>`;
  return createSVG(properties);
};

export const EXPAND_LESS = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  `;
  return createSVG(properties);
};

export const SUMMATION = (properties) => {
  properties.svg = `
        <path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" fill="inherit"/>
        <path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" stroke="inherit"/>
    `;
  return createSVG(properties);
};

export const HELP = (properties) => {
  properties.svg = `
      <path d="M0 0h24v24H0V0z" fill="none" />
    	<path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    `;
  return createSVG(properties);
};

export const INFO = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0V0z" fill="none" />
  	<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
 `;
  return createSVG(properties);
};

export const LOGOUT = (properties) => {
  properties.svg = `<path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="inherit"/>`;
  return createSVG(properties);
};

export const NOTIFICATIONS = (properties) => {
  properties.svg = `<path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="inherit"/>`;
  return createSVG(properties);
};

export const SUPPORT = (properties) => {
  properties.svg = `
        <path d="M21 12.22C21 6.73 16.74 3 12 3C7.31 3 3 6.65 3 12.28C2.4 12.62 2 13.26 2 14V16C2 17.1 2.9 18 4 18H5V11.9C5 8.03 8.13 4.9 12 4.9C15.87 4.9 19 8.03 19 11.9V19H11V21H19C20.1 21 21 20.1 21 19V17.78C21.59 17.47 22 16.86 22 16.14V13.84C22 13.14 21.59 12.53 21 12.22Z" fill="inherit"/>
        <path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" fill="inherit"/>
        <path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="inherit"/>
        <path d="M18 11.03C17.52 8.18 15.04 6 12.05 6C9.02003 6 5.76003 8.51 6.02003 12.45C8.49003 11.44 10.35 9.24 10.88 6.56C12.19 9.19 14.88 11 18 11.03Z" fill="inherit"/>
    `;
  return createSVG(properties);
};

export const LOCATION = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
	  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  `;
  return createSVG(properties);
};

export const NO_EVENT = (properties) => {
  properties.svg = `
    <path d="M9.31 17l2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
`;
  return createSVG(properties);
};

export const EVENTS = (properties) => {
  properties.svg = `
  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
`;
  return createSVG(properties);
};


export const NO_LOCATION = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0zm11.75 11.47l-.11-.11z" fill="none" />
  	<path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z" />
`;
  return createSVG(properties);
};


export const CHECK_ALL = (properties) => {
  properties.svg = `
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
`;
  return createSVG(properties);
};

export const CHECK = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />`;
  return createSVG(properties);
};


export const EDIT = (properties) => {
  properties.svg = `
  <path d="M0 0h24v24H0z" fill="none" />
	<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  `;
  return createSVG(properties);
};


export const PLUS = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
	  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  `;
  return createSVG(properties);
};

export const MINUS = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
	  <path d="M19 13H5v-2h14v2z" />
  `;
  return createSVG(properties);
};

export const CLOSE = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
	  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  `;
  return createSVG(properties);
};

export const SAVE = (properties) => {
  properties.svg = `
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" /> 
  `;
  return createSVG(properties);
};


export const SHIPPING = (properties) => {
  properties.svg = ` 
  <path d="M0 0h24v24H0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
`;
  return createSVG(properties);
};

export const SHOPPING_KART = (properties) => {
  properties.svg = ` 
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
 `;
  return createSVG(properties);
};

export const QR_CODE = (properties) => {
  properties.svg = ` 
    <g><rect fill="none" height="24" width="24"/></g>
    <path d="M15,21h-2v-2h2V21z M13,14h-2v5h2V14z M21,12h-2v4h2V12z M19,10h-2v2h2V10z M7,12H5v2h2V12z M5,10H3v2h2V10z M12,5h2V3h-2V5 z M4.5,4.5v3h3v-3H4.5z M9,9H3V3h6V9z M4.5,16.5v3h3v-3H4.5z M9,21H3v-6h6V21z M16.5,4.5v3h3v-3H16.5z M21,9h-6V3h6V9z M19,19v-3 l-4,0v2h2v3h4v-2H19z M17,12l-4,0v2h4V12z M13,10H7v2h2v2h2v-2h2V10z M14,9V7h-2V5h-2v4L14,9z M6.75,5.25h-1.5v1.5h1.5V5.25z M6.75,17.25h-1.5v1.5h1.5V17.25z M18.75,5.25h-1.5v1.5h1.5V5.25z"/>  
  `;
  return createSVG(properties);
};

export const DOWNLOAD = (properties) => {
  properties.svg = ` 
    <path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  `;
  return createSVG(properties);
};


export const RECEIPT = (properties) => {
  properties.svg = ` 
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
  `;
  return createSVG(properties);
};


export const EURO = (properties) => {
  properties.svg = ` 
    <g><rect fill="none" height="24" width="24"/></g><g><g/><path d="M15,18.5c-2.51,0-4.68-1.42-5.76-3.5H15l1-2H8.58c-0.05-0.33-0.08-0.66-0.08-1s0.03-0.67,0.08-1H15l1-2H9.24 C10.32,6.92,12.5,5.5,15,5.5c1.61,0,3.09,0.59,4.23,1.57L21,5.3C19.41,3.87,17.3,3,15,3c-3.92,0-7.24,2.51-8.48,6H3l-1,2h4.06 C6.02,11.33,6,11.66,6,12s0.02,0.67,0.06,1H3l-1,2h4.52c1.24,3.49,4.56,6,8.48,6c2.31,0,4.41-0.87,6-2.3l-1.78-1.77 C18.09,17.91,16.62,18.5,15,18.5z"/></g> 
  `;
  return createSVG(properties);
};


