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
    };

    class UINotification extends UIComponent {
        constructor() {
            super({
                type: "notification",
                classes: ["box-column"],
                styles: {
                    position: "fixed",
                    bottom: "-5rem",
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
                    bottom: "1rem",
                    opacity: "1",
                    transition: ".5s",
                });
            }, 1);
            this.showing = true;
            setTimeout(() => {
                setStyles(this.element, {
                    bottom: "-5rem",
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
            const width = window.innerWidth;
            if (width < this.FULLHD_WIDTH / 2 + 100) {
                document.body.style['zoom'] = this.DEFAULT_ZOOM * ((width / this.FULLHD_WIDTH) * 1.8);
            }
            else {
                document.body.style['zoom'] = this.DEFAULT_ZOOM;
            }
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
        NOTES: "Notes"
    };

    const SystemBundleEs = {
        NOT_IMPLEMENTED_YET: "Función en desarrollo",
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
        NOTES: "Notas"
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
            //lang = "es";
            switch (lang) {
                case "en":
                    return this.getBundleEn();
                case "es":
                    return this.getBundleEs();
                default:
                    return this.getBundleEn();
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
            this.build();
            this.appendChild(this.buttonBar);
        }
        build() {
            const home = this.createIcon("home", Configurations.VIEWS.HOME);
            const software = this.createIcon("code", Configurations.VIEWS.SOFTWARE);
            const games = this.createIcon("sport_esports", Configurations.VIEWS.GAMES);
            const media = this.createIcon("movie", Configurations.VIEWS.MEDIA);
            this.elements = [home, software, games, media];
            this.elements.forEach((element) => {
                this.buttonBar.appendChild(element);
            });
            if (isSmallDevice()) {
                const mobileSidebar = document.querySelector("header #mobile-sidebar");
                this.elements.forEach((element) => {
                    mobileSidebar.appendChild(element.element);
                });
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
        show() {
        }
        ;
    }

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
        valhalla: `
    <path d="M6.82319 18.6453C6.80167 18.5892 7.51098 18.0325 8.06779 17.6684C8.16714 17.6034 8.36498 17.4706 8.50744 17.3731C8.6499 17.2757 8.78766 17.196 8.81357 17.196C8.83948 17.196 8.86777 17.18 8.87643 17.1605C8.89559 17.1174 9.18364 16.9125 9.22507 16.9125C9.24136 16.9125 9.40846 16.8062 9.5964 16.6763C9.94355 16.4363 10.0689 16.393 10.1092 16.4991C10.1325 16.5604 10.0184 17.012 9.85555 17.5031C9.80386 17.659 9.7112 17.9538 9.64965 18.1582C9.52181 18.5828 9.5251 18.5786 9.26465 18.6526C8.97365 18.7352 6.85526 18.7289 6.82319 18.6453V18.6453ZM18.5536 18.6493C18.5146 18.6165 18.4327 18.3877 18.3716 18.1408C18.3104 17.894 18.2111 17.5645 18.1509 17.4086C18.0907 17.2527 18.016 16.9975 17.9849 16.8416C17.9161 16.4962 17.5642 15.2108 17.2154 14.0306C16.9001 12.9638 16.6953 12.0685 16.7325 11.92C16.7553 11.8294 17.32 11.3578 17.7409 11.0779C18.3022 10.7045 18.8762 10.3163 19.3565 9.98538L19.9468 9.57859L20.2465 9.60265C20.4676 9.6204 20.641 9.67448 20.9081 9.80898C21.227 9.96955 21.2959 10.0289 21.4866 10.3074C21.6866 10.5994 21.7073 10.6577 21.7583 11.0723C21.7886 11.3192 21.8134 11.8573 21.8134 12.268C21.8134 13.1639 21.7396 13.5884 21.5406 13.8367C21.366 14.0545 20.9385 14.3139 20.7525 14.3148C20.4973 14.3161 20.475 14.3583 20.5588 14.6816C20.6512 15.0383 20.9395 15.8724 21.0686 16.1566C21.1218 16.2735 21.2122 16.5393 21.2696 16.7471C21.3269 16.955 21.4515 17.3761 21.5464 17.683C21.7394 18.307 21.7652 18.5816 21.6363 18.6418C21.4887 18.7107 18.6348 18.7177 18.5536 18.6493V18.6493ZM20.4438 13.2629C20.5297 13.2044 20.639 13.1034 20.6866 13.0385C20.8682 12.7908 20.9301 11.9131 20.7941 11.5141C20.6318 11.0377 20.0413 10.601 19.5221 10.5734C19.3018 10.5617 19.285 10.5687 19.2733 10.6776C19.2664 10.7418 19.3476 11.0389 19.4538 11.3377C19.56 11.6365 19.7506 12.1858 19.8773 12.5582C20.0957 13.2001 20.1741 13.3692 20.2532 13.3692C20.2721 13.3692 20.3579 13.3214 20.4438 13.2629V13.2629ZM10.4333 18.6279C10.3293 18.6068 10.3229 18.5887 10.3478 18.3848C10.3626 18.2636 10.4929 17.7971 10.6374 17.3481C10.7818 16.8991 10.9001 16.4911 10.9001 16.4415C10.9001 16.3918 10.919 16.3395 10.9421 16.3252C10.9652 16.3109 10.9984 16.2406 11.016 16.1689C11.0824 15.8976 11.2806 15.5511 11.4641 15.3853C11.6542 15.2136 12.4844 14.6448 12.5451 14.6448C12.5628 14.6447 12.6952 14.5521 12.8395 14.4388C12.9838 14.3256 13.1819 14.1949 13.2798 14.1484C13.3778 14.102 13.516 14.0059 13.5869 13.9349C13.6579 13.8639 13.7999 13.7627 13.9025 13.71C14.0051 13.6572 14.1515 13.5483 14.2278 13.468C14.3041 13.3877 14.3956 13.322 14.4311 13.322C14.4666 13.322 14.5738 13.2688 14.6694 13.2038C14.9978 12.9807 15.0884 13.0758 14.9898 13.5402C14.8354 14.2669 13.6376 18.5371 13.5687 18.6061C13.5332 18.6417 10.6022 18.662 10.4333 18.6279V18.6279ZM5.56534 17.1842C5.07546 15.7594 4.68174 14.691 4.62595 14.6353C4.60595 14.6152 4.21791 14.5675 3.76364 14.5291C2.97057 14.4621 2.63952 14.3916 2.4087 14.2403C2.27501 14.1527 2.26767 13.9834 2.39612 13.9498C2.44809 13.9362 2.49061 13.9078 2.49061 13.8866C2.49061 13.8654 2.53238 13.8347 2.58343 13.8185C2.63448 13.8023 2.82363 13.7038 3.00376 13.5995C3.32883 13.4113 3.33331 13.4102 3.60466 13.4604C3.97629 13.5291 4.23877 13.5256 4.23813 13.4519C4.23784 13.4194 4.20578 13.2879 4.16687 13.1596C4.12796 13.0313 4.10726 12.8913 4.12086 12.8485C4.15208 12.7501 5.55776 11.7559 5.98141 11.5325C6.04927 11.4967 6.15793 11.4194 6.22289 11.3606C6.28785 11.3019 6.38464 11.2407 6.43797 11.2247C6.63865 11.1643 6.69683 11.2846 6.94003 12.2621C7.06889 12.7801 7.19282 13.2783 7.21543 13.3692C7.23804 13.4601 7.28832 13.6515 7.32716 13.7944C7.42271 14.146 7.58574 14.7614 7.65469 15.0306C7.68574 15.1519 7.72368 15.2637 7.739 15.279C7.77539 15.3154 7.98907 14.6115 8.13232 13.9834C8.19454 13.7105 8.27681 13.4129 8.31515 13.322C8.3535 13.231 8.42178 12.9865 8.46689 12.7786C8.51199 12.5708 8.56591 12.3582 8.58671 12.3062C8.6075 12.2542 8.75492 11.6909 8.91432 11.0542C9.37003 9.23414 9.40428 9.15013 9.77613 8.93974C9.91358 8.86197 10.0792 8.74501 10.1441 8.67983C10.2091 8.61465 10.4014 8.48486 10.5715 8.39141C10.7417 8.29795 10.9745 8.14134 11.0889 8.04338C11.2033 7.94542 11.4575 7.75821 11.6536 7.62735C12.106 7.32561 12.7989 6.85789 12.8607 6.81256C13.068 6.6605 13.1921 6.60955 13.3239 6.62231C13.4633 6.63581 13.4739 6.64887 13.4625 6.79351C13.4556 6.87963 13.4105 7.02845 13.3621 7.12422C13.283 7.28065 13.1003 7.81926 12.8301 8.69204C12.7778 8.86094 12.6968 9.08416 12.65 9.1881C12.6031 9.29204 12.5081 9.58575 12.4388 9.8408C12.2249 10.6275 10.7968 14.7072 10.5014 15.3749C10.4101 15.5815 10.3418 15.6553 10.1011 15.8076C9.64613 16.0954 7.98987 17.2246 7.54572 17.5498C7.10076 17.8755 6.56204 18.2353 6.51928 18.2353C6.50409 18.2353 6.42197 18.2885 6.3368 18.3534C6.03979 18.58 6.0512 18.5973 5.56534 17.1842ZM11.5754 14.613C11.5586 14.5691 11.6517 14.2177 11.7851 13.8217C11.9171 13.4299 12.125 12.8117 12.2471 12.4479C12.3692 12.0842 12.5432 11.5846 12.6338 11.3377C12.9198 10.5586 13.5921 8.59764 13.7837 7.98338C13.9856 7.33645 14.1325 6.88233 14.2353 6.58762C14.3347 6.30293 14.4599 6.28259 16.1142 6.28259C17.7145 6.28259 17.7718 6.2925 17.8482 6.58227C17.8767 6.69028 18.0595 7.25611 18.2544 7.83968C18.6149 8.91899 18.8301 9.45613 18.9257 9.51518C18.9549 9.53323 18.9788 9.60034 18.9788 9.6643C18.9788 9.77971 18.8033 9.93358 18.3902 10.1802C18.3032 10.2322 18.0758 10.3807 17.8849 10.5103C17.694 10.6399 17.5041 10.7675 17.4627 10.7938C17.4214 10.8201 17.2352 10.9426 17.0489 11.0661C16.8626 11.1895 16.6596 11.2905 16.5978 11.2905C16.4823 11.2905 16.4821 11.2901 16.3981 10.8535C16.3818 10.769 16.3518 10.6787 16.3314 10.6527C16.311 10.6267 16.2801 10.5204 16.2626 10.4164C16.2083 10.093 16.0963 9.73141 16.0503 9.73141C15.9888 9.73141 15.6981 10.7545 15.6024 11.3081C15.585 11.4087 15.5511 11.5257 15.527 11.5679C15.5029 11.6102 15.4377 11.7723 15.3821 11.9283C15.2577 12.2767 15.0428 12.4938 14.4703 12.8495C14.2403 12.9924 13.9115 13.197 13.7398 13.3042C13.5681 13.4114 13.3286 13.5868 13.2075 13.694C13.0865 13.8012 12.968 13.8889 12.9442 13.8889C12.9204 13.8889 12.6368 14.0693 12.3139 14.2899C11.6992 14.7097 11.625 14.7422 11.5754 14.613V14.613ZM1.76355 13.6275C1.72374 13.5877 1.68128 13.4867 1.6692 13.4031C1.56837 12.7054 1.54514 12.407 1.54541 11.813C1.54591 10.7241 1.65937 10.3141 2.05701 9.9641C2.26143 9.78416 2.61988 9.63692 2.85351 9.63692C2.9369 9.63692 2.96305 9.61049 2.96305 9.52621C2.96305 9.39651 2.82419 8.98885 2.68372 8.70613C2.62948 8.59695 2.58509 8.47897 2.58509 8.44395C2.58509 8.40893 2.47755 8.04117 2.34611 7.62671C2.21467 7.21225 2.09488 6.76265 2.07991 6.62761C2.05339 6.38823 2.05613 6.38112 2.18898 6.34414C2.34236 6.30145 4.81383 6.30996 5.12447 6.35424C5.27317 6.37544 5.32525 6.40429 5.32525 6.46543C5.32525 6.51084 5.35647 6.58927 5.39462 6.6397C5.43277 6.69014 5.46466 6.78553 5.46548 6.85168C5.46631 6.91782 5.61605 7.5131 5.79823 8.17451C6.43554 10.4882 6.44058 10.511 6.35354 10.6936C6.30233 10.8009 6.20675 10.8875 6.06206 10.9576C5.94365 11.0149 5.74537 11.1504 5.62144 11.2588C5.49751 11.3672 5.30045 11.5041 5.18352 11.5632C5.06659 11.6222 4.7709 11.8199 4.52643 12.0025C3.97809 12.412 3.91636 12.4137 3.79979 12.0227C3.60868 11.3818 3.417 10.8268 3.35964 10.7483C3.21289 10.5476 2.77637 10.8137 2.65018 11.1808C2.55987 11.4434 2.5168 12.0721 2.57526 12.2743C2.60287 12.3698 2.66915 12.5907 2.72253 12.7652C2.77592 12.9397 2.80757 13.1138 2.79287 13.1521C2.75678 13.2462 2.50451 13.4168 2.12706 13.6024C1.88986 13.7191 1.85736 13.7213 1.76355 13.6275V13.6275ZM9.74462 8.2733C9.71692 8.186 9.96196 7.15772 10.1284 6.66286C10.2046 6.43636 10.2344 6.40039 10.376 6.3643C10.5662 6.31583 12.53 6.33747 12.581 6.3886C12.6002 6.40793 12.5754 6.46902 12.5257 6.52435C12.4028 6.66135 11.2538 7.47637 11.0127 7.59762C10.9057 7.6514 10.7569 7.74555 10.682 7.80685C10.607 7.86815 10.45 7.97326 10.3331 8.04043C10.2161 8.1076 10.0799 8.20728 10.0305 8.26195C9.91915 8.38495 9.78179 8.39041 9.74462 8.2733V8.2733Z"/>`,
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
                    fontFamily: "Inter",
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
                    href: "https://github.com/akrck02/valhalla",
                    target: "_blank"
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
                    marginTop: ".1rem",
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
            const icon = new UIComponent({
                type: "img",
                attributes: {
                    src: `${Configurations.PATHS.ICONS}/${name.toLowerCase().replace("#", "sharp")}.svg`,
                },
                styles: {
                    width: size * .55 + "rem",
                    height: size * .55 + "rem",
                }
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
            langs: ["Typescript", "Mariadb", "HTML", "CSS"],
            icon: Configurations.PATHS.ICONS + "valhalla-logo-light.svg",
            url: Configurations.VIEWS.SOFTWARE + "/valhalla",
            github: "akrck02/valhalla"
        },
        "GTD Framework": {
            technologies: [],
            langs: ["Typescript"],
            github: "akrck02/GTD-Framework",
            icon: Configurations.PATHS.ICONS + "gtdf-logo.svg",
        },
        "GTD-LIB-TS": {
            technologies: ["docker"],
            langs: ["Typescript"],
            github: "akrck02/GTD-LIB-TS",
            icon: Configurations.PATHS.ICONS + "gtd-logo.svg",
        },
        "GTDF-CLI": {
            technologies: [],
            langs: ["Go"],
            github: "akrck02/GTDF-CLI",
            icon: Configurations.PATHS.ICONS + "gtdf-cli-logo.svg",
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
            langs: ["Typescript"],
            github: "akrck02/Github-backup-script",
            icon: Configurations.PATHS.ICONS + "gh-backup-script-logo.svg",
        },
        "moonbot": {
            technologies: ["Nodejs", "discordjs"],
            langs: ["Typescript"],
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
                text: name,
            });
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
                const icon = new UIComponent({
                    type: "img",
                    id: "software-view-navbar-item-icon",
                    attributes: {
                        src: Configurations.PATHS.ICONS + name.replace("#", "sharp") + ".svg",
                        alt: name
                    },
                });
                item.appendChild(icon);
            }
            else {
                const icon = getMaterialIcon("all_inclusive", {
                    size: "1.5rem",
                    fill: "#fff",
                });
                item.appendChild(icon);
            }
            return item;
        }
        showTechByCategory(category) {
            this.selected = category;
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
                    text: name
                });
                if (project.icon) {
                    const logo = new UIComponent({
                        type: "img",
                        attributes: {
                            src: project.icon,
                        },
                        styles: {
                            width: "6rem",
                            height: "6rem",
                            filter: "drop-shadow(0 .2rem .2rem rgba(0,0,0,.35))"
                        }
                    });
                    projectComp.appendChild(logo);
                }
                else {
                    const defaultIcon = getMaterialIcon("code", {
                        fill: "#fff",
                        size: "4rem"
                    });
                    setStyles(defaultIcon.element, {
                        marginBottom: "1rem",
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

    class ValhallaView extends UIComponent {
        constructor() {
            super({
                type: "view",
                id: "valhalla-view",
                classes: ["box-column"],
                styles: {
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                }
            });
        }
        show(params, container) {
            const section = this.buildPresentationSection();
            const task = this.buildTaskSection();
            const notes = this.buildNoteSection();
            this.appendChild(section);
            this.appendChild(task);
            this.appendChild(notes);
            container.appendChild(this);
        }
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
                    href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.6b/Valhalla.Setup.1.0.6-b.exe",
                },
                styles: {
                    fontSize: ".9rem",
                    backgroundColor: "rgba(255,255,255,.1)",
                    padding: "1rem",
                    borderRadius: ".15rem",
                    color: "white",
                }
            });
            const downloadLinux = new UIComponent({
                type: "a",
                id: "valhalla-view-download",
                text: App.getBundle().valhalla.DOWNLOAD_FOR_LINUX,
                attributes: {
                    href: "https://github.com/akrck02/Valhalla/releases/download/v1.0.6b/Valhalla-1.0.6-b.AppImage",
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
        buildNoteSection() {
            const section = new UIComponent({
                type: "div",
                id: "valhalla-view-task",
                classes: ["box-row", "box-center", "section"],
                styles: {
                    position: "relative",
                    width: "100%",
                    minHeight: "100%",
                }
            });
            const description = new UIComponent({
                type: "p",
                id: "valhalla-view-task-description",
                text: `
            Valhalla is a modern productivity app that helps you 
            manage your tasks and projects.
            
            It is a simple, yet powerful tool that can help 
            you manage your tasks and projects.
            `.replaceAll("\n", "<br>"),
                styles: {
                    width: "30%",
                }
            });
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
                text: "This page is under construction ",
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
            const navbar = document.getElementById("os-navbar");
            const navbarTitleBar = document.querySelector("#os-navbar .title-bar");
            const mobileSidebar = document.querySelector("header #mobile-sidebar");
            const icon = getMaterialIcon("menu_open", { size: "1.5rem", fill: "#fff" });
            icon.element.style.cursor = "pointer";
            icon.element.addEventListener("click", () => {
                navbar.style.transition = "height var(--medium)";
                if (navbar.style.height != "15rem") {
                    navbar.style.height = "15rem";
                    navbar.style.justifyContent = "flex-start";
                    mobileSidebar.style.display = "flex";
                }
                else {
                    navbar.style.height = "4.1rem";
                    navbar.style.padding = ".1rem 2rem";
                    navbar.style.alignItems = "center";
                    mobileSidebar.style.display = "none";
                }
            });
            navbarTitleBar.appendChild(icon.element);
            setStyles(document.body, {
                backgroundColor: "#151515",
                backgroundSize: "cover",
                backgroundImage: `url(${Configurations.PATHS.WALLPAPERS}/wallpaper.png)`,
            });
        }
        /**
         * Load a view
         * @param {array} params
         */
        load(params) {
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
                        new ConstructionView().show(params.splice(1), this.container);
                        this.sidebar.setSelected(2);
                        break;
                    case "media":
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
            // Adjust zoom 
            Window.setZoomLevel();
            // Set the language
            //Configurations.addConfigVariable("LANG", "es");
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
