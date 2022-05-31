(function (exports) {
    'use strict';

    /**
     * Class representing a UI component (HTML element) with custom properties and methods.
     * @description This class is a base class for all UI components.
     * @class UIComponent
     */
    class UIComponent {
        constructor(props) {
            this.type = props.type ?? "div";
            this.text = props.text;
            this.id = props.id;
            this.classes = props.classes;
            this.attributes = props.attributes;
            this.styles = props.styles;
            this.data = props.data;
            this.events = props.events;
            this.element = this.createElement();
        }
        createElement() {
            let element;
            if (!this.type) {
                throw "Element without type.";
            }
            element = document.createElement(this.type);
            if (this.text) {
                element.innerHTML = this.text;
            }
            if (this.id) {
                element.id = this.id;
            }
            if (this.classes) {
                setClasses(element, this.classes);
            }
            if (this.attributes) {
                setAttributes(element, this.attributes);
            }
            if (this.styles) {
                setStyles(element, this.styles);
            }
            if (this.data) {
                setDataset(element, this.data);
            }
            if (this.events) {
                setEvents(element, this.events);
            }
            return element;
        }
        toHTML() {
            return this.element.outerHTML;
        }
        /**
         * Appends a child to the component.
         * @param child  Child component to be added
         * @returns      The component itself (for chaining)
         */
        appendChild(child) {
            this.element.appendChild(child instanceof UIComponent ? child.element : child);
            return this;
        }
        /**
         * removes a child from the component.
         * @param child  Child component to be removed
         * @returns      The component itself (for chaining)
         * @description  If the child is not a child of the component, a message appears.
         */
        removeChild(child) {
            try {
                this.element.removeChild(child instanceof UIComponent ? child.element : child);
            }
            catch (e) {
                console.log(child, "is not a child of", this.element);
            }
            return this;
        }
        /**
         * append this component to a parent component.
         * @param parent Parent component to be appended to
         * @returns      The component itself (for chaining)
         */
        appendTo(parent) {
            parent.appendChild(this.element);
            return this;
        }
        /**
         * Clears the component.
         * @returns The component itself (for chaining)
         */
        clean() {
            this.element.innerHTML = "";
            return this;
        }
    }
    /**
     * Set attributes to a DOM element
     * @param element DOM element to set attributes
     * @param options Object with attributes and values
     * @returns DOM element with attributes in order to chain methods
     * @example
     *      element = setAttributes(element, {
     *           "id": "my-id",
     *           "class": "my-class"
     *      });
     *
     *      console.log(element.id); // "my-id"
     *      console.log(element.className); // "my-class"
     */
    function setAttributes(element, options) {
        if (options)
            for (const key in options)
                element.setAttribute(key, options[key]);
        return element;
    }
    /**
     * Set dataset to a DOM element
     * @param element DOM element to set dataset
     * @param dataset Object with dataset values
     * @returns DOM element itself in order to chain methods
     * @example
     *      setDataset(element, {
     *         "key": "value",
     *        "key2": "value2"
     *      });
     *
     *      console.log(element.dataset.key); // value
     *      console.log(element.dataset.key2); // value2
     */
    function setDataset(element, dataset) {
        if (dataset)
            for (const key in dataset)
                element.dataset[key] = dataset[key];
        return element;
    }
    /**
     * Set events to a DOM element
     * @param element DOM element to set events
     * @param events Object with event names and functions as values
     * @returns DOM element itself in order to chain methods
     * @example
     *      setEvents(element, {
     *          "click": () => console.log("Clicked!")
     *      });
     *
     *      // Output on click: Clicked!
     */
    function setEvents(element, events) {
        if (events)
            for (const key in events)
                element.addEventListener(key, events[key]);
        return element;
    }
    /**
     * Set styles to a DOM element
     * @param element DOM element
     * @param styles Object with styles
     * @returns DOM element itself in order to chain methods
     * @example
     *      setStyles(element, {
     *          "width": "100px",
     *          "height": "100px",
     *          "background-color": "red"
     *      });
     *
     *      console.log(element.style.width); // 100px
     *      console.log(element.style.height); // 100px
     *      console.log(element.style.backgroundColor); // red
     */
    function setStyles(element, styles) {
        if (styles)
            for (const key in styles)
                element.style[key] = styles[key];
        return element;
    }
    /**
     * Set classes to a DOM element
     * @param element DOM element to set classes
     * @param classes Array with classnames
     * @returns DOM element itself in order to chain methods
     * @example
     *      setClasses(element, ["class1", "class2"]);
     *      // element.className = "class1 class2";
     */
    function setClasses(element, classes) {
        if (classes)
            classes.forEach((cl) => element.classList.add(cl));
        return element;
    }

    /**
     * Get a Material Icons SVG by name.
     * @param name The name of the icon.
     * @param properties The properties of the icon.
     * @returns The container of the SVG as a UIComponent.
     */
    function getMaterialIcon(name, properties) {
        properties.svg = MATERIAL_ICONS[name] || "";
        let text = createSVG(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }
    /**
     * Create svg in 24 x 24 viewBox
     * @param properties properties
     * @returns svg inside a string
     * @example
     *    createSvg({
     *        fill: '#202020',
     *        size: '24',
     *        classes: ['material-icons'],
     *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
     *    });
     *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
     */
    function createSVG(properties) {
        const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
        return svg;
    }
    const MATERIAL_ICONS = {
        "back": `<path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="inherit"/>`,
        "clock": `<path d="M0 0h24v24H0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />`,
        "expand": `<path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="inherit"/>`,
        "expand_less": `<path d="M0 0h24v24H0z" fill="none" /> <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />`,
        "summation": `<path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" fill="inherit"/><path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" stroke="inherit"/>`,
        "help": `<path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />`,
        "info": `<path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />`,
        "logout": `<path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="inherit"/>`,
        "notifications": `<path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="inherit"/>`,
        "support": `<path d="M21 12.22C21 6.73 16.74 3 12 3C7.31 3 3 6.65 3 12.28C2.4 12.62 2 13.26 2 14V16C2 17.1 2.9 18 4 18H5V11.9C5 8.03 8.13 4.9 12 4.9C15.87 4.9 19 8.03 19 11.9V19H11V21H19C20.1 21 21 20.1 21 19V17.78C21.59 17.47 22 16.86 22 16.14V13.84C22 13.14 21.59 12.53 21 12.22Z" fill="inherit"/><path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" fill="inherit"/><path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="inherit"/><path d="M18 11.03C17.52 8.18 15.04 6 12.05 6C9.02003 6 5.76003 8.51 6.02003 12.45C8.49003 11.44 10.35 9.24 10.88 6.56C12.19 9.19 14.88 11 18 11.03Z" fill="inherit"/>`,
        "location": `<path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />`,
        "no_location": `<path d="M0 0h24v24H0zm11.75 11.47l-.11-.11z" fill="none" /><path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z" />`,
        "no_event": `<path d="M9.31 17l2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />`,
        "events": `<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>`,
        "check": `<path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />`,
        "check_all": `<path d="M0 0h24v24H0z" fill="none" /><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />`,
        "edit": `<path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />`,
        "plus": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />`,
        "minus": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 13H5v-2h14v2z" />`,
        "close": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />`,
        "save": `<path d="M0 0h24v24H0z" fill="none" /><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" /> `,
        "shipping": `<path d="M0 0h24v24H0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>`,
        "shopping_kart": `<path d="M0 0h24v24H0z" fill="none" /><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />`,
        "qr_code": `<g><rect fill="none" height="24" width="24"/></g><path d="M15,21h-2v-2h2V21z M13,14h-2v5h2V14z M21,12h-2v4h2V12z M19,10h-2v2h2V10z M7,12H5v2h2V12z M5,10H3v2h2V10z M12,5h2V3h-2V5 z M4.5,4.5v3h3v-3H4.5z M9,9H3V3h6V9z M4.5,16.5v3h3v-3H4.5z M9,21H3v-6h6V21z M16.5,4.5v3h3v-3H16.5z M21,9h-6V3h6V9z M19,19v-3 l-4,0v2h2v3h4v-2H19z M17,12l-4,0v2h4V12z M13,10H7v2h2v2h2v-2h2V10z M14,9V7h-2V5h-2v4L14,9z M6.75,5.25h-1.5v1.5h1.5V5.25z M6.75,17.25h-1.5v1.5h1.5V17.25z M18.75,5.25h-1.5v1.5h1.5V5.25z"/>`,
        "download": `<path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>`,
        "receipt": `<path d="M0 0h24v24H0z" fill="none"/><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>`,
        "euro": `<g><rect fill="none" height="24" width="24"/></g><g><g/><path d="M15,18.5c-2.51,0-4.68-1.42-5.76-3.5H15l1-2H8.58c-0.05-0.33-0.08-0.66-0.08-1s0.03-0.67,0.08-1H15l1-2H9.24 C10.32,6.92,12.5,5.5,15,5.5c1.61,0,3.09,0.59,4.23,1.57L21,5.3C19.41,3.87,17.3,3,15,3c-3.92,0-7.24,2.51-8.48,6H3l-1,2h4.06 C6.02,11.33,6,11.66,6,12s0.02,0.67,0.06,1H3l-1,2h4.52c1.24,3.49,4.56,6,8.48,6c2.31,0,4.41-0.87,6-2.3l-1.78-1.77 C18.09,17.91,16.62,18.5,15,18.5z"/></g>`,
        "search": `<path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />`,
        "user": `<path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />`,
        "password": `<g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z" /></g></g>`,
        "delete": `<path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>`,
        "calendar_today": `<path d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V8H20V21Z"/>`,
        "task": `<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M10.94,18L7.4,14.46l1.41-1.41 l2.12,2.12l4.24-4.24l1.41,1.41L10.94,18z M13,9V3.5L18.5,9H13z"/></g>`,
        "task_alt": `<path d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.58 4 15.04 4.46 16.28 5.25L17.72 3.81C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67 21.4 8.61L19.79 10.22Z"/>`,
        "group": `<path d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.58 4 15.04 4.46 16.28 5.25L17.72 3.81C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67 21.4 8.61L19.79 10.22Z"/>`,
        "spoke": `<path d="M6 13C3.8 13 2 14.8 2 17C2 19.2 3.8 21 6 21C8.2 21 10 19.2 10 17C10 14.8 8.2 13 6 13ZM12 3C9.8 3 8 4.8 8 7C8 9.2 9.8 11 12 11C14.2 11 16 9.2 16 7C16 4.8 14.2 3 12 3ZM18 13C15.8 13 14 14.8 14 17C14 19.2 15.8 21 18 21C20.2 21 22 19.2 22 17C22 14.8 20.2 13 18 13Z" />`,
        "tune": `<path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"/>`,
        "terminal": `<g><rect fill="none" height="24" width="24"/></g><g><path d="M20,4H4C2.89,4,2,4.9,2,6v12c0,1.1,0.89,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.11,4,20,4z M20,18H4V8h16V18z M18,17h-6v-2 h6V17z M7.5,17l-1.41-1.41L8.67,13l-2.59-2.59L7.5,9l4,4L7.5,17z"/></g>`,
        "cloud": `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>`,
        "cloud_off": `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/>`,
        "tag": `<path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"/>`,
        "sync": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>`,
        "manage_search": `</g><g><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"/></g>`,
        "palette": `</g><g><path d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10c1.38,0,2.5-1.12,2.5-2.5c0-0.61-0.23-1.2-0.64-1.67c-0.08-0.1-0.13-0.21-0.13-0.33 c0-0.28,0.22-0.5,0.5-0.5H16c3.31,0,6-2.69,6-6C22,6.04,17.51,2,12,2z M17.5,13c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5C19,12.33,18.33,13,17.5,13z M14.5,9C13.67,9,13,8.33,13,7.5C13,6.67,13.67,6,14.5,6S16,6.67,16,7.5 C16,8.33,15.33,9,14.5,9z M5,11.5C5,10.67,5.67,10,6.5,10S8,10.67,8,11.5C8,12.33,7.33,13,6.5,13S5,12.33,5,11.5z M11,7.5 C11,8.33,10.33,9,9.5,9S8,8.33,8,7.5C8,6.67,8.67,6,9.5,6S11,6.67,11,7.5z"/></g>`,
        "light_mode": `<path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>`,
        "dark_mode": `<rect fill="none" height="24" width="24"/><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>`,
        "clear_all": `<path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"/>`,
        "checklist": `<path d="M22,7h-9v2h9V7z M22,15h-9v2h9V15z M5.54,11L2,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,11z M5.54,19L2,15.46 l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,19z"/>`,
        "radio_button_unchecked": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>`,
        "label": `<path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>`,
        "label_off": `<path d="M3.25 2.75l17 17L19 21l-2-2H5c-1.1 0-2-.9-2-2V7c0-.55.23-1.05.59-1.41L2 4l1.25-1.25zM22 12l-4.37-6.16C17.27 5.33 16.67 5 16 5H8l11 11 3-4z"/>`,
        "label_important": `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/>`,
        "wallpaper": `<path d="M0 0h24v24H0z" fill="none"/><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>`,
        "block": `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>`,
        "science": `<g><rect fill="none" height="24" width="24"/></g><g><path d="M19.8,18.4L14,10.67V6.5l1.35-1.69C15.61,4.48,15.38,4,14.96,4H9.04C8.62,4,8.39,4.48,8.65,4.81L10,6.5v4.17L4.2,18.4 C3.71,19.06,4.18,20,5,20h14C19.82,20,20.29,19.06,19.8,18.4z"/></g>`,
        "article": `<path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>`,
        "person_add": `<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`,
        "event": `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>`,
        "edit_note": `<rect fill="none" height="24" width="24"/><path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z"/>`,
        "sticky_note_2": `<path d="M19,3H4.99C3.89,3,3,3.9,3,5l0.01,14c0,1.1,0.89,2,1.99,2h10l6-6V5C21,3.9,20.1,3,19,3z M7,8h10v2H7V8z M12,14H7v-2h5V14z M14,19.5V14h5.5L14,19.5z"/>`,
        "image": `<path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>`,
        "content_copy": `<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>`,
        "content_paste": `<path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>`,
        "cancel": `<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>`,
        "home": `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>`,
        "code": `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>`,
        "business": `<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>`,
        "all_inclusive": `<path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>`,
        "videogame_asset": `<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>`,
        "sport_esports": `<g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"/></g></g>`,
        "games": `<path d="M0 0h24v24H0z" fill="none"/><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>`,
        "movie": `<path d="M0 0h24v24H0z" fill="none"/><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/`,
        "menu_open": `<path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/>`,
        "construction": `<g><rect fill="none" height="24" width="24"/></g><g><g><rect height="8.48" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.8717 17.6255)" width="3" x="16.34" y="12.87"/><path d="M17.5,10c1.93,0,3.5-1.57,3.5-3.5c0-0.58-0.16-1.12-0.41-1.6l-2.7,2.7L16.4,6.11l2.7-2.7C18.62,3.16,18.08,3,17.5,3 C15.57,3,14,4.57,14,6.5c0,0.41,0.08,0.8,0.21,1.16l-1.85,1.85l-1.78-1.78l0.71-0.71L9.88,5.61L12,3.49 c-1.17-1.17-3.07-1.17-4.24,0L4.22,7.03l1.41,1.41H2.81L2.1,9.15l3.54,3.54l0.71-0.71V9.15l1.41,1.41l0.71-0.71l1.78,1.78 l-7.41,7.41l2.12,2.12L16.34,9.79C16.7,9.92,17.09,10,17.5,10z"/></g></g>`,
        "coffee": `<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M18.5,3H6C4.9,3,4,3.9,4,5v5.71c0,3.83,2.95,7.18,6.78,7.29c3.96,0.12,7.22-3.06,7.22-7v-1h0.5c1.93,0,3.5-1.57,3.5-3.5 S20.43,3,18.5,3z M16,5v3H6V5H16z M18.5,8H18V5h0.5C19.33,5,20,5.67,20,6.5S19.33,8,18.5,8z M4,19h16v2H4V19z"/></g>`,
        "wifi": `<path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>`,
        "wifi_off": `<path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/>`,
        "translate": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>`,
        "animation": `<path d="M15 2c-2.71 0-5.05 1.54-6.22 3.78-1.28.67-2.34 1.72-3 3C3.54 9.95 2 12.29 2 15c0 3.87 3.13 7 7 7 2.71 0 5.05-1.54 6.22-3.78 1.28-.67 2.34-1.72 3-3C20.46 14.05 22 11.71 22 9c0-3.87-3.13-7-7-7zM9 20c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.87 3.13 7 7 7-.84.63-1.88 1-3 1zm3-3c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.86 3.13 6.99 7 7-.84.63-1.88 1-3 1zm4.7-3.3c-.53.19-1.1.3-1.7.3-2.76 0-5-2.24-5-5 0-.6.11-1.17.3-1.7.53-.19 1.1-.3 1.7-.3 2.76 0 5 2.24 5 5 0 .6-.11 1.17-.3 1.7zM19 12c0-3.86-3.13-6.99-7-7 .84-.63 1.87-1 3-1 2.76 0 5 2.24 5 5 0 1.12-.37 2.16-1 3z"/><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/>`,
    };

    class UINotification extends UIComponent {
        constructor() {
            super({
                type: "notification",
                classes: ["box-column"],
                styles: {
                    position: "fixed",
                    top: "-5rem",
                    right: "1rem",
                    width: "20rem",
                    // maxHeight: "7rem",
                    height: "fit-content",
                    background: "rgba(0,0,0,.75)",
                    borderRadius: ".35rem",
                    transition: ".5s",
                    padding: "1.5rem",
                    opacity: "0",
                    zIndex: "1000",
                }
            });
            this.bar = new UIComponent({
                styles: {
                    marginBottom: ".5rem"
                }
            });
            this.content = new UIComponent({
                classes: ["box-row", "box-y-center", "box-x-between"],
                styles: {
                    wordBreak: "break-word"
                }
            });
            this.showing = false;
            this.appendChild(this.bar);
            this.appendChild(this.content);
        }
        async show(seconds = 1) {
            if (this.showing)
                return;
            setTimeout(() => {
                setStyles(this.element, {
                    top: "1rem",
                    opacity: "1",
                    transition: ".5s",
                });
            }, 1);
            this.showing = true;
            setTimeout(() => {
                setStyles(this.element, {
                    top: "-5rem",
                    opacity: "0"
                });
                this.showing = false;
            }, 1000 + seconds * 1000);
        }
        setContent(properties) {
            this.bar.clean();
            this.content.clean();
            if (properties.title) {
                this.bar.element.style.display = "flex";
                const title = new UIComponent({
                    type: "h1",
                    text: properties.title,
                    styles: {
                        fontSize: "1.25rem"
                    }
                });
                this.bar.appendChild(title);
            }
            else {
                this.bar.element.style.display = "none";
            }
            if (properties.message) {
                const text = new UIComponent({
                    type: "span",
                    text: properties.message
                });
                this.content.appendChild(text);
            }
            if (properties.icon) {
                const icon = getMaterialIcon(properties.icon, { size: "1.25rem", fill: "white" });
                this.content.appendChild(icon);
            }
        }
    }

    var HTTPS_METHOD;
    (function (HTTPS_METHOD) {
        HTTPS_METHOD["GET"] = "GET";
        HTTPS_METHOD["POST"] = "POST";
        HTTPS_METHOD["PUT"] = "PUT";
        HTTPS_METHOD["DELETE"] = "DELETE";
        HTTPS_METHOD["PATCH"] = "PATCH";
        HTTPS_METHOD["HEAD"] = "HEAD";
        HTTPS_METHOD["OPTIONS"] = "OPTIONS";
        HTTPS_METHOD["CONNECT"] = "CONNECT";
        HTTPS_METHOD["TRACE"] = "TRACE";
        HTTPS_METHOD["ALL"] = "ALL";
    })(HTTPS_METHOD || (HTTPS_METHOD = {}));

    /**
     * A class that represents a response from a fetch request.
     * @description Encapsulates the data and methods for easy fetching
     * @author Akrck02
     */
    class Response {
        constructor(response) {
            this.response = response;
            this.successFn = (data) => console.log(data);
            this.errorFn = (err) => console.log("Error in response : ", err);
        }
        getResponse() {
            return this.response;
        }
        /**
         *  Executes tne callback function with the response json as an argument.
         * @returns the response itself
         * @description This method is useful for fetching json files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .json();
         *
         */
        json() {
            this.response
                .then((res) => res.json().then((json) => this.successFn(json)))
                .catch((err) => this.errorFn(err));
            return this;
        }
        /**
         *  Executes tne callback function with the response json as an argument.
         * @returns the response itself
         * @description This method is useful for fetching json files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .json();
         *
         */
        async jsonPromise() {
            await this.response
                .then((res) => res.json().then((json) => this.successFn(json)))
                .catch((err) => this.errorFn(err));
        }
        /**
         * Executes the callback function with the response text as an argument.
         * @returns the response itself
         * @description This method is useful for fetching text files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .text();
         *
         */
        text() {
            this.response
                .then((res) => res.text().then((text) => this.successFn(text)))
                .catch((err) => this.errorFn(err));
            return this;
        }
        /**
         * Executes the callback function with the response blob as an argument.
         * @returns the response itself
         * @description This method is useful for fetching binary files.
         * @example
         *     Response
         *     .success(blob => console.log(blob))
         *     .error(err => console.log(err))
         *     .blob();
         */
        blob() {
            this.response
                .then((res) => res.blob().then((blob) => this.successFn(blob)))
                .catch((err) => this.errorFn(err));
        }
        /**
         * Sets the callback function to be executed when the response is successful.
         * @param success the callback function
         * @returns the response itself
         */
        success(success) {
            this.successFn = success;
            return this;
        }
        /**
         * Sets the callback function to be executed when the response is unsuccessful.
         * @param error the callback function
         * @returns the response itself
         */
        error(error) {
            this.errorFn = error;
            return this;
        }
    }
    /**
     * @param properties fetch properties
     * @returns a Response object encapsulating the response.
     * @description This method is useful for fetching data from the server.
     * @example
     *     const response = EasyFetch(
     *       {
     *          method: HTTPS_METHOD.GET,
     *          parameters: {
     *             id: "1Y123",
     *             name: "Akrck02"
     *          },
     *          url: 'https://example.org/api/todos/1'
     *       }
     *     );
     *     response.json();
     */
    function efetch(properties) {
        let options = {
            method: properties.method,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        };
        if (properties.method === HTTPS_METHOD.POST) {
            options["body"] = JSON.stringify(properties.parameters);
        }
        const promise = fetch(properties.url, options);
        const response = new Response(promise);
        return response;
    }

    class ConfigService {
        static getAppConfig() {
            const response = efetch({
                method: HTTPS_METHOD.GET,
                url: "../version.json",
                parameters: {}
            });
            return response;
        }
    }

    var ENVIROMENT;
    (function (ENVIROMENT) {
        ENVIROMENT["DEVELOPMENT"] = "development";
        ENVIROMENT["PRODUCTION"] = "production";
    })(ENVIROMENT || (ENVIROMENT = {}));
    class Configurations {
        /**
         * Set default configurations for the application
         */
        static async setDefaultVariables() {
            await ConfigService.getAppConfig().success(json => {
                this.BASE.APP_NAME = json.APP_NAME;
                this.BASE.APP_VERSION = json.VERSION;
                this.BASE.ENVIRONMENT = json.ENVIRONMENT;
            }).jsonPromise();
            if (!Configurations.getConfigVariable("ANIMATIONS")) {
                this.setAnimations(true);
            }
        }
        /**
         * Toogle the dark / light mode.
         * if a wallpaper is set, does not change the theme
         */
        static toggleTheme() {
            if (Configurations.getConfigVariable("WALLPAPER")) {
                return;
            }
            Configurations.setTheme((Configurations.getConfigVariable("THEME") === "light") ? "dark" : "light");
        }
        /**
         * Set the application UI theme
         * @param theme the theme to set
         */
        static setTheme(theme) {
            if (!theme)
                theme = "dark";
            this.addConfigVariable("THEME", theme);
            this.addConfigVariable("WALLPAPER", false);
            document.documentElement.dataset.theme = theme;
        }
        static getTheme() {
            return Configurations.getConfigVariable("THEME");
        }
        /**
         * Get if the dark mode is active
         * @returns true if the dark mode is active
         */
        static isDarkModeActive() {
            return Configurations.getTheme() === "dark";
        }
        /**
         * Set the animations on/off
         * @param animations true to enable animations
         */
        static setAnimations(animations) {
            document.documentElement.dataset.animations = animations ? "true" : "false";
            this.addConfigVariable("ANIMATIONS", animations);
        }
        /**
         * Get if the animations are enabled
         * @returns true if the animations are enableds
         */
        static areAnimationsEnabled() {
            return Configurations.getConfigVariable("ANIMATIONS") + "" === "true";
        }
        /**
         * Get application configurations
         * @returns the application configurations
         */
        static getConfig() {
            let localStorageConfiguration = JSON.parse(localStorage.getItem("akrck02.github.io-config"));
            if (!localStorageConfiguration) {
                localStorageConfiguration = {};
            }
            return localStorageConfiguration;
        }
        /**
         * Add a configuration variable
         * @param key the name of the variable
         * @param value the value of the variable
         */
        static addConfigVariable(key, value) {
            let localStorageConfiguration = Configurations.getConfig();
            const config = localStorageConfiguration;
            config[key] = value;
            localStorage.setItem("akrck02.github.io-config", JSON.stringify(config));
        }
        /**
         * Get a configuration variable
         * @param key the name of the variable
         * @returns the value of the variable
         */
        static getConfigVariable(key) {
            let localStorageConfiguration = this.getConfig();
            return localStorageConfiguration[key];
        }
    }
    //global runtime configurations
    Configurations.BASE = {
        APP_NAME: "akrck02.github.io",
        APP_VERSION: "v.x.x",
        HOST: "127.0.0.1",
        PORT: 80,
        URL: location.href,
        ENVIRONMENT: ENVIROMENT.DEVELOPMENT,
        DEBUG: true,
        LOG_LEVEL: "debug",
        LOG_FILE: "app.log",
    };
    Configurations.PATHS = {
        WEB: "../web/",
        ROOT: "../client/",
        LOGS: "../client/logs/",
        RESOURCES: "../client/resources/",
        IMAGES: "../client/resources/images/",
        ICONS: "../client/resources/icons/",
        WALLPAPERS: "../client/resources/wallpapers/",
    };
    Configurations.VIEWS = {
        BASE_URL: "../#/",
        HOME: "../#/home",
        SOFTWARE: "../#/software",
        GAMES: "../#/games",
        MEDIA: "../#/media",
        ERROR: "../#/error/",
        DUMMY: "../#/dummy/",
    };
    Configurations.API = {};

    class Keyboard {
        static setEventListeners(listeners) {
            document.addEventListener('keyup', function (event) {
            });
        }
    }

    class ListenerSet {
        constructor() {
        }
    }

    class Window {
        static setEvents() {
            window.onresize = () => this.setZoomLevel();
        }
        static setZoomLevel() {
            return;
        }
    }
    Window.FULLHD_WIDTH = 1920;
    Window.FULLHD_HEIGHT = 1080;
    Window.DEFAULT_ZOOM = 1;

    /**
     * Get parameters of a url by breakpoint
     * @param url url to get parameters from
     * @param breakpoint breakpoint to get parameters from
     * @description This method is useful for getting parameters of a url by breakpoint.
     * @returns parameters of a url
     * @example
     *     const url = "https://www.website.org/search/user/1/page/2";
     *     const breakpoint = "search";
     *     const parameters = getParametersByBreakPoint(url, breakpoint);
     *     console.log(parameters); // ["user","1","page","2"]
     */
    /**
     * Get parameters of a url by index
     * @param url url to get parameters from
     * @param index index to get parameters from
     * @description This method is useful for getting parameters of a url by index.
     * @returns parameters of a url
     * @example
     *      const url = "https://www.website.org/search/user/1/page/2";
     *      const index = 1;
     *      const parameters = getParametersByIndex(url, index);
     *      console.log(parameters); // ["1","page","2"]
     */
    function getParametersByIndex(url, index) {
        let params = url.split("/");
        params = params.slice(index, params.length);
        return params;
    }

    const HomeBundleEn = {
        HI_THERE_IM_AKRCK02: "Hi there!, I’m akrck02.",
        DESCRIPTION_1: "I’m a 21 year old software developer.  I like puzzles, video games and software architecture.",
        DESCRIPTION_2: "From time to time I create projects to make development easier or solve problems.",
        CURRENTLY_WORKING_ON: "Currently working on",
        TECHNOLOGIES_IVE_USED: "Technologies I’ve used"
    };

    const SystemBundleEn = {
        NOT_IMPLEMENTED_YET: "Not implemented yet",
        THIS_PAGE_IS_UNDER_CONSTRUCTION: "This page is under construction",
        UNDER_CONSTRUCTION: "Under construction",
        COPIED_TO_CLIPBOARD: "Copied to clipboard",
    };

    const ValhallaBundleEn = {
        THE_MODERN_PRODUCTIVITY_APP: "The modern productity app",
        DOWNLOAD_FOR_LINUX: "Download for Linux",
        DOWNLOAD_FOR_WINDOWS: "Download for Windows",
        OR_WINDOWS: "or Windows",
        OR_LINUX: "or Linux",
        ORGANIZE: "Organize",
        SAVE_TIME: "Save time",
        CREATE: "Create",
        CALENDAR: "Calendar",
        TASKS: "Tasks",
        NOTES: "Notes",
        MANAGE_YOUR_TIME_OFFLINE: "Manage your time offline",
        CUSTOMIZE_YOUR_WALLPAPER: "Customize your wallpaper",
        LANGUAGES: "English, spanish",
        SUPPORT_OPEN_SOURCE_CODE: "Support open source code!",
        WINDOWS_MESSAGE_ONE: "Valhalla is a $1 right now, that's why Windows show the next warning, don't worry, is safe to install.",
        NOT_SIGNED_BETA: "non signed beta",
        WINDOWS_MESSAGE_TWO: "To finish the instalation click $1 and then click on the $2 button",
        MORE_INFO: "more information",
        EJECUTE_ANYWAY: "Ejecute anyway"
    };

    const SystemBundleEs = {
        NOT_IMPLEMENTED_YET: "Función en desarrollo",
        THIS_PAGE_IS_UNDER_CONSTRUCTION: "Esta página está en obras",
        UNDER_CONSTRUCTION: "En construcción",
        COPIED_TO_CLIPBOARD: "Copiado al portapapeles",
    };

    const ValhallaBundleEs = {
        THE_MODERN_PRODUCTIVITY_APP: "La productividad moderna",
        DOWNLOAD_FOR_LINUX: "Descargar para Linux",
        DOWNLOAD_FOR_WINDOWS: "Descargar para Windows",
        OR_WINDOWS: "o Windows",
        OR_LINUX: "o Linux",
        ORGANIZE: "Organiza",
        SAVE_TIME: "Planea",
        CREATE: "Crea",
        CALENDAR: "Calendario",
        TASKS: "Tareas",
        NOTES: "Notas",
        MANAGE_YOUR_TIME_OFFLINE: "Gestiona tu tiempo sin conexión a internet.",
        CUSTOMIZE_YOUR_WALLPAPER: "Personaliza tu fondo de pantalla",
        LANGUAGES: "Español, inglés",
        SUPPORT_OPEN_SOURCE_CODE: "Apoya al código abierto!",
        WINDOWS_MESSAGE_ONE: "Al tratarse de una $1, Windows mostrará el siguiente aviso, no te preocupes, es seguro",
        NOT_SIGNED_BETA: "applicación en beta no firmada",
        WINDOWS_MESSAGE_TWO: "Para seguir con la instalación pulsaremos $1 y en la siguiente pantalla $2",
        MORE_INFO: "mas información",
        EJECUTE_ANYWAY: "Ejecutar de todas formas"
    };

    const HomeBundleEs = {
        HI_THERE_IM_AKRCK02: "Hola! Soy akrck02.",
        DESCRIPTION_1: "Soy un desarrollador de software de 21 años.  Me gustan los puzzles, videojuegos y la arquitectura de software.",
        DESCRIPTION_2: "De vez en cuando creo proyectos para hacer mas facil el desarrollo o resolver problemas.",
        CURRENTLY_WORKING_ON: "Trabajando ahora en ",
        TECHNOLOGIES_IVE_USED: "Tecnologías que he usado"
    };

    class TextBundle {
        static get(lang) {
            //if contains ignore case 
            if (lang.toLowerCase().includes("es")) {
                return TextBundle.getBundleEs();
            }
            else {
                return TextBundle.getBundleEn();
            }
        }
        static getBundleEn() {
            return {
                system: SystemBundleEn,
                home: HomeBundleEn,
                valhalla: ValhallaBundleEn
            };
        }
        static getBundleEs() {
            return {
                system: SystemBundleEs,
                home: HomeBundleEs,
                valhalla: ValhallaBundleEs
            };
        }
    }

    class MobileSidebar extends UIComponent {
        constructor() {
            super({
                type: "div",
                classes: ["box-column", "box-y-center"],
            });
            this.opened = false;
            this.element = document.querySelector("header");
            this.build();
        }
        build() {
            this.clean();
            const titleBar = new UIComponent({
                type: "div",
                id: "title-bar",
                classes: ["box-y-center", "box-row", "box-x-between"],
            });
            const title = new UIComponent({
                type: "h1",
                classes: ["title"],
            });
            this.title = title;
            titleBar.appendChild(title);
            const icon = getMaterialIcon("menu_open", { size: "1.5rem", fill: "#fff" });
            icon.element.style.cursor = "pointer";
            //icon.element.addEventListener("click", () => this.toggle());
            titleBar.element.addEventListener("click", () => this.toggle());
            let touchPos;
            titleBar.element.ontouchstart = function (e) {
                touchPos = e.changedTouches[0].clientY;
            };
            titleBar.element.ontouchmove = (e) => {
                let newTouchPos = e.changedTouches[0].clientY;
                if (newTouchPos > touchPos + 50) {
                    this.element.style.transition = "height var(--medium)";
                    this.close();
                }
                else if (newTouchPos < touchPos - 50) {
                    this.element.style.transition = "height var(--medium)";
                    this.open();
                }
            };
            titleBar.appendChild(icon);
            this.buttonBar = new UIComponent({
                type: "div",
                id: "mobile-sidebar",
            });
            this.appendChild(titleBar);
            this.appendChild(this.buttonBar);
            this.elements = [];
        }
        setSelected(index) {
            this.elements.forEach(element => {
                element.element.classList.remove("selected");
            });
            if (index > this.elements.length - 1) {
                index = this.elements.length - 1;
            }
            if (index >= 0) {
                this.elements[index].element.classList.add("selected");
            }
        }
        setTitle(title) {
            this.title.element.innerHTML = title;
        }
        addIcon(icon) {
            this.elements.push(icon);
            this.buttonBar.appendChild(icon);
        }
        toggle() {
            this.element.style.transition = "height var(--medium)";
            if (this.opened) {
                this.close();
            }
            else {
                this.open();
            }
        }
        open() {
            this.element.style.height = "20rem";
            this.element.style.justifyContent = "flex-start";
            this.buttonBar.element.style.display = "flex";
            this.opened = true;
            document.documentElement.dataset.menuOpen = "true";
        }
        close() {
            this.element.style.height = "4.1rem";
            this.element.style.padding = ".1rem 2rem";
            this.element.style.alignItems = "center";
            this.buttonBar.element.style.display = "none";
            this.opened = false;
            document.documentElement.dataset.menuOpen = "false";
        }
    }

    class Sidebar extends UIComponent {
        constructor() {
            super({
                type: "div",
                id: "sidebar",
                classes: ["box-column", "box-y-center"],
            });
            this.buttonBar = new UIComponent({
                type: "div",
                classes: ["box-y-center", "box-column"],
                styles: {
                    height: "calc(100% - 2.5rem)",
                    width: "100%",
                }
            });
            this.mobileSidebar = new MobileSidebar();
            this.build();
            this.appendChild(this.buttonBar);
        }
        build() {
            this.createIcon("home", Configurations.VIEWS.HOME);
            this.createIcon("code", Configurations.VIEWS.SOFTWARE);
            this.createIcon("sport_esports", Configurations.VIEWS.GAMES);
            this.createIcon("movie", Configurations.VIEWS.MEDIA);
            this.elements = [];
            for (const iconName in Sidebar.BUTTON_MAP) {
                const path = Sidebar.BUTTON_MAP[iconName];
                const icon = this.createIcon(iconName, path);
                const iconMobile = this.createIcon(iconName, path);
                this.elements.push(icon);
                this.buttonBar.appendChild(icon);
                this.mobileSidebar.addIcon(iconMobile);
            }
        }
        createIcon(icon, url) {
            return new UIComponent({
                type: "a",
                classes: ["sidebar-item", "box-center"],
                text: getMaterialIcon(icon, {
                    size: "1.25rem",
                    fill: "#404040",
                }).toHTML(),
                attributes: { href: url },
            });
        }
        setSelected(index) {
            this.mobileSidebar.setSelected(index);
            this.elements.forEach(element => {
                element.element.classList.remove("selected");
            });
            if (index > this.elements.length - 1) {
                index = this.elements.length - 1;
            }
            if (index >= 0) {
                this.elements[index].element.classList.add("selected");
            }
        }
        getMobile() {
            return this.mobileSidebar;
        }
        ;
    }
    Sidebar.BUTTON_MAP = {
        "home": Configurations.VIEWS.HOME,
        "code": Configurations.VIEWS.SOFTWARE,
        "sport_esports": Configurations.VIEWS.GAMES,
        "movie": Configurations.VIEWS.MEDIA,
    };

    const ERRORS = {
        200: {
            message: 'Success',
            code: 200,
        },
        400: {
            message: 'Bad request',
            code: 400,
        },
        401: {
            message: 'Unauthorized',
            friendly: 'You have no permissions to access this content 🔐',
            code: 401,
        },
        404: {
            message: 'Not found',
            friendly: 'We can\'t find the page you are looking for 😓',
            code: 404,
        },
        500: {
            message: 'Internal server error',
            friendly: 'Ups, something went wrong 😓',
            code: 500,
        },
    };

    class ErrorV extends UIComponent {
        constructor() {
            super({
                type: "view",
                classes: ["box-column", "box-center", "backdrop"],
                styles: {
                    padding: "2rem",
                    width: "100%",
                    height: "100%",
                },
            });
        }
        show(params, container) {
            let error = ERRORS[params[0]];
            if (!error)
                error = ERRORS[404];
            const image = new UIComponent({
                type: "img",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "cat.png",
                },
                styles: {
                    width: "20rem",
                    margin: "1rem 0",
                    borderBottom: ".2rem solid rgba(255,255,255,0.1)",
                    height: "auto",
                    opacity: "0",
                    transition: "opacity .5s",
                },
            });
            const title = new UIComponent({
                type: "h1",
                text: error.friendly,
                styles: {
                    transition: "opacity 1s",
                    opacity: "0",
                }
            });
            this.appendChild(image);
            this.appendChild(title);
            this.appendTo(container);
            setTimeout(() => {
                title.element.style.opacity = "1";
                image.element.style.opacity = "1";
            }, 100);
        }
        ;
    }

    class DummyView extends UIComponent {
        constructor() {
            super({
                type: "view"
            });
        }
        show(params, container) {
            this.appendTo(container);
        }
    }

    class Modal extends UIComponent {
        constructor() {
            super({
                type: "div",
                id: "modal",
                styles: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: "20rem",
                    minHeight: "8rem",
                    display: "none",
                    opacity: "0",
                    transition: "opacity var(--fast), backdrop-filter var(--fast)",
                    zIndex: "1000",
                }
            });
            this.blackScreen = new UIComponent({
                type: "div",
                id: "modal-blackscreen",
            });
            this.element.onkeydown = (e) => {
                if (e.key === 'Escape') {
                    this.hide();
                }
            };
            this.blackScreen.appendTo(document.body);
            this.showing = false;
        }
        setContent(content) {
            this.clean();
            this.appendChild(content);
        }
        show() {
            this.showing = true;
            this.blackScreen.element.style.display = "block";
            this.element.style.display = "block";
            setTimeout(() => {
                this.blackScreen.element.style.opacity = "1";
                this.element.style.opacity = "1";
                this.element.focus();
                let focusableElement = this.element.querySelector("input");
                if (!focusableElement) {
                    this.element.querySelector("textarea")?.focus();
                }
                else {
                    focusableElement.focus();
                }
            }, 250);
        }
        hide() {
            this.showing = false;
            this.element.style.opacity = "0";
            this.blackScreen.element.style.opacity = "0";
            setTimeout(() => {
                this.element.style.display = "none";
                this.blackScreen.element.style.display = "none";
            }, 250);
        }
        toggle() {
            if (this.showing) {
                this.hide();
                return;
            }
            this.show();
        }
    }

    const SOCIAL_ICONS = {
        twitter: `<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>`,
        github: `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`,
        youtube: `<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>`,
        twitch: `<path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/>`,
        valhalla: `<path d="M6.82319 18.6453C6.80167 18.5892 7.51098 18.0325 8.06779 17.6684C8.16714 17.6034 8.36498 17.4706 8.50744 17.3731C8.6499 17.2757 8.78766 17.196 8.81357 17.196C8.83948 17.196 8.86777 17.18 8.87643 17.1605C8.89559 17.1174 9.18364 16.9125 9.22507 16.9125C9.24136 16.9125 9.40846 16.8062 9.5964 16.6763C9.94355 16.4363 10.0689 16.393 10.1092 16.4991C10.1325 16.5604 10.0184 17.012 9.85555 17.5031C9.80386 17.659 9.7112 17.9538 9.64965 18.1582C9.52181 18.5828 9.5251 18.5786 9.26465 18.6526C8.97365 18.7352 6.85526 18.7289 6.82319 18.6453V18.6453ZM18.5536 18.6493C18.5146 18.6165 18.4327 18.3877 18.3716 18.1408C18.3104 17.894 18.2111 17.5645 18.1509 17.4086C18.0907 17.2527 18.016 16.9975 17.9849 16.8416C17.9161 16.4962 17.5642 15.2108 17.2154 14.0306C16.9001 12.9638 16.6953 12.0685 16.7325 11.92C16.7553 11.8294 17.32 11.3578 17.7409 11.0779C18.3022 10.7045 18.8762 10.3163 19.3565 9.98538L19.9468 9.57859L20.2465 9.60265C20.4676 9.6204 20.641 9.67448 20.9081 9.80898C21.227 9.96955 21.2959 10.0289 21.4866 10.3074C21.6866 10.5994 21.7073 10.6577 21.7583 11.0723C21.7886 11.3192 21.8134 11.8573 21.8134 12.268C21.8134 13.1639 21.7396 13.5884 21.5406 13.8367C21.366 14.0545 20.9385 14.3139 20.7525 14.3148C20.4973 14.3161 20.475 14.3583 20.5588 14.6816C20.6512 15.0383 20.9395 15.8724 21.0686 16.1566C21.1218 16.2735 21.2122 16.5393 21.2696 16.7471C21.3269 16.955 21.4515 17.3761 21.5464 17.683C21.7394 18.307 21.7652 18.5816 21.6363 18.6418C21.4887 18.7107 18.6348 18.7177 18.5536 18.6493V18.6493ZM20.4438 13.2629C20.5297 13.2044 20.639 13.1034 20.6866 13.0385C20.8682 12.7908 20.9301 11.9131 20.7941 11.5141C20.6318 11.0377 20.0413 10.601 19.5221 10.5734C19.3018 10.5617 19.285 10.5687 19.2733 10.6776C19.2664 10.7418 19.3476 11.0389 19.4538 11.3377C19.56 11.6365 19.7506 12.1858 19.8773 12.5582C20.0957 13.2001 20.1741 13.3692 20.2532 13.3692C20.2721 13.3692 20.3579 13.3214 20.4438 13.2629V13.2629ZM10.4333 18.6279C10.3293 18.6068 10.3229 18.5887 10.3478 18.3848C10.3626 18.2636 10.4929 17.7971 10.6374 17.3481C10.7818 16.8991 10.9001 16.4911 10.9001 16.4415C10.9001 16.3918 10.919 16.3395 10.9421 16.3252C10.9652 16.3109 10.9984 16.2406 11.016 16.1689C11.0824 15.8976 11.2806 15.5511 11.4641 15.3853C11.6542 15.2136 12.4844 14.6448 12.5451 14.6448C12.5628 14.6447 12.6952 14.5521 12.8395 14.4388C12.9838 14.3256 13.1819 14.1949 13.2798 14.1484C13.3778 14.102 13.516 14.0059 13.5869 13.9349C13.6579 13.8639 13.7999 13.7627 13.9025 13.71C14.0051 13.6572 14.1515 13.5483 14.2278 13.468C14.3041 13.3877 14.3956 13.322 14.4311 13.322C14.4666 13.322 14.5738 13.2688 14.6694 13.2038C14.9978 12.9807 15.0884 13.0758 14.9898 13.5402C14.8354 14.2669 13.6376 18.5371 13.5687 18.6061C13.5332 18.6417 10.6022 18.662 10.4333 18.6279V18.6279ZM5.56534 17.1842C5.07546 15.7594 4.68174 14.691 4.62595 14.6353C4.60595 14.6152 4.21791 14.5675 3.76364 14.5291C2.97057 14.4621 2.63952 14.3916 2.4087 14.2403C2.27501 14.1527 2.26767 13.9834 2.39612 13.9498C2.44809 13.9362 2.49061 13.9078 2.49061 13.8866C2.49061 13.8654 2.53238 13.8347 2.58343 13.8185C2.63448 13.8023 2.82363 13.7038 3.00376 13.5995C3.32883 13.4113 3.33331 13.4102 3.60466 13.4604C3.97629 13.5291 4.23877 13.5256 4.23813 13.4519C4.23784 13.4194 4.20578 13.2879 4.16687 13.1596C4.12796 13.0313 4.10726 12.8913 4.12086 12.8485C4.15208 12.7501 5.55776 11.7559 5.98141 11.5325C6.04927 11.4967 6.15793 11.4194 6.22289 11.3606C6.28785 11.3019 6.38464 11.2407 6.43797 11.2247C6.63865 11.1643 6.69683 11.2846 6.94003 12.2621C7.06889 12.7801 7.19282 13.2783 7.21543 13.3692C7.23804 13.4601 7.28832 13.6515 7.32716 13.7944C7.42271 14.146 7.58574 14.7614 7.65469 15.0306C7.68574 15.1519 7.72368 15.2637 7.739 15.279C7.77539 15.3154 7.98907 14.6115 8.13232 13.9834C8.19454 13.7105 8.27681 13.4129 8.31515 13.322C8.3535 13.231 8.42178 12.9865 8.46689 12.7786C8.51199 12.5708 8.56591 12.3582 8.58671 12.3062C8.6075 12.2542 8.75492 11.6909 8.91432 11.0542C9.37003 9.23414 9.40428 9.15013 9.77613 8.93974C9.91358 8.86197 10.0792 8.74501 10.1441 8.67983C10.2091 8.61465 10.4014 8.48486 10.5715 8.39141C10.7417 8.29795 10.9745 8.14134 11.0889 8.04338C11.2033 7.94542 11.4575 7.75821 11.6536 7.62735C12.106 7.32561 12.7989 6.85789 12.8607 6.81256C13.068 6.6605 13.1921 6.60955 13.3239 6.62231C13.4633 6.63581 13.4739 6.64887 13.4625 6.79351C13.4556 6.87963 13.4105 7.02845 13.3621 7.12422C13.283 7.28065 13.1003 7.81926 12.8301 8.69204C12.7778 8.86094 12.6968 9.08416 12.65 9.1881C12.6031 9.29204 12.5081 9.58575 12.4388 9.8408C12.2249 10.6275 10.7968 14.7072 10.5014 15.3749C10.4101 15.5815 10.3418 15.6553 10.1011 15.8076C9.64613 16.0954 7.98987 17.2246 7.54572 17.5498C7.10076 17.8755 6.56204 18.2353 6.51928 18.2353C6.50409 18.2353 6.42197 18.2885 6.3368 18.3534C6.03979 18.58 6.0512 18.5973 5.56534 17.1842ZM11.5754 14.613C11.5586 14.5691 11.6517 14.2177 11.7851 13.8217C11.9171 13.4299 12.125 12.8117 12.2471 12.4479C12.3692 12.0842 12.5432 11.5846 12.6338 11.3377C12.9198 10.5586 13.5921 8.59764 13.7837 7.98338C13.9856 7.33645 14.1325 6.88233 14.2353 6.58762C14.3347 6.30293 14.4599 6.28259 16.1142 6.28259C17.7145 6.28259 17.7718 6.2925 17.8482 6.58227C17.8767 6.69028 18.0595 7.25611 18.2544 7.83968C18.6149 8.91899 18.8301 9.45613 18.9257 9.51518C18.9549 9.53323 18.9788 9.60034 18.9788 9.6643C18.9788 9.77971 18.8033 9.93358 18.3902 10.1802C18.3032 10.2322 18.0758 10.3807 17.8849 10.5103C17.694 10.6399 17.5041 10.7675 17.4627 10.7938C17.4214 10.8201 17.2352 10.9426 17.0489 11.0661C16.8626 11.1895 16.6596 11.2905 16.5978 11.2905C16.4823 11.2905 16.4821 11.2901 16.3981 10.8535C16.3818 10.769 16.3518 10.6787 16.3314 10.6527C16.311 10.6267 16.2801 10.5204 16.2626 10.4164C16.2083 10.093 16.0963 9.73141 16.0503 9.73141C15.9888 9.73141 15.6981 10.7545 15.6024 11.3081C15.585 11.4087 15.5511 11.5257 15.527 11.5679C15.5029 11.6102 15.4377 11.7723 15.3821 11.9283C15.2577 12.2767 15.0428 12.4938 14.4703 12.8495C14.2403 12.9924 13.9115 13.197 13.7398 13.3042C13.5681 13.4114 13.3286 13.5868 13.2075 13.694C13.0865 13.8012 12.968 13.8889 12.9442 13.8889C12.9204 13.8889 12.6368 14.0693 12.3139 14.2899C11.6992 14.7097 11.625 14.7422 11.5754 14.613V14.613ZM1.76355 13.6275C1.72374 13.5877 1.68128 13.4867 1.6692 13.4031C1.56837 12.7054 1.54514 12.407 1.54541 11.813C1.54591 10.7241 1.65937 10.3141 2.05701 9.9641C2.26143 9.78416 2.61988 9.63692 2.85351 9.63692C2.9369 9.63692 2.96305 9.61049 2.96305 9.52621C2.96305 9.39651 2.82419 8.98885 2.68372 8.70613C2.62948 8.59695 2.58509 8.47897 2.58509 8.44395C2.58509 8.40893 2.47755 8.04117 2.34611 7.62671C2.21467 7.21225 2.09488 6.76265 2.07991 6.62761C2.05339 6.38823 2.05613 6.38112 2.18898 6.34414C2.34236 6.30145 4.81383 6.30996 5.12447 6.35424C5.27317 6.37544 5.32525 6.40429 5.32525 6.46543C5.32525 6.51084 5.35647 6.58927 5.39462 6.6397C5.43277 6.69014 5.46466 6.78553 5.46548 6.85168C5.46631 6.91782 5.61605 7.5131 5.79823 8.17451C6.43554 10.4882 6.44058 10.511 6.35354 10.6936C6.30233 10.8009 6.20675 10.8875 6.06206 10.9576C5.94365 11.0149 5.74537 11.1504 5.62144 11.2588C5.49751 11.3672 5.30045 11.5041 5.18352 11.5632C5.06659 11.6222 4.7709 11.8199 4.52643 12.0025C3.97809 12.412 3.91636 12.4137 3.79979 12.0227C3.60868 11.3818 3.417 10.8268 3.35964 10.7483C3.21289 10.5476 2.77637 10.8137 2.65018 11.1808C2.55987 11.4434 2.5168 12.0721 2.57526 12.2743C2.60287 12.3698 2.66915 12.5907 2.72253 12.7652C2.77592 12.9397 2.80757 13.1138 2.79287 13.1521C2.75678 13.2462 2.50451 13.4168 2.12706 13.6024C1.88986 13.7191 1.85736 13.7213 1.76355 13.6275V13.6275ZM9.74462 8.2733C9.71692 8.186 9.96196 7.15772 10.1284 6.66286C10.2046 6.43636 10.2344 6.40039 10.376 6.3643C10.5662 6.31583 12.53 6.33747 12.581 6.3886C12.6002 6.40793 12.5754 6.46902 12.5257 6.52435C12.4028 6.66135 11.2538 7.47637 11.0127 7.59762C10.9057 7.6514 10.7569 7.74555 10.682 7.80685C10.607 7.86815 10.45 7.97326 10.3331 8.04043C10.2161 8.1076 10.0799 8.20728 10.0305 8.26195C9.91915 8.38495 9.78179 8.39041 9.74462 8.2733V8.2733Z"/>`,
        discord: `<path d="M20.4528 5.98993C17.7026 3.93193 15.0677 3.98977 15.0677 3.98977L14.7984 4.29745C18.0679 5.27833 19.5874 6.72073 19.5874 6.72073C14.9095 4.14529 8.95128 4.16377 4.08576 6.72073C4.08576 6.72073 5.6628 5.20129 9.1248 4.22041L8.93256 3.98953C8.93256 3.98953 6.3168 3.93193 3.54744 5.98969C3.54744 5.98969 0.77784 10.9709 0.77784 17.1062C0.77784 17.1062 2.39352 19.8758 6.64392 20.0105C6.64392 20.0105 7.35552 19.1642 7.93248 18.4334C5.49 17.7026 4.56672 16.1832 4.56672 16.1832C6.10128 17.1434 7.65288 17.7444 9.58656 18.1258C12.7325 18.7733 16.6457 18.1075 19.5684 16.1832C19.5684 16.1832 18.6067 17.741 16.0872 18.4526C16.6642 19.1642 17.3566 19.9913 17.3566 19.9913C21.607 19.8566 23.2224 17.087 23.2224 17.1065C23.2222 10.9711 20.4528 5.98993 20.4528 5.98993ZM8.4132 15.3178C7.33608 15.3178 6.45144 14.3753 6.45144 13.2022C6.53016 10.3925 10.3159 10.4011 10.375 13.2022C10.375 14.3753 9.50928 15.3178 8.4132 15.3178ZM15.433 15.3178C14.3558 15.3178 13.4712 14.3753 13.4712 13.2022C13.5576 10.398 17.2961 10.3968 17.3947 13.2022C17.3947 14.3753 16.5293 15.3178 15.433 15.3178Z"/>`,
    };
    function getSocialIcon(name, properties) {
        properties.svg = SOCIAL_ICONS[name] || "";
        let text = createSVG(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }

    const TECH_ICONS = {
        "typescript": `<path d="M0 12V24H24V0H0V12ZM14.563 19.626C14.671 19.565 15.074 19.332 15.455 19.111L16.145 18.711L16.29 18.925C16.492 19.233 16.933 19.656 17.2 19.797C17.966 20.201 19.017 20.144 19.535 19.679C19.728 19.516 19.849 19.274 19.849 19.004C19.849 18.988 19.849 18.973 19.848 18.957V18.959C19.848 18.681 19.813 18.559 19.668 18.349C19.482 18.083 19.101 17.859 18.019 17.389C16.781 16.856 16.248 16.525 15.76 15.999C15.466 15.665 15.239 15.263 15.107 14.821L15.101 14.799C15.01 14.46 14.987 13.61 15.059 13.268C15.314 12.071 16.217 11.238 17.52 10.99C17.943 10.91 18.926 10.94 19.341 11.043C19.951 11.195 20.415 11.467 20.842 11.909C21.063 12.145 21.391 12.575 21.417 12.679C21.425 12.709 20.381 13.409 19.749 13.802C19.726 13.817 19.634 13.718 19.532 13.566C19.222 13.116 18.899 12.922 18.404 12.888C17.676 12.838 17.208 13.219 17.212 13.855C17.212 13.866 17.211 13.879 17.211 13.892C17.211 14.043 17.249 14.185 17.316 14.309L17.314 14.304C17.474 14.635 17.772 14.834 18.704 15.237C20.423 15.977 21.158 16.464 21.615 17.157C22.125 17.93 22.24 19.165 21.893 20.083C21.513 21.081 20.568 21.759 19.238 21.983C18.827 22.056 17.852 22.045 17.41 21.965C16.446 21.793 15.532 21.317 14.968 20.692C14.747 20.449 14.316 19.812 14.343 19.767C14.354 19.751 14.453 19.69 14.563 19.626ZM5.258 12.065C5.258 11.531 5.269 11.085 5.284 11.075C5.296 11.059 7.197 11.051 9.501 11.055L13.696 11.067L13.707 12.046L13.715 13.029H10.59V21.905H8.38V13.029H5.258V12.065Z"/>`,
        "javascript": `<path d="M0 0H24V24H0V0Z" /><path d="M6.31064 20.0562L8.1472 18.9447C8.50158 19.5729 8.82389 20.1045 9.59705 20.1045C10.3381 20.1045 10.8055 19.8146 10.8055 18.687V11.0184H13.0608V18.7188C13.0608 21.0548 11.6915 22.1181 9.6937 22.1181C7.88948 22.1181 6.8422 21.1837 6.31055 20.056L6.31064 20.0562ZM14.2859 19.8145L16.1222 18.7513C16.6057 19.5407 17.234 20.1207 18.3455 20.1207C19.2801 20.1207 19.876 19.6534 19.876 19.009C19.876 18.2357 19.2638 17.9618 18.2327 17.5109L17.669 17.269C16.0418 16.5765 14.9625 15.7065 14.9625 13.8699C14.9625 12.1783 16.2512 10.8894 18.2651 10.8894C19.6989 10.8894 20.73 11.3889 21.471 12.6938L19.7148 13.8216C19.3281 13.1289 18.9094 12.8551 18.265 12.8551C17.6044 12.8551 17.1855 13.2739 17.1855 13.8216C17.1855 14.4982 17.6044 14.7722 18.571 15.1911L19.1348 15.4327C21.052 16.2544 22.1313 17.0921 22.1313 18.9768C22.1313 21.0069 20.5365 22.1184 18.3938 22.1184C16.2995 22.1184 14.9462 21.1196 14.2858 19.8146" fill="#272727"/>`,
        "mariadb": `<g clip-path="url(#clip0_1086_271)"><path d="M21.538 5.00036C21.214 5.01078 21.3164 5.10412 20.6164 5.27637C19.9094 5.45034 19.0459 5.39694 18.2846 5.71626C16.0121 6.66938 15.5561 9.92678 13.4902 11.0936C11.946 11.9659 10.3879 12.0354 8.98722 12.4744C8.06667 12.7631 7.05968 13.355 6.22566 14.0738C5.57834 14.6318 5.56144 15.1226 4.885 15.8225C4.16155 16.5712 2.00952 15.8352 1.03418 16.981C1.34833 17.2987 1.48613 17.3877 2.10524 17.3053C1.97712 17.5482 1.22144 17.753 1.36933 18.1104C1.52501 18.4865 3.35182 18.7414 5.01254 17.7389C5.78594 17.2719 6.40201 16.5988 7.60644 16.4382C9.16512 16.2304 10.9608 16.5714 12.7652 16.8317C12.4976 17.6294 11.9605 18.16 11.5302 18.7953C11.3969 18.9389 11.7978 18.9549 12.2552 18.8682C13.0779 18.6648 13.6707 18.5009 14.2916 18.1395C15.0545 17.6955 15.1701 16.5571 16.106 16.3107C16.6274 17.1122 18.0458 17.3015 18.9258 16.6604C18.1535 16.4418 17.9401 14.7981 18.2008 14.0738C18.4477 13.3881 18.6917 12.2914 18.9404 11.3851C19.2074 10.4118 19.3058 9.18496 19.6289 8.68912C20.115 7.9432 20.6521 7.68704 21.1184 7.26643C21.5848 6.84573 22.0117 6.43635 21.9976 5.4738C21.9931 5.16375 21.8328 4.99101 21.538 5.00036V5.00036Z"/><path d="M18.4277 6.88122C18.8011 7.20537 19.5847 6.9452 19.4447 6.30017C18.8644 6.2521 18.5283 6.44904 18.4277 6.88122ZM21.0312 6.12735C20.9319 6.33569 20.7417 6.60431 20.7417 7.13459C20.7409 7.22563 20.6725 7.28805 20.6714 7.14771C20.6766 6.62933 20.8137 6.40532 20.9595 6.11086C21.0272 5.99021 21.068 6.03999 21.0312 6.12735V6.12735Z"/><path d="M20.9307 6.0489C20.8134 6.24764 20.5313 6.61026 20.4847 7.13858C20.476 7.22913 20.4024 7.28524 20.4135 7.14522C20.4644 6.62946 20.6899 6.30661 20.861 6.02601C20.9387 5.91192 20.9752 5.96507 20.9307 6.0489ZM20.8394 5.94489C20.706 6.13305 20.2716 6.56852 20.1808 7.09117C20.1645 7.18057 20.0864 7.23044 20.1094 7.09183C20.2034 6.58205 20.5778 6.18136 20.7718 5.91635C20.8588 5.80889 20.8906 5.86508 20.8394 5.94489V5.94489ZM20.7581 5.82891C20.5995 5.9964 20.0817 6.5517 19.9185 7.05631C19.8896 7.14252 19.8053 7.18098 19.8476 7.04696C20.0122 6.55547 20.4657 6.02601 20.6951 5.79101C20.7964 5.69693 20.82 5.75697 20.7581 5.82891Z" /></g><defs><clipPath id="clip0_1086_271"><rect width="21" height="13.944" transform="translate(1 5)"/></clipPath></defs>`,
        "html": `<path d="M1.69336 0.375L3.5693 21.3924L11.9873 23.7176L20.4285 21.3951L22.3064 0.375H1.69336V0.375ZM18.4045 5.35106L18.2869 6.69581L18.2352 7.3125H8.36048L8.59617 9.9375H18.0004L17.9374 10.5883L17.3312 17.3606L17.2866 17.7862L11.9999 19.2392V19.2396L11.9935 19.2429L6.7103 17.8511L6.35161 13.875H8.94192L9.12548 15.9223L11.9918 16.6875H11.9999V16.5851L14.8789 15.8586L15.1797 12.5625H6.2363L5.60198 5.41556L5.5403 4.6875H18.4664L18.4045 5.35106V5.35106Z"/>`,
        "css": `<path d="M22 3L19 18.1L9.9 21.1L2 18.1L2.8 14H6.2L5.8 15.7L10.6 17.5L16.1 15.7L16.9 11.9H3.2L3.9 8.5H17.5L18 6.4H4.3L5 3H22Z" />`,
        "go": `<path d="M14.4379 10.3126C14.4848 10.4063 14.3911 10.4063 14.3442 10.4063L12.7504 10.8282C12.6098 10.9219 12.5161 10.7813 12.5161 10.7813C11.5317 9.56255 9.46918 10.4063 9.37543 12.1876C9.28168 13.8751 11.4848 14.5313 12.5161 12.8438H10.7348C10.5942 12.8438 10.3598 12.7969 10.5942 12.3751L10.9692 11.5782C11.0629 11.3907 11.1098 11.3907 11.3911 11.3907H14.6723C14.6723 15.1876 10.4536 16.8751 8.20355 14.5782C7.1723 13.5001 6.84418 11.0626 8.95355 9.32817C10.6411 7.9688 13.4536 7.9688 14.4379 10.3126ZM15.1879 14.8126C13.0786 12.9844 14.2036 9.18755 17.5317 8.57817C20.9536 7.9688 22.4536 11.1563 21.0942 13.5469C19.9692 15.5626 16.9692 16.4063 15.1879 14.8126ZM19.5942 12.4219C20.0161 11.2501 19.1723 10.1251 17.9067 10.2188C16.5004 10.3594 15.5161 12.1876 16.4067 13.2657C17.2973 14.2969 19.1254 13.8282 19.5942 12.4219ZM4.5473 12.3282V12.2813L4.64105 12.0469L4.7348 12.0001H6.65668L6.70355 12.0469L6.65668 12.2813L6.6098 12.3282H4.5473ZM2.2973 11.4844C2.2973 11.4844 2.20355 11.4844 2.25043 11.4376L2.43793 11.1563L2.53168 11.1094H6.84418L6.89105 11.1563L6.7973 11.3907L6.75043 11.4376L2.2973 11.4844ZM3.70355 10.5938L3.65668 10.5469L3.89105 10.3126L3.9848 10.2657H7.3598V10.3126L7.21918 10.5469L7.12543 10.5938H3.70355Z" />`,
        "c#": `<path d="M21.6375 5.75623L12.5813 0.543726C12.4313 0.449976 12.225 0.412476 12 0.412476C11.775 0.412476 11.5688 0.468726 11.4188 0.543726L2.41875 5.77498C2.1 5.96248 1.875 6.43123 1.875 6.78748V17.2312C1.875 17.4375 1.9125 17.6812 2.0625 17.8875L22.0875 6.26248C21.975 6.03748 21.8063 5.86873 21.6375 5.75623V5.75623Z" /><path d="M2.00586 17.8688C2.09961 18.0188 2.23086 18.15 2.36211 18.225L11.3996 23.4563C11.5496 23.55 11.7559 23.5875 11.9809 23.5875C12.2059 23.5875 12.4121 23.5313 12.5621 23.4563L21.5621 18.225C21.8809 18.0375 22.1059 17.5688 22.1059 17.2125V6.76877C22.1059 6.60002 22.0871 6.41252 21.9934 6.24377L2.00586 17.8688V17.8688Z" /><path d="M15.9937 14.2687C15.2062 15.6562 13.7062 16.5938 12 16.5938C9.46875 16.5938 7.40625 14.5312 7.40625 12C7.40625 9.46875 9.46875 7.40625 12 7.40625C13.7062 7.40625 15.2062 8.34375 15.9937 9.75L18.4312 8.34375C17.1562 6.1125 14.7562 4.59375 12 4.59375C7.9125 4.59375 4.59375 7.9125 4.59375 12C4.59375 16.0875 7.9125 19.4062 12 19.4062C14.7375 19.4062 17.1375 17.9062 18.4125 15.6937L15.9937 14.2687V14.2687ZM18.1875 12.4125L18.3562 11.6063H17.5687V10.725H18.525L18.75 9.5625H19.6687L19.4437 10.7062H20.1562L20.3812 9.5625H21.2812L21.0562 10.7062H21.5062V11.5875H20.8875L20.7187 12.3937H21.5062V13.275H20.55L20.325 14.4H19.4062L19.6312 13.275H18.9187L18.6937 14.4H17.7937L18.0187 13.275H17.5687V12.3937H18.1875V12.4125ZM19.0875 12.4125H19.8L19.9687 11.6063H19.2562L19.0875 12.4125Z" fill="#272727"/>`,
        "java": `<path d="M8.92775 18.3975C8.92775 18.3975 8.03394 18.9176 9.56469 19.0931C11.4194 19.305 12.3673 19.2746 14.4106 18.8884C14.4106 18.8884 14.9489 19.225 15.6993 19.5167C11.117 21.4798 5.32907 19.4029 8.92775 18.3975ZM8.36751 15.8353C8.36751 15.8353 7.36475 16.5776 8.89682 16.7363C10.8781 16.9408 12.4424 16.9575 15.1507 16.4363C15.1507 16.4363 15.5244 16.816 16.1129 17.0233C10.5738 18.6433 4.40432 17.1508 8.36751 15.8353V15.8353Z" /><path d="M13.088 11.4883C14.2177 12.7886 12.7917 13.9577 12.7917 13.9577C12.7917 13.9577 15.6584 12.4781 14.3422 10.6245C13.1123 8.89668 12.1696 8.0385 17.2737 5.07825C17.2737 5.07843 9.26166 7.07887 13.088 11.4883V11.4883Z" /><path d="M19.148 20.2929C19.148 20.2929 19.8096 20.8386 18.419 21.2602C15.7748 22.0612 7.41158 22.3027 5.08883 21.2923C4.25427 20.9289 5.81989 20.4251 6.31246 20.3188C6.82602 20.2076 7.11927 20.2279 7.11927 20.2279C6.19058 19.5741 1.11683 21.5122 4.54246 22.0682C13.8839 23.5824 21.5706 21.3862 19.148 20.2929V20.2929ZM9.35839 13.1801C9.35839 13.1801 5.10477 14.1906 7.85221 14.5579C9.01246 14.7131 11.3243 14.6775 13.4793 14.4967C15.2399 14.3488 17.0067 14.0329 17.0067 14.0329C17.0067 14.0329 16.3865 14.2989 15.9372 14.6053C11.6168 15.7417 3.27271 15.2124 5.67514 14.0507C7.70614 13.0684 9.35839 13.1801 9.35839 13.1801V13.1801ZM16.9891 17.4452C21.3805 15.1639 19.3499 12.9714 17.9326 13.2667C17.5861 13.3389 17.4306 13.4017 17.4306 13.4017C17.4306 13.4017 17.5596 13.1994 17.8056 13.1124C20.6093 12.1271 22.7652 16.0192 16.9013 17.5609C16.9013 17.5605 16.9686 17.4996 16.9891 17.4452V17.4452Z" /><path d="M14.342 0.297607C14.342 0.297607 16.7735 2.73061 12.0352 6.47067C8.23535 9.4718 11.1688 11.1825 12.0339 13.138C9.8156 11.1368 8.18847 9.37486 9.27991 7.73517C10.8827 5.3288 15.3228 4.16161 14.342 0.297607V0.297607Z" /><path d="M9.79026 23.629C14.0045 23.8984 20.4778 23.479 20.6309 21.4847C20.6309 21.4847 20.3364 22.2407 17.1478 22.8406C13.5504 23.5178 9.11263 23.4389 6.48145 23.0044C6.48145 23.0046 7.02051 23.4509 9.79026 23.629V23.629Z"/>`,
        "python": `<g clip-path="url(#clip0_1086_319)"><path d="M11.8973 0.00671387C5.8199 0.00671387 6.19937 2.64224 6.19937 2.64224L6.20612 5.37272H12.0057V6.19248H3.90262C3.90262 6.19248 0.0136719 5.75143 0.0136719 11.8835C0.0136719 18.0157 3.40804 17.7983 3.40804 17.7983H5.43378V14.9527C5.43378 14.9527 5.32457 11.5583 8.77397 11.5583H14.5261C14.5261 11.5583 17.7578 11.6105 17.7578 8.43495V3.18434C17.7578 3.18434 18.2487 0.00671387 11.8973 0.00671387ZM8.69944 1.84291C8.83649 1.84279 8.97222 1.86969 9.09886 1.92208C9.2255 1.97447 9.34056 2.05131 9.43747 2.14822C9.53438 2.24513 9.61122 2.36019 9.66361 2.48683C9.716 2.61347 9.7429 2.7492 9.74278 2.88624C9.7429 3.02329 9.716 3.15902 9.66361 3.28566C9.61122 3.4123 9.53438 3.52736 9.43747 3.62427C9.34056 3.72118 9.2255 3.79802 9.09886 3.85041C8.97222 3.9028 8.83649 3.9297 8.69944 3.92958C8.56239 3.9297 8.42667 3.9028 8.30003 3.85041C8.17339 3.79802 8.05832 3.72118 7.96142 3.62427C7.86451 3.52736 7.78766 3.4123 7.73527 3.28566C7.68288 3.15902 7.65598 3.02329 7.6561 2.88624C7.65598 2.7492 7.68288 2.61347 7.73527 2.48683C7.78766 2.36019 7.86451 2.24513 7.96142 2.14822C8.05832 2.05131 8.17339 1.97447 8.30003 1.92208C8.42667 1.86969 8.56239 1.84279 8.69944 1.84291V1.84291Z"/><path d="M12.0696 23.8222C18.147 23.8222 17.7676 21.1866 17.7676 21.1866L17.7608 18.4562H11.9611V17.6364H20.0642C20.0642 17.6364 23.9532 18.0775 23.9532 11.9452C23.9532 5.81301 20.5588 6.0305 20.5588 6.0305H18.533V8.87602C18.533 8.87602 18.6423 12.2704 15.1929 12.2704H9.44071C9.44071 12.2704 6.20899 12.2182 6.20899 15.3939V20.6446C6.20899 20.6446 5.71825 23.8222 12.0695 23.8222H12.0696ZM15.2675 21.9861C15.1304 21.9863 14.9947 21.9594 14.8681 21.907C14.7414 21.8546 14.6264 21.7777 14.5295 21.6808C14.4325 21.5839 14.3557 21.4689 14.3033 21.3422C14.2509 21.2156 14.224 21.0798 14.2241 20.9428C14.224 20.8057 14.2509 20.67 14.3033 20.5434C14.3557 20.4167 14.4325 20.3016 14.5294 20.2047C14.6263 20.1078 14.7414 20.0309 14.868 19.9785C14.9947 19.9261 15.1304 19.8992 15.2675 19.8994C15.4045 19.8992 15.5403 19.9261 15.6669 19.9785C15.7935 20.0309 15.9086 20.1078 16.0055 20.2047C16.1024 20.3016 16.1793 20.4166 16.2316 20.5433C16.284 20.6699 16.3109 20.8057 16.3108 20.9427C16.3109 21.0798 16.284 21.2155 16.2316 21.3421C16.1793 21.4688 16.1024 21.5838 16.0055 21.6807C15.9086 21.7776 15.7935 21.8545 15.6669 21.9069C15.5403 21.9593 15.4045 21.9862 15.2675 21.986V21.9861Z"/></g>`,
        "electron": `<path d="M9.20104 6.12369C6.50666 5.63244 4.37854 6.14619 3.52916 7.62369C2.89541 8.72057 3.07729 10.1756 3.96791 11.7299C3.98601 11.7615 4.01014 11.7891 4.03892 11.8113C4.0677 11.8335 4.10057 11.8498 4.13566 11.8593C4.17074 11.8688 4.20735 11.8713 4.24339 11.8666C4.27944 11.8619 4.31421 11.8502 4.34573 11.8321C4.37724 11.814 4.40489 11.7899 4.42708 11.7611C4.44927 11.7323 4.46558 11.6995 4.47507 11.6644C4.48456 11.6293 4.48704 11.5927 4.48238 11.5567C4.47772 11.5206 4.46601 11.4858 4.44791 11.4543C3.64541 10.0537 3.48791 8.79745 4.00729 7.89182C4.71229 6.67119 6.61166 6.20432 9.10166 6.66557C9.17377 6.67875 9.24816 6.66274 9.30846 6.62107C9.36877 6.57941 9.41005 6.51549 9.42323 6.44338C9.4364 6.37128 9.4204 6.29689 9.37873 6.23658C9.33706 6.17628 9.27314 6.135 9.20104 6.12182V6.12369ZM5.36854 13.6143C6.56992 14.9018 7.96097 15.9982 9.49354 16.8656C13.401 19.1156 17.556 19.7249 19.6185 18.3262C19.679 18.2849 19.7205 18.2213 19.734 18.1494C19.7476 18.0775 19.732 18.0032 19.6907 17.9428C19.6495 17.8823 19.5859 17.8408 19.514 17.8273C19.442 17.8137 19.3677 17.8293 19.3073 17.8706C17.4585 19.1249 13.5004 18.5474 9.76354 16.3856C8.28263 15.5462 6.93842 14.4859 5.77729 13.2412C5.72756 13.187 5.65834 13.1548 5.58485 13.1516C5.51135 13.1484 5.43962 13.1746 5.38541 13.2243C5.33121 13.274 5.29898 13.3433 5.29582 13.4168C5.29265 13.4903 5.31881 13.562 5.36854 13.6162V13.6143Z"/><path d="M18.949 13.2769C20.7134 11.1937 21.3284 9.09749 20.4809 7.63124C19.8584 6.55124 18.5403 5.98124 16.789 5.95874C16.7157 5.95874 16.6453 5.98788 16.5935 6.03974C16.5416 6.09161 16.5125 6.16195 16.5125 6.2353C16.5125 6.30865 16.5416 6.379 16.5935 6.43086C16.6453 6.48273 16.7157 6.51187 16.789 6.51187C18.364 6.53249 19.4984 7.02374 20.0103 7.90874C20.7134 9.12749 20.164 10.9969 18.5347 12.9225C18.5113 12.9502 18.4936 12.9822 18.4826 13.0168C18.4715 13.0513 18.4674 13.0877 18.4705 13.1238C18.4735 13.1599 18.4837 13.1951 18.5003 13.2273C18.517 13.2595 18.5398 13.2882 18.5675 13.3116C18.5952 13.3349 18.6272 13.3527 18.6618 13.3637C18.6963 13.3747 18.7327 13.3788 18.7688 13.3757C18.8049 13.3727 18.8401 13.3625 18.8723 13.3459C18.9045 13.3293 18.9331 13.3064 18.9565 13.2787L18.949 13.2769ZM14.4172 6.21562C12.686 6.60849 11.0258 7.26623 9.49529 8.16562C5.46216 10.5 2.82966 13.9294 3.18779 16.4194C3.19848 16.494 3.23836 16.5612 3.29867 16.6064C3.35897 16.6516 3.43476 16.671 3.50935 16.6603C3.58394 16.6496 3.65123 16.6097 3.69642 16.5494C3.7416 16.4891 3.76098 16.4133 3.75029 16.3387C3.41841 14.1281 5.91216 10.875 9.77091 8.64562C11.2514 7.77243 12.8578 7.13302 14.5334 6.74999C14.5689 6.74236 14.6025 6.72782 14.6323 6.70719C14.6622 6.68657 14.6876 6.66028 14.7073 6.62981C14.727 6.59934 14.7405 6.56529 14.747 6.52961C14.7535 6.49394 14.7529 6.45732 14.7453 6.42187C14.7377 6.38641 14.7231 6.3528 14.7025 6.32297C14.6819 6.29313 14.6556 6.26765 14.6251 6.24797C14.5946 6.2283 14.5606 6.21482 14.5249 6.2083C14.4892 6.20178 14.4526 6.20236 14.4172 6.20999V6.21562Z"/><path d="M7.87531 18.1462C8.81281 20.7206 10.3128 22.3125 12.0097 22.3125C13.2472 22.3125 14.3909 21.4687 15.2834 19.9837C15.3227 19.9213 15.3356 19.8459 15.3193 19.7739C15.3029 19.702 15.2587 19.6396 15.1963 19.6003C15.1338 19.561 15.0584 19.5481 14.9865 19.5645C14.9146 19.5808 14.8521 19.6251 14.8128 19.6875C14.0103 21.0225 13.0259 21.75 12.0116 21.75C10.6016 21.75 9.25719 20.3362 8.40406 17.955C8.3792 17.8861 8.32799 17.8299 8.26171 17.7988C8.19543 17.7677 8.1195 17.7642 8.05063 17.789C7.98175 17.8139 7.92558 17.8651 7.89446 17.9314C7.86334 17.9977 7.85982 18.0736 7.88469 18.1425L7.87531 18.1462ZM16.3128 17.6418C16.8116 15.9818 17.0587 14.2564 17.0459 12.5231C17.0459 7.94622 15.4447 4.00309 13.1628 2.98872C13.0957 2.95888 13.0194 2.95693 12.9509 2.98331C12.8823 3.00968 12.827 3.06221 12.7972 3.12934C12.7674 3.19648 12.7654 3.27271 12.7918 3.34128C12.8182 3.40985 12.8707 3.46513 12.9378 3.49497C14.9722 4.39872 16.5003 8.14122 16.5003 12.5231C16.5128 14.2005 16.2739 15.8703 15.7916 17.4768C15.7697 17.5467 15.7765 17.6224 15.8104 17.6873C15.8443 17.7522 15.9026 17.8009 15.9725 17.8228C16.0424 17.8447 16.1181 17.8379 16.1829 17.804C16.2478 17.77 16.2966 17.7117 16.3184 17.6418H16.3128ZM21.5084 17.3718C21.5084 17.1104 21.4309 16.8548 21.2857 16.6375C21.1404 16.4201 20.934 16.2506 20.6924 16.1506C20.4509 16.0505 20.1851 16.0244 19.9287 16.0754C19.6723 16.1264 19.4367 16.2523 19.2519 16.4371C19.067 16.622 18.9411 16.8575 18.8901 17.114C18.8391 17.3704 18.8653 17.6362 18.9653 17.8777C19.0654 18.1192 19.2348 18.3257 19.4522 18.4709C19.6696 18.6162 19.9251 18.6937 20.1866 18.6937C20.3602 18.6937 20.532 18.6595 20.6924 18.5931C20.8528 18.5267 20.9985 18.4293 21.1213 18.3066C21.244 18.1838 21.3414 18.0381 21.4078 17.8777C21.4742 17.7173 21.5084 17.5454 21.5084 17.3718V17.3718ZM20.9553 17.3718C20.9553 17.5239 20.9102 17.6725 20.8258 17.7989C20.7413 17.9254 20.6212 18.0239 20.4808 18.0821C20.3403 18.1403 20.1857 18.1555 20.0366 18.1258C19.8875 18.0962 19.7505 18.0229 19.643 17.9154C19.5355 17.8079 19.4622 17.6709 19.4326 17.5218C19.4029 17.3727 19.4181 17.2181 19.4763 17.0777C19.5345 16.9372 19.633 16.8171 19.7595 16.7327C19.8859 16.6482 20.0345 16.6031 20.1866 16.6031C20.3904 16.6031 20.586 16.6841 20.7302 16.8283C20.8743 16.9724 20.9553 17.168 20.9553 17.3718V17.3718ZM3.81406 18.6937C4.0755 18.6937 4.33108 18.6162 4.54846 18.4709C4.76584 18.3257 4.93527 18.1192 5.03532 17.8777C5.13537 17.6362 5.16154 17.3704 5.11054 17.114C5.05953 16.8575 4.93364 16.622 4.74877 16.4371C4.5639 16.2523 4.32837 16.1264 4.07195 16.0754C3.81553 16.0244 3.54974 16.0505 3.3082 16.1506C3.06666 16.2506 2.86021 16.4201 2.71496 16.6375C2.56971 16.8548 2.49219 17.1104 2.49219 17.3718C2.49219 17.7224 2.63146 18.0587 2.87936 18.3066C3.12726 18.5545 3.46348 18.6937 3.81406 18.6937V18.6937ZM3.81406 18.1406C3.66202 18.1406 3.51339 18.0955 3.38697 18.011C3.26055 17.9266 3.16201 17.8065 3.10383 17.666C3.04565 17.5256 3.03042 17.371 3.06008 17.2219C3.08975 17.0727 3.16296 16.9358 3.27047 16.8283C3.37799 16.7207 3.51496 16.6475 3.66409 16.6179C3.81321 16.5882 3.96778 16.6034 4.10825 16.6616C4.24872 16.7198 4.36878 16.8183 4.45325 16.9448C4.53773 17.0712 4.58281 17.2198 4.58281 17.3718C4.58281 17.5757 4.50182 17.7713 4.35765 17.9154C4.21348 18.0596 4.01795 18.1406 3.81406 18.1406V18.1406Z"/><path d="M12.0094 4.33687C12.2708 4.33687 12.5264 4.25934 12.7438 4.11409C12.9611 3.96884 13.1306 3.76239 13.2306 3.52085C13.3307 3.27931 13.3569 3.01352 13.3059 2.75711C13.2548 2.50069 13.1289 2.26515 12.9441 2.08028C12.7592 1.89542 12.5237 1.76952 12.2673 1.71852C12.0108 1.66751 11.7451 1.69369 11.5035 1.79374C11.262 1.89379 11.0555 2.06322 10.9103 2.2806C10.765 2.49798 10.6875 2.75355 10.6875 3.01499C10.6875 3.36557 10.8268 3.7018 11.0747 3.9497C11.3226 4.1976 11.6588 4.33687 12.0094 4.33687V4.33687ZM12.0094 3.78374C11.8573 3.78374 11.7087 3.73865 11.5823 3.65418C11.4559 3.56971 11.3573 3.44965 11.2991 3.30918C11.241 3.16871 11.2257 3.01414 11.2554 2.86501C11.2851 2.71589 11.3583 2.57891 11.4658 2.4714C11.5733 2.36389 11.7103 2.29067 11.8594 2.26101C12.0085 2.23135 12.1631 2.24657 12.3036 2.30476C12.444 2.36294 12.5641 2.46148 12.6486 2.5879C12.733 2.71432 12.7781 2.86295 12.7781 3.01499C12.7781 3.21888 12.6971 3.41441 12.553 3.55858C12.4088 3.70275 12.2133 3.78374 12.0094 3.78374V3.78374ZM12.2119 13.4569C12.0271 13.4982 11.8341 13.4838 11.6576 13.4153C11.481 13.3469 11.3287 13.2276 11.22 13.0725C11.1113 12.9174 11.0511 12.7336 11.047 12.5442C11.043 12.3549 11.0952 12.1686 11.1971 12.009C11.2991 11.8494 11.4461 11.7237 11.6196 11.6477C11.7931 11.5718 11.9852 11.549 12.1716 11.5824C12.358 11.6158 12.5303 11.7038 12.6667 11.8352C12.803 11.9666 12.8973 12.1356 12.9375 12.3206C12.9911 12.5674 12.9449 12.8255 12.809 13.0384C12.673 13.2513 12.4584 13.4017 12.2119 13.4569V13.4569Z" />`,
        "nodejs": `<path d="M12.5014 18.9999C12.4294 18.9999 12.3623 18.9807 12.2998 18.9471L11.6616 18.568C11.5656 18.5152 11.6136 18.496 11.6424 18.4864C11.772 18.4433 11.796 18.4336 11.9304 18.3569C11.9448 18.3473 11.964 18.3521 11.9784 18.3617L12.4678 18.6544C12.487 18.664 12.511 18.664 12.5254 18.6544L14.4401 17.5459C14.4593 17.5363 14.469 17.517 14.469 17.4931V15.2808C14.469 15.2568 14.4593 15.2376 14.4401 15.228L12.5254 14.1243C12.5062 14.1147 12.4822 14.1147 12.4678 14.1243L10.5531 15.228C10.5339 15.2376 10.5243 15.2616 10.5243 15.2808V17.493C10.5243 17.5123 10.5339 17.5362 10.5531 17.5459L11.0762 17.8482C11.3593 17.9921 11.5369 17.8242 11.5369 17.6562V15.4727C11.5369 15.444 11.5609 15.4151 11.5944 15.4151H11.8392C11.868 15.4151 11.8968 15.4391 11.8968 15.4727V17.6562C11.8968 18.0353 11.6904 18.2561 11.3305 18.2561C11.2201 18.2561 11.1338 18.2561 10.889 18.1361L10.3851 17.8482C10.2604 17.7762 10.1836 17.6418 10.1836 17.4979V15.2856C10.1836 15.1416 10.2604 15.0072 10.3851 14.9353L12.2998 13.8268C12.4198 13.7596 12.583 13.7596 12.703 13.8268L14.6177 14.9353C14.7425 15.0072 14.8193 15.1416 14.8193 15.2856V17.4979C14.8193 17.6418 14.7425 17.7762 14.6177 17.8482L12.703 18.9567C12.6406 18.9855 12.5686 18.9999 12.5014 18.9999H12.5014ZM13.0917 17.4787C12.2519 17.4787 12.0791 17.0948 12.0791 16.7685C12.0791 16.7396 12.1031 16.7109 12.1367 16.7109H12.3863C12.415 16.7109 12.439 16.73 12.439 16.7589C12.4774 17.0132 12.5878 17.1379 13.0965 17.1379C13.4996 17.1379 13.6724 17.0468 13.6724 16.8308C13.6724 16.706 13.6243 16.6149 12.9957 16.5525C12.4726 16.4997 12.1463 16.3845 12.1463 15.967C12.1463 15.5783 12.4727 15.348 13.0197 15.348C13.6339 15.348 13.9363 15.5591 13.9747 16.0198C13.9747 16.0342 13.9699 16.0486 13.9603 16.063C13.9507 16.0726 13.9363 16.0822 13.9219 16.0822H13.6723C13.6483 16.0822 13.6243 16.063 13.6196 16.039C13.562 15.7751 13.4132 15.6887 13.0197 15.6887C12.5782 15.6887 12.5254 15.8423 12.5254 15.9574C12.5254 16.0966 12.5878 16.1398 13.1828 16.2166C13.7731 16.2934 14.0515 16.4037 14.0515 16.8164C14.0466 17.2387 13.7011 17.4787 13.0917 17.4787Z" /><path d="M6.55891 10.3478C6.55891 10.2614 6.51091 10.1798 6.43413 10.1366L4.39943 8.96572C4.3658 8.94649 4.32743 8.9369 4.28906 8.93208H4.26984C4.23147 8.93208 4.19307 8.94649 4.15948 8.96572L2.12477 10.1366C2.04796 10.1798 2 10.2614 2 10.3478L2.00482 13.4958C2.00482 13.539 2.02882 13.5822 2.06718 13.6014C2.10559 13.6254 2.15355 13.6254 2.18718 13.6014L3.39648 12.9104C3.47326 12.8672 3.52125 12.7856 3.52125 12.6992V11.226C3.52125 11.1396 3.56921 11.058 3.64603 11.0148L4.15948 10.7173C4.19788 10.6933 4.24107 10.6837 4.28425 10.6837C4.32743 10.6837 4.37061 10.6933 4.40424 10.7173L4.9177 11.0148C4.99451 11.058 5.04247 11.1396 5.04247 11.226V12.6992C5.04247 12.7856 5.09047 12.8672 5.16724 12.9104L6.37654 13.6014C6.41495 13.6254 6.46291 13.6254 6.50132 13.6014C6.53972 13.5822 6.56372 13.539 6.56372 13.4958L6.55891 10.3478ZM16.3389 6.01442C16.3006 5.99519 16.2526 5.99519 16.2189 6.01442C16.1806 6.03842 16.1566 6.07678 16.1566 6.11997V9.23926C16.1566 9.26803 16.1422 9.29681 16.1134 9.31603C16.0846 9.3304 16.0558 9.3304 16.027 9.31603L15.5184 9.02331C15.4811 9.00207 15.4389 8.99091 15.396 8.99091C15.3531 8.99091 15.3109 9.00207 15.2736 9.02331L13.2389 10.199C13.1621 10.2422 13.1141 10.3238 13.1141 10.4102V12.7568C13.1141 12.8431 13.1621 12.9248 13.2389 12.968L15.2736 14.1437C15.3109 14.1649 15.3531 14.1761 15.396 14.1761C15.4389 14.1761 15.4811 14.1649 15.5184 14.1437L17.5531 12.968C17.6298 12.9248 17.6778 12.8432 17.6778 12.7568V6.907C17.6778 6.81582 17.6298 6.73427 17.5531 6.69105L16.339 6.01442H16.3389ZM16.1518 11.9842C16.1518 12.0082 16.1422 12.0274 16.123 12.037L15.4272 12.4401C15.4175 12.4448 15.4068 12.4473 15.396 12.4473C15.3852 12.4473 15.3745 12.4448 15.3648 12.4401L14.669 12.037C14.6497 12.0274 14.6401 12.0034 14.6401 11.9842V11.178C14.6401 11.154 14.6497 11.1348 14.669 11.1252L15.3648 10.7221C15.3745 10.7173 15.3852 10.7149 15.396 10.7149C15.4068 10.7149 15.4175 10.7173 15.4272 10.7221L16.123 11.1252C16.1422 11.1348 16.1518 11.1588 16.1518 11.178V11.9842ZM23.1101 11.1588C23.1869 11.1156 23.2301 11.034 23.2301 10.9476V10.3766C23.2301 10.2902 23.1821 10.2086 23.1101 10.1654L21.0898 8.99453C21.0525 8.97331 21.0103 8.96214 20.9674 8.96214C20.9245 8.96214 20.8824 8.97331 20.8451 8.99453L18.8104 10.1702C18.7335 10.2134 18.6856 10.295 18.6856 10.3814V12.728C18.6856 12.8144 18.7335 12.896 18.8104 12.9391L20.8307 14.0909C20.9075 14.134 20.9986 14.134 21.0706 14.0909L22.2943 13.4095C22.3327 13.3903 22.3567 13.3471 22.3567 13.3039C22.3567 13.2607 22.3327 13.2175 22.2943 13.1983L20.25 12.0226C20.2116 11.9986 20.1876 11.9602 20.1876 11.9171V11.1828C20.1876 11.1397 20.2116 11.0965 20.25 11.0772L20.8883 10.7125C20.9069 10.7008 20.9286 10.6945 20.9506 10.6945C20.9727 10.6945 20.9943 10.7008 21.013 10.7125L21.6512 11.0772C21.6897 11.1012 21.7137 11.1396 21.7137 11.1828V11.7587C21.7137 11.8019 21.7377 11.8451 21.776 11.8642C21.8144 11.8882 21.8624 11.8882 21.9008 11.8642L23.1101 11.1588V11.1588Z" /><path d="M20.9362 11.0484C20.9433 11.0438 20.9516 11.0413 20.9602 11.0413C20.9687 11.0413 20.977 11.0438 20.9842 11.0484L21.3729 11.274C21.3873 11.2835 21.3969 11.2979 21.3969 11.3172V11.7682C21.3969 11.7874 21.3873 11.8018 21.3729 11.8114L20.9842 12.0369C20.977 12.0416 20.9687 12.0441 20.9602 12.0441C20.9516 12.0441 20.9433 12.0416 20.9362 12.0369L20.5474 11.8114C20.533 11.8018 20.5234 11.7874 20.5234 11.7682V11.3172C20.5234 11.2979 20.533 11.2835 20.5474 11.274L20.9362 11.0484V11.0484Z" /><mask id="mask0_1086_310" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="8" width="6" height="7"><path d="M9.95924 9.00358C9.92195 8.98235 9.87978 8.97119 9.83688 8.97119C9.79397 8.97119 9.7518 8.98235 9.71451 9.00358L7.69422 10.1696C7.6174 10.2128 7.57422 10.2944 7.57422 10.3808V12.7178C7.57422 12.8042 7.62222 12.8858 7.69422 12.929L9.71451 14.0951C9.7518 14.1163 9.79397 14.1275 9.83688 14.1275C9.87978 14.1275 9.92195 14.1163 9.95924 14.0951L11.9796 12.929C12.0564 12.8858 12.0996 12.8042 12.0996 12.7178V10.3808C12.0996 10.2944 12.0515 10.2128 11.9796 10.1697L9.95924 9.00358Z"/></mask><g mask="url(#mask0_1086_310)"><path d="M9.95924 9.00358C9.92195 8.98235 9.87978 8.97119 9.83688 8.97119C9.79397 8.97119 9.7518 8.98235 9.71451 9.00358L7.69422 10.1696C7.6174 10.2128 7.57422 10.2944 7.57422 10.3808V12.7178C7.57422 12.8042 7.62222 12.8858 7.69422 12.929L9.71451 14.0951C9.7518 14.1163 9.79397 14.1275 9.83688 14.1275C9.87978 14.1275 9.92195 14.1163 9.95924 14.0951L11.9796 12.929C12.0564 12.8858 12.0996 12.8042 12.0996 12.7178V10.3808C12.0996 10.2944 12.0515 10.2128 11.9796 10.1697L9.95924 9.00358Z" /><path d="M11.987 10.1698L9.95715 9.00374C9.93721 8.99366 9.9163 8.98562 9.89475 8.97974L7.62012 12.8764C7.63896 12.8994 7.66172 12.9189 7.68734 12.934L9.71721 14.1002C9.7748 14.1338 9.84198 14.1433 9.90434 14.1241L12.0398 10.2179C12.0254 10.1987 12.0062 10.1842 11.987 10.1699V10.1698Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9923 12.9296C12.0499 12.896 12.093 12.8384 12.1123 12.776L9.88552 8.97531C9.82793 8.96572 9.76552 8.9705 9.71279 9.00409L7.69727 10.1654L9.87111 14.1293C9.90273 14.1241 9.93343 14.1144 9.96229 14.1005L11.9922 12.9296L11.9923 12.9296Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9922 12.9301L9.96715 14.0962C9.93857 14.1107 9.90775 14.1205 9.87598 14.1249L9.91438 14.1969L12.1601 12.8965V12.8677L12.1026 12.7717C12.093 12.8389 12.0498 12.8965 11.9922 12.9301V12.9301Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9922 12.9301L9.96715 14.0962C9.93857 14.1107 9.90775 14.1205 9.87598 14.1249L9.91438 14.1969L12.1601 12.8965V12.8677L12.1026 12.7717C12.093 12.8389 12.0498 12.8965 11.9922 12.9301V12.9301Z"/></g>`,
        "sqlite": `<path d="M17.4867 1.97632H3.68218C2.75693 1.97632 2 2.73334 2 3.65849V18.8822C2 19.8073 2.75693 20.5643 3.68218 20.5643H12.7741C12.6709 16.0404 14.2158 7.26098 17.4867 1.97632V1.97632Z" /><path d="M16.9876 2.46655H3.68471C3.02773 2.46655 2.49316 3.00103 2.49316 3.65811V17.7711C5.50596 16.6148 10.0278 15.6171 13.1544 15.6624C13.7827 12.3771 15.6293 5.93871 16.9876 2.46655V2.46655Z" /><path d="M20.705 1.47788C19.7596 0.634833 18.6148 0.973426 17.4852 1.97616C17.3174 2.12505 17.1501 2.29033 16.9836 2.46688C15.051 4.51717 13.257 8.31477 12.6997 11.2152C12.9168 11.6555 13.0864 12.2173 13.1981 12.6465C13.2267 12.7566 13.2525 12.86 13.2732 12.9479C13.3222 13.156 13.3486 13.2909 13.3486 13.2909C13.3486 13.2909 13.3313 13.2253 13.2601 13.0192C13.2466 12.9796 13.2315 12.9365 13.2136 12.8857C13.2043 12.8608 13.1944 12.8362 13.1838 12.8119C13.0578 12.5188 12.7091 11.9003 12.5556 11.631C12.4339 11.9878 12.3191 12.347 12.2112 12.7082C12.6543 13.5189 12.9243 14.9082 12.9243 14.9082C12.9243 14.9082 12.9009 14.8182 12.7895 14.5039C12.6907 14.226 12.1984 13.3633 12.0817 13.1617C11.8822 13.8982 11.803 14.3954 11.8745 14.5164C12.0133 14.751 12.1454 15.1558 12.2615 15.6033C12.5237 16.6117 12.7059 17.8393 12.7059 17.8393C12.7059 17.8393 12.7117 17.9207 12.7217 18.0459C12.6853 18.8927 12.7071 19.7706 12.7728 20.5641C12.8596 21.6146 13.0231 22.517 13.2315 23L13.373 22.9229C13.067 21.9714 12.9426 20.7244 12.9971 19.2863C13.0795 17.0882 13.5853 14.4372 14.5199 11.6742C16.0991 7.5033 18.2899 4.15681 20.2951 2.55859C18.4675 4.20918 15.994 9.55183 15.2535 11.5302C14.4244 13.7458 13.8369 15.8248 13.4828 17.8167C14.0938 15.9493 16.0691 15.1467 16.0691 15.1467C16.0691 15.1467 17.0379 13.9518 18.1701 12.2447C17.4919 12.3994 16.3783 12.6642 16.0052 12.8209C15.455 13.0517 15.3068 13.1305 15.3068 13.1305C15.3068 13.1305 17.089 12.0451 18.6181 11.5537C20.7211 8.2415 23.0122 3.53612 20.705 1.47788" />`,
        "docker": `<path d="M11.5312 6.28125H13.5Z"/><path d="M13.875 10.5938H15.8438M11.5312 10.5938H13.5M9.23438 10.5938H11.2031M6.9375 10.5938H8.85938M4.59375 10.5938H6.5625M6.9375 8.4375H8.85938M9.23438 8.4375H11.2031M11.5312 8.4375H13.5M11.5312 6.28125H13.5" stroke="white" stroke-width="2"/><path d="M22.1246 10.6875C22.1246 10.6875 21.2809 9.89062 19.5465 10.1719C19.359 8.8125 17.9059 8.01562 17.9059 8.01562C17.9059 8.01562 16.5465 9.65625 17.5309 11.4844C17.2496 11.625 16.7809 11.8125 16.0777 11.8125H3.18713C2.95275 12.7031 2.95275 18.6094 9.4215 18.6094C14.0621 18.6094 17.5309 16.4531 19.1715 12.5156C21.609 12.7031 22.1246 10.6875 22.1246 10.6875Z"/>`,
        "unity": `<g clip-path="url(#clip0_1086_354)"><path d="M15.225 11.9737L19.4137 4.74089L21.4377 11.9737L19.4136 19.2048L15.225 11.9737ZM13.1835 13.1483L17.3727 20.3799L10.0768 18.5109L4.80603 13.1483H13.1835ZM17.3718 3.56539L13.1835 10.7982H4.80603L10.0768 5.43529L17.3718 3.56539V3.56539ZM23.3514 9.51223L20.796 0.00549316L11.2581 2.55329L9.84617 5.03558L6.98122 5.01505L0 11.9744L6.98122 18.932H6.98149L9.84526 18.9108L11.2592 21.3931L20.796 23.9405L23.3513 14.4356L21.9001 11.9738L23.3513 9.51241L23.3514 9.51223Z" /></g><defs><clipPath id="clip0_1086_354"><rect width="23.3568" height="24" /></clipPath></defs>`,
        "discordjs": `<path d="M20.4528 5.98993C17.7026 3.93193 15.0677 3.98977 15.0677 3.98977L14.7984 4.29745C18.0679 5.27833 19.5874 6.72073 19.5874 6.72073C14.9095 4.14529 8.95128 4.16377 4.08576 6.72073C4.08576 6.72073 5.6628 5.20129 9.1248 4.22041L8.93256 3.98953C8.93256 3.98953 6.3168 3.93193 3.54744 5.98969C3.54744 5.98969 0.77784 10.9709 0.77784 17.1062C0.77784 17.1062 2.39352 19.8758 6.64392 20.0105C6.64392 20.0105 7.35552 19.1642 7.93248 18.4334C5.49 17.7026 4.56672 16.1832 4.56672 16.1832C6.10128 17.1434 7.65288 17.7444 9.58656 18.1258C12.7325 18.7733 16.6457 18.1075 19.5684 16.1832C19.5684 16.1832 18.6067 17.741 16.0872 18.4526C16.6642 19.1642 17.3566 19.9913 17.3566 19.9913C21.607 19.8566 23.2224 17.087 23.2224 17.1065C23.2222 10.9711 20.4528 5.98993 20.4528 5.98993ZM8.4132 15.3178C7.33608 15.3178 6.45144 14.3753 6.45144 13.2022C6.53016 10.3925 10.3159 10.4011 10.375 13.2022C10.375 14.3753 9.50928 15.3178 8.4132 15.3178ZM15.433 15.3178C14.3558 15.3178 13.4712 14.3753 13.4712 13.2022C13.5576 10.398 17.2961 10.3968 17.3947 13.2022C17.3947 14.3753 16.5293 15.3178 15.433 15.3178Z"/>`,
        "libgdx": `<path d="M3.33575 10C2.59892 10 2.00013 10.6941 2.00013 11.55C2.00013 11.5607 2.00003 11.5708 2.00013 11.5813C2.00015 11.5834 2.00008 11.5854 2.00013 11.5875V13.4125C1.99984 13.4252 2.00013 13.4372 2.00013 13.45C2.00013 14.3059 2.59892 15 3.33575 15H4.27872H4.38878H5.61138H5.72144H6.66442C7.40126 15 8.00005 14.3059 8.00005 13.45C8.00005 12.594 7.40126 11.9 6.66442 11.9H6.12897H5.9148H4.85581V13H5.9148H6.12897H6.28663C6.49574 13 6.66442 13.1801 6.66442 13.4C6.66442 13.6199 6.49574 13.7968 6.28663 13.7968H5.9148H5.72144H5.61138H4.38878H4.27872H4.08537H3.71353C3.5084 13.7968 3.34198 13.6265 3.33575 13.4125V11.5875V11.5813C3.34504 11.3702 3.51042 11.2031 3.71353 11.2031H4.08537H4.27872H4.85581V11.2062H7.80669V10H5.61138H4.85581H4.27872H3.33575V10Z" /><path d="M8.66748 10V11.2055H11.0811H11.9112H12.4045H12.5966H12.9658C13.1675 11.2055 13.3318 11.3724 13.341 11.5834V11.5896V13.4134C13.3348 13.6274 13.1696 13.7976 12.9658 13.7976H12.5966H12.4045H11.5567H11.0811H9.99096V11.9019H8.66748V13.7976V14.6189V15H11.0811H11.5567H12.4045H13.341C14.0728 15 14.6674 14.3064 14.6674 13.4509C14.6674 13.4381 14.6677 13.4262 14.6674 13.4134V11.5896C14.6675 11.5875 14.6674 11.5854 14.6674 11.5834C14.6675 11.573 14.6674 11.5628 14.6674 11.5522C14.6674 10.6967 14.0728 10.0031 13.341 10.0031H12.4045H11.9112V10H8.66748V10Z" fill="white"/><path d="M14.6663 10H16.5178L18.3333 11.9062L20.1488 10H22L19.6191 12.5L22 15H20.1488L18.3333 13.0937L16.5178 15H14.6666L17.0472 12.5L14.6663 10Z" />`
    };
    function getTechIcon(name, properties) {
        properties.svg = TECH_ICONS[name] || "";
        let text = createSVG(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }

    class HomeView extends UIComponent {
        constructor() {
            super({
                type: "view",
                id: "home-view",
                classes: ["box-column"],
                styles: {
                    padding: "1rem",
                    height: "100%",
                    width: "100%",
                    paddingLeft: "calc(4rem + 7rem)",
                    paddingRight: "calc(10rem)",
                    paddingTop: "6rem",
                    fontFamily: "Inter",
                    overflowY: "auto",
                    opacity: "0",
                    transition: "opacity var(--slow)",
                }
            });
        }
        show(params, container) {
            const presentation = this.buildPresentationSection();
            const tecnologies = this.buildTechnologiesSection();
            this.appendChild(presentation);
            this.appendChild(tecnologies);
            this.appendTo(container);
            setTimeout(() => this.element.style.opacity = "1", 40);
        }
        buildPresentationSection() {
            const section = new UIComponent({
                classes: ["box-x-between", "box-row"],
                id: "presentation",
                styles: {
                    width: "100%",
                }
            });
            const textColumn = new UIComponent({
                classes: ["box-column"],
            });
            const title = new UIComponent({
                type: "h1",
                text: "Akrck02",
                styles: {
                    fontSize: "2rem",
                    fontWeight: "900",
                    fontFamily: "Inter",
                    color: "#fff",
                }
            });
            const greeting = new UIComponent({
                type: "p",
                text: `${App.getBundle().home.HI_THERE_IM_AKRCK02} 👋`,
                styles: {
                    marginTop: "0.5rem",
                }
            });
            const description = new UIComponent({
                type: "p",
                text: App.getBundle().home.DESCRIPTION_1,
                styles: {
                    marginTop: "1.5rem",
                    fontSize: "1.2rem",
                    maxWidth: "25rem",
                }
            });
            const description2 = new UIComponent({
                type: "p",
                text: App.getBundle().home.DESCRIPTION_2,
                styles: {
                    marginTop: "1.5rem",
                    fontSize: "1.2rem",
                    maxWidth: "25rem",
                }
            });
            const currently = new UIComponent({
                type: "h1",
                text: `${App.getBundle().home.CURRENTLY_WORKING_ON}...`,
                styles: {
                    marginTop: "2rem",
                    fontSize: "1.7rem",
                    fontWeight: "900",
                    fontFamily: "'Inter'",
                }
            });
            const projectOne = new UIComponent({
                type: "a",
                classes: ["box-row", "box-x-between", "box-x-center"],
                styles: {
                    marginTop: "1.5rem",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.35rem",
                    padding: "0.5rem 1.5rem",
                    color: "#fff",
                    cursor: "pointer"
                },
                attributes: {
                    href: Configurations.VIEWS.SOFTWARE + "/valhalla"
                }
            });
            const projectOneTitle = new UIComponent({
                type: "h2",
                text: "Valhalla",
                classes: ["box-column", "box-x-center"],
                styles: {
                    fontSize: "1.2rem",
                    fontWeight: "900",
                }
            });
            const projectOneLogo = new UIComponent({
                type: "img",
                attributes: {
                    src: `${Configurations.PATHS.ICONS}/valhalla-logo-light.svg`,
                },
                styles: {
                    width: "3rem",
                    height: "3rem",
                }
            });
            const projectTwo = new UIComponent({
                type: "a",
                classes: ["box-row", "box-x-between", "box-x-center"],
                styles: {
                    marginTop: ".5rem",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.35rem",
                    padding: "0.5rem 1.5rem",
                    color: "#fff",
                    cursor: "pointer"
                },
                attributes: {
                    href: "https://github.com/Nightlight-studios/io-world",
                    target: "_blank"
                }
            });
            const projectTwoTitle = new UIComponent({
                type: "h2",
                text: "IO World",
                classes: ["box-column", "box-x-center"],
                styles: {
                    fontSize: "1.2rem",
                    fontWeight: "900",
                }
            });
            const projectTwoLogo = new UIComponent({
                type: "img",
                attributes: {
                    src: `${Configurations.PATHS.ICONS}/io-logo.svg`,
                },
                styles: {
                    width: "3rem",
                    height: "3rem",
                }
            });
            projectOne.appendChild(projectOneTitle);
            projectOne.appendChild(projectOneLogo);
            projectTwo.appendChild(projectTwoTitle);
            projectTwo.appendChild(projectTwoLogo);
            textColumn.appendChild(title);
            textColumn.appendChild(greeting);
            textColumn.appendChild(description);
            textColumn.appendChild(description2);
            textColumn.appendChild(currently);
            textColumn.appendChild(projectOne);
            textColumn.appendChild(projectTwo);
            const profileColumn = new UIComponent({
                classes: ["box-column", "box-y-center"],
            });
            const profilePicture = new UIComponent({
                type: "img",
                id: "profile-pic",
                attributes: {
                    src: `${Configurations.PATHS.IMAGES}/me.jpg`,
                },
                styles: {
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "0rem",
                }
            });
            const companyCard = new UIComponent({
                classes: ["box-row", "box-x-start", "box-y-center"],
                styles: {
                    width: "15rem",
                    height: "3rem",
                    marginTop: "2rem",
                }
            });
            const companyIcon = getMaterialIcon("business", {
                size: "1.5rem",
                fill: "#fff",
            });
            const companyName = new UIComponent({
                type: "a",
                text: "Nightlight studios ™",
                styles: {
                    fontSize: "1.2rem",
                    marginLeft: "1.25rem",
                    color: "#fff",
                    cursor: "pointer"
                },
                attributes: {
                    href: "https://github.com/Nightlight-studios",
                    target: "_blank"
                }
            });
            companyCard.appendChild(companyIcon);
            companyCard.appendChild(companyName);
            const githubCard = new UIComponent({
                classes: ["box-row", "box-x-start", "box-y-center"],
                styles: {
                    width: "15rem",
                    height: "3rem",
                    marginTop: "-.5rem",
                }
            });
            const githubIcon = getSocialIcon("github", {
                size: "1.5rem",
                fill: "#fff",
            });
            const githubName = new UIComponent({
                type: "a",
                text: "akrck02",
                styles: {
                    fontSize: "1.2rem",
                    marginLeft: "1.25rem",
                    color: "#fff",
                    cursor: "pointer"
                },
                attributes: {
                    href: "https://github.com/akrck02",
                    target: "_blank"
                }
            });
            githubCard.appendChild(githubIcon);
            githubCard.appendChild(githubName);
            profileColumn.appendChild(profilePicture);
            profileColumn.appendChild(companyCard);
            profileColumn.appendChild(githubCard);
            section.appendChild(textColumn);
            section.appendChild(profileColumn);
            return section;
        }
        buildTechnologiesSection() {
            const section = new UIComponent({
                classes: ["box-column"],
                styles: {
                    width: "100%",
                    marginTop: "2rem",
                }
            });
            const title = new UIComponent({
                type: "h1",
                text: App.getBundle().home.TECHNOLOGIES_IVE_USED,
                styles: {
                    marginTop: "2rem",
                }
            });
            const techContainer = new UIComponent({
                classes: ["box-row", "box-x-start", "box-y-center", "box-warp"],
                styles: {
                    marginTop: "1.5rem",
                    width: "100%",
                }
            });
            HomeView.technologies.forEach(tech => {
                techContainer.appendChild(this.techCard(tech));
            });
            section.appendChild(title);
            section.appendChild(techContainer);
            return section;
        }
        techCard(name) {
            const size = 4;
            const card = new UIComponent({
                type: "a",
                classes: ["box-row", "box-center"],
                styles: {
                    minWidth: size + "rem",
                    minHeight: size + "rem",
                    maxWidth: size + "rem",
                    maxHeight: size + "rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    marginRight: ".5rem",
                    marginTop: ".5rem",
                    filter: "grayscale(0%)",
                },
                attributes: {
                    title: name,
                    href: `${Configurations.VIEWS.SOFTWARE}/search/${name}`,
                }
            });
            const icon = getTechIcon(name.toLowerCase(), {
                fill: "#fff",
                size: size * .55 + "rem"
            });
            card.appendChild(icon);
            return card;
        }
    }
    HomeView.technologies = [
        "TypeScript",
        "Java",
        "Docker",
        "MariaDb",
        "Electron",
        "Html",
        "CSS",
        "JavaScript",
        "NodeJS",
        "Unity",
        "C#",
        "Go",
        "Python",
        "Sqlite",
    ];

    class SoftwareCore {
        static getTechnologies() {
            const technologies = [];
            for (const name in this.projects) {
                let local = this.projects[name].technologies || [];
                local.forEach(t => {
                    if (technologies.indexOf(t.toLowerCase()) == -1) {
                        technologies.push(t.toLowerCase());
                    }
                });
            }
            return technologies;
        }
        static getLangs() {
            const langs = [];
            for (const name in this.projects) {
                let local = this.projects[name].langs || [];
                local.forEach(t => {
                    if (langs.indexOf(t.toLowerCase()) == -1) {
                        langs.push(t.toLowerCase());
                    }
                });
            }
            return langs;
        }
        static getProjectsByCategory(tech) {
            if (tech == "all" || tech == "" || tech == undefined) {
                return this.projects;
            }
            const projectsByCategory = {};
            for (const name in this.projects) {
                let local = this.projects[name].langs || [];
                let localTech = this.projects[name].technologies || [];
                local = local.map(l => l.toLowerCase());
                localTech = localTech.map(l => l.toLowerCase());
                if (local.indexOf(tech.toLocaleLowerCase()) != -1) {
                    projectsByCategory[name] = this.projects[name];
                }
                if (localTech.indexOf(tech.toLocaleLowerCase()) != -1) {
                    projectsByCategory[name] = this.projects[name];
                }
            }
            return projectsByCategory;
        }
    }
    SoftwareCore.projects = {
        "Valhalla": {
            technologies: ["Electron", "Nodejs", "SQLite"],
            langs: ["Typescript", "Javascript", "Mariadb", "HTML", "CSS"],
            icon: Configurations.PATHS.ICONS + "valhalla-logo-light.svg",
            url: Configurations.VIEWS.SOFTWARE + "/valhalla",
            github: "akrck02/valhalla"
        },
        "Valhalla-sync": {
            technologies: ["Nodejs", "SQLite"],
            langs: ["Typescript", "Javascript", "Mariadb"],
            github: "akrck02/valhalla-sync"
        },
        "Valhalla-db-core": {
            technologies: ["Electron", "Nodejs", "SQLite"],
            langs: ["Typescript", "Javascript", "Mariadb"],
            github: "akrck02/valhalla-db-core"
        },
        "GTD Framework": {
            technologies: [],
            langs: ["Typescript", "Javascript"],
            github: "akrck02/GTD-Framework",
            icon: Configurations.PATHS.ICONS + "gtdf-logo.svg",
        },
        "GTD-LIB-TS": {
            technologies: ["docker"],
            langs: ["Typescript", "Javascript"],
            github: "akrck02/GTD-LIB-TS",
            icon: Configurations.PATHS.ICONS + "gtd-logo.svg",
        },
        "GTDF-CLI": {
            technologies: [],
            langs: ["Go"],
            github: "akrck02/GTDF-CLI",
            icon: Configurations.PATHS.ICONS + "gtdf-cli-logo.svg",
        },
        "GTD-TEST": {
            technologies: ["Nodejs"],
            langs: ["Typescript"],
            github: "akrck02/GTD-TEST",
        },
        "Bubble-UI": {
            technologies: [],
            langs: ["CSS"],
            github: "akrck02/Bubble-UI",
            icon: Configurations.PATHS.ICONS + "BubbleUI-logo.svg",
        },
        "IO World": {
            technologies: ["Unity"],
            langs: ["c#"],
            icon: Configurations.PATHS.ICONS + "io-logo.svg",
            github: "Nightlight-studios/io-world"
        },
        "Github backup script": {
            technologies: ["Nodejs"],
            langs: ["Typescript", "Javascript"],
            github: "akrck02/Github-backup-script",
            icon: Configurations.PATHS.ICONS + "gh-backup-script-logo.svg",
        },
        "moonbot": {
            technologies: ["Nodejs", "discordjs"],
            langs: ["Typescript", "Javascript"],
            github: "akrck02/moonbot",
            icon: Configurations.PATHS.ICONS + "moonbot-logo.svg",
        },
        "enjoined": {
            technologies: ["libgdx"],
            langs: ["Java"],
            github: "akrck02/EnJoined",
            icon: Configurations.PATHS.ICONS + "enjoined-logo.svg",
        },
        "Littlestyles": {
            technologies: [],
            langs: ["java"],
            github: "akrck02/Littlestyles",
        },
        "Alice": {
            technologies: [],
            langs: ["python"],
            github: "akrck02/Alice",
        },
        "NodeStreamServer": {
            technologies: ["Nodejs"],
            langs: ["Typescript", "Javascript"],
            github: "akrck02/NodeStreamServer "
        }
    };

    class SoftwareView extends UIComponent {
        constructor() {
            super({
                type: "view",
                id: "software-view",
                classes: ["box-row"],
            });
        }
        show(params, container) {
            const navbar = new UIComponent({
                type: "navbar",
                id: "software-view-navbar",
            });
            this.selected = params[0] || "all";
            const tech = SoftwareCore.getTechnologies();
            const langs = SoftwareCore.getLangs();
            const all = this.createNavbarItem("all");
            navbar.appendChild(all);
            langs.forEach((lang) => {
                const item = this.createNavbarItem(lang);
                navbar.appendChild(item);
            });
            tech.forEach((tech) => {
                const item = this.createNavbarItem(tech);
                navbar.appendChild(item);
            });
            this.techContainer = new UIComponent({
                type: "div",
                id: "tech-container",
                classes: ["box-row", "box-x-center"],
                styles: {
                    padding: "1rem",
                }
            });
            this.showTechByCategory(params[0]);
            this.appendChild(navbar);
            this.appendChild(this.techContainer);
            container.appendChild(this);
            setTimeout(() => this.element.style.opacity = "1", 40);
        }
        createNavbarItem(name) {
            const item = new UIComponent({
                type: "div",
                classes: ["box-x-between", "box-row", "navbar-item"],
            });
            const nameComp = new UIComponent({
                type: "div",
                text: name,
            });
            item.appendChild(nameComp);
            setEvents(item.element, {
                click: (e) => {
                    this.showTechByCategory(name);
                    item.element.classList.add("selected");
                    const navbarItems = document.querySelectorAll(".navbar-item");
                    for (let i = 0; i < navbarItems.length; i++) {
                        if (navbarItems[i] !== item.element) {
                            navbarItems[i].classList.remove("selected");
                        }
                    }
                }
            });
            if (name === this.selected) {
                item.element.classList.add("selected");
            }
            if (name !== "all") {
                const icon = getTechIcon(name, {
                    size: "1.5rem",
                    fill: "#fff"
                });
                icon.element.classList.add("icon");
                icon.element.title = "All";
                item.appendChild(icon);
            }
            else {
                const icon = getMaterialIcon("all_inclusive", {
                    size: "1.5rem",
                    fill: "#fff",
                });
                icon.element.classList.add("icon");
                icon.element.title = "All";
                item.appendChild(icon);
            }
            return item;
        }
        showTechByCategory(category) {
            this.selected = category;
            Router.setTitle("Software" + (category ? " / " + category : ""));
            this.techContainer.clean();
            setStyles(this.techContainer.element, {
                transition: "none",
                opacity: "0",
            });
            const projectsByCategory = SoftwareCore.getProjectsByCategory(category);
            for (const name in projectsByCategory) {
                const project = projectsByCategory[name];
                const projectComp = new UIComponent({
                    type: "a",
                    classes: ["box-center", "box-column", "project"],
                    attributes: {
                        href: project.url || "https://github.com/" + project.github,
                        target: project.url ? "" : "_blank"
                    },
                });
                const title = new UIComponent({
                    text: name,
                    styles: {
                        fontSize: ".75rem",
                    }
                });
                if (project.icon) {
                    const logo = new UIComponent({
                        type: "img",
                        attributes: {
                            src: project.icon,
                        },
                        styles: {
                            width: "4rem",
                            height: "4rem",
                            filter: "drop-shadow(0 .2rem .2rem rgba(0,0,0,.35))"
                        }
                    });
                    projectComp.appendChild(logo);
                }
                else {
                    const defaultIcon = getMaterialIcon("code", {
                        fill: "#fff",
                        size: "2.5rem"
                    });
                    setStyles(defaultIcon.element, {
                        padding: ".5rem"
                    });
                    projectComp.appendChild(defaultIcon);
                }
                projectComp.appendChild(title);
                this.techContainer.appendChild(projectComp);
                setTimeout(() => {
                    setStyles(this.techContainer.element, {
                        transition: "opacity var(--slow)",
                        opacity: "1",
                    });
                }, 50);
            }
        }
    }

    /**
     * Get if is small device (less than 768px)
     * @description This method is useful for checking if the device is a small device.
     * @returns true if the device is a small device, false otherwise
     * @example
     *     const isSmallDevice = isSmallDevice();
     *     console.log(isSmallDevice); // true
     */
    function isSmallDevice() {
        return window.matchMedia("only screen and (max-width: 760px)").matches;
    }
    function isFuckingChrome() {
        let isChromium = window.chrome;
        let winNav = window.navigator;
        let vendorName = winNav.vendor;
        let isOpera = typeof window.opr !== "undefined";
        let isIEedge = winNav.userAgent.indexOf("Edg") > -1;
        let isIOSChrome = winNav.userAgent.match("CriOS");
        return isChromium || isOpera || isIEedge || isIOSChrome || vendorName === "Google Inc.";
    }
    function getOs() {
        if (navigator.userAgent.indexOf("Win") != -1)
            return "Windows";
        if (navigator.userAgent.indexOf("Mac") != -1)
            return "MacOS";
        if (navigator.userAgent.indexOf("Linux") != -1)
            return "Linux";
        if (navigator.userAgent.indexOf("X11") != -1)
            return "UNIX";
    }

    class ValhallaView extends UIComponent {
        constructor() {
            super({
                type: "view",
                id: "valhalla-view",
                classes: ["box-column"],
                styles: {
                    width: "100%",
                    height: "100%",
                    overflowY: isSmallDevice() ? "hidden" : "auto",
                    overflowX: "hidden",
                    opacity: "0",
                    transition: "opacity var(--medium)"
                }
            });
            this.section = 0;
            this.sections = [];
            this.scrolling = false;
        }
        show(params, container) {
            Router.setTitle("Valhalla");
            const section = this.buildPresentationSection();
            const task = this.buildTaskSection();
            const notes = this.buildNoteSection();
            const windowsInstallation = this.buildWindowsInstalationSection();
            const windowsInstallationPartTwo = this.buildWindowsInstalationSectionPartTwo();
            this.appendChild(section);
            this.appendChild(task);
            this.appendChild(notes);
            this.appendChild(windowsInstallation);
            this.appendChild(windowsInstallationPartTwo);
            this.sections = [section, task, notes, windowsInstallation, windowsInstallationPartTwo];
            if (isSmallDevice()) {
                this.up = getMaterialIcon("expand_less", {
                    size: "2rem",
                    fill: "#fff"
                });
                this.up.element.id = "up";
                setClasses(this.up.element, ["nav-button"]);
                setEvents(this.up.element, {
                    click: () => {
                        this.section--;
                        this.goToSection(this.section);
                    }
                });
                this.appendChild(this.up);
                // Down button
                this.down = getMaterialIcon("expand", {
                    size: "2rem",
                    fill: "#fff"
                });
                this.down.element.id = "down";
                setClasses(this.down.element, ["nav-button"]);
                setEvents(this.down.element, {
                    click: () => {
                        this.section++;
                        this.goToSection(this.section);
                    }
                });
                this.appendChild(this.down);
                this.goToSection(0);
                if (!isFuckingChrome()) {
                    let touchPos;
                    this.element.ontouchstart = function (e) {
                        touchPos = e.changedTouches[0].clientY;
                    };
                    this.element.ontouchmove = (e) => {
                        let newTouchPos = e.changedTouches[0].clientY;
                        if (!this.scrolling && newTouchPos > touchPos + 100) {
                            if (this.section == 0) {
                                return;
                            }
                            this.section--;
                            this.scrolling = true;
                            this.goToSection(this.section);
                            setTimeout(() => this.scrolling = false, 80);
                        }
                        else if (!this.scrolling && newTouchPos < touchPos - 100) {
                            if (this.section == this.sections.length - 1) {
                                return;
                            }
                            this.section++;
                            this.scrolling = true;
                            this.goToSection(this.section);
                            setTimeout(() => this.scrolling = false, 80);
                        }
                    };
                }
            }
            container.appendChild(this);
            setTimeout(() => {
                this.element.style.opacity = "1";
            }, 50);
        }
        /**
         * Select a section and scroll into that viewx
         * @param index
         */
        goToSection(index) {
            if (this.up) {
                this.up.element.style.display = "flex";
                this.down.element.style.display = "flex";
            }
            if (index <= 0) {
                index = 0;
                if (this.up) {
                    this.up.element.style.display = "none";
                }
            }
            if (index >= this.sections.length - 1) {
                index = this.sections.length - 1;
                if (this.down) {
                    this.down.element.style.display = "none";
                }
            }
            this.sections[index].element.scrollIntoView();
        }
        /**
         * Build the presentation section
         * @returns The section UIComponent
         */
        buildPresentationSection() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-presentation",
                classes: ["box-row", "box-center", "section"],
                styles: {
                    position: "relative",
                    width: "100%",
                    minHeight: "100%",
                }
            });
            const downloadPanel = new UIComponent({
                type: "div",
                id: "download-panel",
                classes: ["box-column", "box-center"],
            });
            const image = new UIComponent({
                type: "img",
                id: "download-image",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "valhalla-1.png",
                },
                styles: {
                    width: "40%",
                    borderRadius: ".35rem",
                    marginLeft: "5rem",
                    boxShadow: "0 0 .5rem .5rem rgba(0,0,0,.15)",
                }
            });
            const logo = new UIComponent({
                type: "img",
                id: "valhalla-view-logo",
                attributes: {
                    src: Configurations.PATHS.ICONS + "valhalla-logo-light.svg",
                },
                styles: {
                    width: "10rem",
                    top: ".75rem",
                    opacity: ".9",
                    marginLeft: ".2rem",
                }
            });
            const description = new UIComponent({
                type: "p",
                id: "valhalla-view-description",
                classes: ["text-center"],
                text: "Valhalla - " + App.getBundle().valhalla.THE_MODERN_PRODUCTIVITY_APP,
            });
            const os = getOs();
            const downloadWindows = new UIComponent({
                type: "a",
                id: "valhalla-view-download",
                text: App.getBundle().valhalla.DOWNLOAD_FOR_WINDOWS,
                attributes: {
                    href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.7b/Valhalla.Setup.1.0.7-b.exe",
                },
                styles: {
                    fontSize: ".9rem",
                    backgroundColor: "rgba(255,255,255,.1)",
                    padding: "1rem",
                    borderRadius: ".15rem",
                    color: "white",
                },
                events: {
                    click: () => {
                        this.section = 3;
                        this.goToSection(this.section);
                    }
                }
            });
            const downloadLinux = new UIComponent({
                type: "a",
                id: "valhalla-view-download",
                text: App.getBundle().valhalla.DOWNLOAD_FOR_LINUX,
                attributes: {
                    href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.7b/Valhalla-1.0.7-b.AppImage",
                },
                styles: {
                    fontSize: ".9rem",
                    backgroundColor: "rgba(255,255,255,.1)",
                    padding: "1rem",
                    borderRadius: ".35rem",
                    color: "white",
                }
            });
            const buttonContainer = new UIComponent({
                type: "div",
                id: "valhalla-view-button-container",
                classes: ["box-row", "box-center"],
                styles: {
                    marginTop: "1.2rem",
                }
            });
            downloadPanel.appendChild(logo);
            downloadPanel.appendChild(description);
            if (os === "Windows") {
                downloadLinux.element.style.background = "transparent";
                downloadLinux.element.innerText = App.getBundle().valhalla.OR_LINUX;
                buttonContainer.appendChild(downloadWindows);
                buttonContainer.appendChild(downloadLinux);
            }
            else {
                downloadWindows.element.style.background = "transparent";
                downloadWindows.element.innerText = App.getBundle().valhalla.OR_WINDOWS;
                buttonContainer.appendChild(downloadLinux);
                buttonContainer.appendChild(downloadWindows);
            }
            downloadPanel.appendChild(buttonContainer);
            section.appendChild(downloadPanel);
            section.appendChild(image);
            return section;
        }
        /**
         * Build the task section
         * @returns The task section UIComponent
         */
        buildTaskSection() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-task",
                classes: ["box-row", "box-center", "section", "reverse"],
            });
            const image = new UIComponent({
                type: "img",
                id: "screenshot",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "valhalla-2.png",
                },
            });
            const box = new UIComponent({
                type: "div",
                classes: ["box-center", "box-column"],
                id: "valhalla-view-task-description",
                styles: {
                    width: "30%",
                }
            });
            const title = new UIComponent({
                type: "h1",
                text: App.getBundle().valhalla.ORGANIZE + ", " +
                    App.getBundle().valhalla.SAVE_TIME +
                    ", <br><b class='bold'>" + App.getBundle().valhalla.CREATE + ".</b>",
                styles: {
                    lineHeight: "1.5rem",
                    textTransform: "uppercase"
                }
            });
            const iconBar = new UIComponent({
                classes: ["box-row"],
                id: "icon-bar",
            });
            const calendar = new UIComponent({
                classes: ["box-column", "icon"],
            });
            const calendarIcon = getMaterialIcon("calendar_today", {
                size: "1.7rem",
                fill: "#fff",
            });
            calendar.appendChild(calendarIcon);
            calendar.appendChild(new UIComponent({
                text: App.getBundle().valhalla.CALENDAR,
                classes: ["text"]
            }));
            const tasks = new UIComponent({
                classes: ["box-column", "icon"],
            });
            const tasksIcon = getMaterialIcon("task_alt", {
                size: "1.7rem",
                fill: "#fff",
            });
            tasks.appendChild(tasksIcon);
            tasks.appendChild(new UIComponent({
                text: App.getBundle().valhalla.TASKS,
                classes: ["text"]
            }));
            const notes = new UIComponent({
                classes: ["box-column", "icon"],
            });
            const notesIcon = getMaterialIcon("sticky_note_2", {
                size: "1.7rem",
                fill: "#fff",
            });
            notes.appendChild(notesIcon);
            notes.appendChild(new UIComponent({
                text: App.getBundle().valhalla.NOTES,
                classes: ["text"]
            }));
            iconBar.appendChild(calendar);
            iconBar.appendChild(tasks);
            iconBar.appendChild(notes);
            box.appendChild(title);
            box.appendChild(iconBar);
            section.appendChild(image);
            section.appendChild(box);
            return section;
        }
        /**
         * Build the notes section
         * @returns The notes section UIComponent
         */
        buildNoteSection() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-task",
                classes: ["box-row", "box-center", "section"],
                styles: {
                    position: "relative",
                    width: "100%",
                    minHeight: "100%",
                    paddingBottom: "2rem",
                }
            });
            const description = new UIComponent({
                type: "p",
                id: "valhalla-view-task-description",
                styles: {
                    width: "30%",
                }
            });
            const offline = getMaterialIcon('wifi_off', { size: "1.7rem", fill: "#fff" });
            offline.element.style.marginRight = "1rem";
            offline.element.style.marginBottom = ".5rem";
            const offlineMessage = new UIComponent({
                classes: ["box-x-start", "box-y-center"],
                text: offline.toHTML() + App.getBundle().valhalla.MANAGE_YOUR_TIME_OFFLINE
            });
            const wallpaper = getMaterialIcon("wallpaper", { size: "1.7rem", fill: "#fff" });
            wallpaper.element.style.marginRight = "1rem";
            wallpaper.element.style.marginBottom = ".5rem";
            const wallpaperMessage = new UIComponent({
                classes: ["box-x-start", "box-y-center"],
                text: wallpaper.toHTML() + App.getBundle().valhalla.CUSTOMIZE_YOUR_WALLPAPER
            });
            const langs = getMaterialIcon("translate", { size: "1.7rem", fill: "#fff" });
            langs.element.style.marginRight = "1rem";
            langs.element.style.marginBottom = ".5rem";
            const langsMessage = new UIComponent({
                classes: ["box-x-start", "box-y-center"],
                text: langs.toHTML() + App.getBundle().valhalla.LANGUAGES
            });
            const coffee = getMaterialIcon('coffee', { size: "1.7rem", fill: "#fff" });
            coffee.element.style.marginRight = "1rem";
            coffee.element.style.marginBottom = ".5rem";
            const coffeeMessage = new UIComponent({
                classes: ["box-x-start", "box-y-center"],
                text: coffee.toHTML() + App.getBundle().valhalla.SUPPORT_OPEN_SOURCE_CODE
            });
            description.appendChild(offlineMessage);
            description.appendChild(wallpaperMessage);
            description.appendChild(langsMessage);
            description.appendChild(coffeeMessage);
            const image = new UIComponent({
                type: "img",
                id: "valhalla-view-task-image",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "valhalla-3.png",
                },
                styles: {
                    width: "40%",
                    borderRadius: ".35rem",
                    marginRight: "5rem",
                    boxShadow: "0 0 .5rem .5rem rgba(0,0,0,.15)",
                }
            });
            section.appendChild(description);
            section.appendChild(image);
            return section;
        }
        buildWindowsInstalationSection() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-windows-installation",
                classes: ["box-column", "box-center", "section"],
                styles: {
                    position: "relative",
                    width: "100%",
                    minHeight: "100%",
                    padding: "2rem",
                }
            });
            const title = new UIComponent({
                type: "h1",
                text: "Instalación en Windows:",
                styles: {
                    marginBottom: "1rem"
                }
            });
            const container = new UIComponent({
                classes: ["box-row", "box-y-center", "win-container"]
            });
            const message = new UIComponent({
                type: "p",
                text: App.getBundle().valhalla.WINDOWS_MESSAGE_ONE.replace("$1", `<b class="bold">${App.getBundle().valhalla.NOT_SIGNED_BETA}</b>`)
            });
            const img = new UIComponent({
                type: "img",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "win-instalation-warning.jpg"
                },
                styles: {
                    marginTop: "3rem",
                    maxWidth: "30rem"
                }
            });
            section.appendChild(title);
            container.appendChild(message);
            container.appendChild(img);
            section.appendChild(container);
            return section;
        }
        buildWindowsInstalationSectionPartTwo() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-windows-installation",
                classes: ["box-column", "box-center", "section"],
                styles: {
                    position: "relative",
                    width: "100%",
                    minHeight: "100%",
                    padding: "2rem",
                }
            });
            const container = new UIComponent({
                classes: ["box-row", "box-y-center", "win-container"]
            });
            const message = new UIComponent({
                type: "p",
                text: App.getBundle().valhalla.WINDOWS_MESSAGE_TWO
                    .replace("$1", `<b class="bold">${App.getBundle().valhalla.MORE_INFO}</b>`)
                    .replace("$2", `<b class="bold">${App.getBundle().valhalla.EJECUTE_ANYWAY}</b>`)
            });
            const img = new UIComponent({
                type: "img",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "win-instalation-warning-2.jpg"
                },
                styles: {
                    marginTop: "3rem",
                    maxWidth: "30rem"
                }
            });
            container.appendChild(message);
            container.appendChild(img);
            section.appendChild(container);
            return section;
        }
    }

    class SoftwareRouter {
        static load(params, container) {
            try {
                container.clean();
                switch (params[0]) {
                    case undefined:
                    case "search":
                    case "":
                        new SoftwareView().show(params.splice(1), container);
                        break;
                    case "valhalla":
                        new ValhallaView().show(params.splice(1), container);
                        break;
                    default:
                        location.href = Configurations.VIEWS.HOME;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    class ConstructionView extends UIComponent {
        constructor() {
            super({
                type: "view",
                id: "construction-view",
                classes: ["box-column", "box-center"],
                styles: {
                    width: "100%",
                    height: "100%",
                    opacity: "0",
                    transition: "opacity var(--medium)",
                },
            });
        }
        show(params, parent) {
            const image = new UIComponent({
                type: "img",
                attributes: {
                    src: Configurations.PATHS.IMAGES + "under-construction.png",
                    alt: "Construction cat",
                },
                styles: {
                    width: "100%",
                    maxWidth: "10rem",
                    objectFit: "cover",
                    filter: "drop-shadow(0px 0px 5px #000)",
                }
            });
            const text = new UIComponent({
                type: "p",
                classes: ["box-row", "box-center"],
                text: App.getBundle().system.THIS_PAGE_IS_UNDER_CONSTRUCTION,
                styles: {
                    marginTop: "1rem",
                    textAlign: "center",
                }
            });
            const icon = getMaterialIcon("construction", { size: "1.5rem", fill: "#fff" });
            icon.element.style.marginLeft = ".5rem";
            text.appendChild(icon);
            this.appendChild(image);
            this.appendChild(text);
            parent.appendChild(this);
            setTimeout(() => {
                this.element.style.opacity = "1";
            }, 100);
        }
    }

    class Router {
        constructor(listeners) {
            this.parent = document.getElementById("view-container");
            this.container = new UIComponent({
                type: "div",
                id: "view-container-box",
                styles: {
                    width: "calc(100%)",
                    height: "100%",
                },
            });
            this.sidebar = new Sidebar();
            this.modal = new Modal();
            this.sidebar.appendTo(this.parent);
            this.container.appendTo(this.parent);
            this.modal.appendTo(document.body);
            this.container.element.onclick = () => this.sidebar.getMobile().close();
            this.container.element.onmouseover = () => this.sidebar.getMobile().close();
            this.container.element.onscroll = () => this.sidebar.getMobile().close();
            setStyles(document.body, {
                backgroundColor: "#151515",
                backgroundSize: "cover",
                //  backgroundImage: `url(${Configurations.PATHS.WALLPAPERS}/wallpaper.png)`,
            });
        }
        /**
         * Load a view
         * @param {array} params
         */
        load(params) {
            Router.setTitle("Akrck02");
            try {
                this.clear();
                switch (params[0]) {
                    case undefined:
                    case "":
                    case "home":
                        new HomeView().show(params.splice(1), this.container);
                        this.sidebar.setSelected(0);
                        break;
                    case "software":
                        SoftwareRouter.load(params.splice(1), this.container);
                        this.sidebar.setSelected(1);
                        break;
                    case "error":
                        new ErrorV().show(params.splice(1), this.container);
                        break;
                    case "dummy":
                        new DummyView().show(params.splice(1), this.container);
                        break;
                    case "games":
                        Router.setTitle("Games");
                        new ConstructionView().show(params.splice(1), this.container);
                        this.sidebar.setSelected(2);
                        break;
                    case "media":
                        Router.setTitle("Media");
                        new ConstructionView().show(params.splice(1), this.container);
                        this.sidebar.setSelected(3);
                        break;
                    default:
                        location.href = Configurations.VIEWS.ERROR + "404";
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        static setTitle(title) {
            const titleComp = document.querySelector("#os-navbar #title-bar h1");
            titleComp.innerHTML = title;
        }
        /** show a view */
        clear() {
            this.container.element.innerHTML = "";
        }
    }

    /**
     * Main application class
     */
    class App {
        constructor() {
            this.listeners = new ListenerSet();
            this.router = new Router(this.listeners);
            // Create event listeners
            Keyboard.setEventListeners(this.listeners);
            Window.setEvents();
            // Set the notification element
            this.notification = new UINotification();
            document.body.appendChild(this.notification.element);
            // Override the default notification function
            window.alert = (properties) => {
                this.notification.setContent(properties);
                this.notification.show(properties.time);
                // If the desktop notification are active 
                if (properties.desktop) {
                    new Notification("Valhalla", {
                        icon: Configurations.PATHS.ICONS + "logo-light.png",
                        body: properties.message,
                    });
                }
            };
            // if has animation, set the html variable
            Configurations.setAnimations(Configurations.areAnimationsEnabled());
            // Log that the app is loaded
            console.log(Configurations.BASE.APP_NAME + " " + Configurations.BASE.APP_VERSION + " is loaded!");
        }
        /**
         * Load the app from url
         */
        loadFromUrl() {
            const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
            //if secret key is not set, redirect to tutorial
            if (!Configurations.getConfigVariable("secret")) ;
            const titleElement = document.getElementById("title");
            if (titleElement)
                titleElement.onclick = () => location.href = Configurations.VIEWS.BASE_URL;
            this.router.load(params);
        }
        /**
         * Get current language text bundle
         * @returns
         */
        static getBundle() {
            let lang = Configurations.getConfigVariable("LANG");
            if (!lang) {
                lang = navigator.language;
            }
            return TextBundle.get(lang);
        }
        /**
         * Redirect to url with '/' separated params
         * @param url The URL to be redirected to
         * @param params The parameter Array
         */
        static redirect(url, params, force = false) {
            if (force) {
                location.href = Configurations.VIEWS.DUMMY;
            }
            url += params.join("/");
            location.href = url;
        }
    }
    /**
     * App entry points
     */
    exports.APP = void 0;
    window.addEventListener('hashchange', () => {
        exports.APP.loadFromUrl();
    });
    window.onload = async () => {
        if (exports.APP === undefined) {
            await Configurations.setDefaultVariables();
            exports.APP = new App();
            Configurations.setTheme("dark");
            const theme = Configurations.getTheme();
            Configurations.setTheme(theme);
        }
        exports.APP.loadFromUrl();
    };

    exports.App = App;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
