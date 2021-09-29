import { HTTPS_METHOD } from "../core/http";

export interface EasyFetchProperties {
    method: HTTPS_METHOD;
    parameters: object;
    url: string;
    success: Function;
    error: Function;
}

export function fetchJSON(properties: EasyFetchProperties): void {
    let options = {
        method: properties.method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: "",
    };

    if (properties.method === HTTPS_METHOD.POST) {
        options.body = JSON.stringify(properties.parameters);
    }

    try {
        fetch(properties.url, options)
            .then((response) => response.json())
            .then((json) => properties.success(json))
            .catch((error) => properties.error(error));
    } catch (err) {
        properties.error(err);
    }
}

/**
 * Fetch Text
 * @param {*} properties - The fetch options
 */
export function fetchText(properties): void {
    let options = {
        method: properties.method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: "",
    };

    if (properties.method === HTTPS_METHOD.POST) {
        options.body = JSON.stringify(properties.parameters);
    }

    try {
        fetch(properties.url, options)
            .then((response) => response.text())
            .then((text) => properties.success(text))
            .catch((error) => properties.error(error));
    } catch (err) {
        properties.error(err);
    }
}

/**
 * Fetch Blob
 * @param {*} properties - The fetch options
 */
export const fetchBlob = (properties) => {
    let options = {
        method: properties.method,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: "",
    };

    if (properties.method === HTTPS_METHOD.POST) {
        options.body = JSON.stringify(properties.parameters);
    }

    try {
        fetch(properties.url, options)
            .then((response) => response.json())
            .then((blob) => properties.success(blob))
            .catch((error) => properties.error(error));
    } catch (err) {
        properties.error(err);
    }
};
