/** The properties of the UI Component. */
export interface UIProperties {
    type?: string;
    text?: string;
    id?: string;
    classes?: string[];
    attributes?: {
        [key: string]: string;
    };
    selectable?: boolean;
    styles?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: string;
    };
}
/** Create a DOM element */
export declare function uiComponent(properties?: UIProperties): HTMLElement;
/** Set DOM attributes */
export declare function setDomAttributes(element: HTMLElement, attributes: {
    [key: string]: string;
}): HTMLElement;
/** Remove the DOM attributes */
export declare function removeDomAttributes(element: HTMLElement, attributes: string[]): HTMLElement;
/** Set DOM classes */
export declare function setDomClasses(element: HTMLElement, classes: string[]): HTMLElement;
/** Set DOM classes */
export declare function removeDomClasses(element: HTMLElement, classes: string[]): HTMLElement;
/** Set DOM styles */
export declare function setDomStyles(element: HTMLElement, styles: {
    [key: string]: string;
}): HTMLElement;
/** Remove DOM styles */
export declare function removeDomStyles(element: HTMLElement, styles: string[]): HTMLElement;
/** Set DOM events*/
export declare function setDomEvents(element: HTMLElement, events: {
    [key: string]: (event: Event) => void;
}): HTMLElement;
/** Remove DOM events */
export declare function removeDomEvents(element: HTMLElement, events: {
    [key: string]: (event: Event) => void;
}): HTMLElement;
/** Set DOM dataset */
export declare function setDomDataset(element: HTMLElement, dataset: {
    [key: string]: string;
}): HTMLElement;
/** Remove DOM dataset */
export declare function removeDomDataset(element: HTMLElement, dataset: string[]): HTMLElement;
/** Remove DOM element by selector */
export declare function removeDomById(id: string): void;
/** Remove all DOM elements by query selector */
export declare function removeAllDomBySelector(selector: string): number;
