//@DEPENDENCIES
import { isEmpty } from "./GTD_DataTools.js";

/**
 * Fetch JSON
 * @param {*} properties - The fetch options
 */
export const fetchJSON = (properties) => {
  properties = checkFetchProperties(properties);
  const url = properties.url;
  const method = properties.method;

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.json();
      else properties.fail(json);
    })
    .then((json) => properties.success(json))
    .catch(function (err) {
      properties.error(err);
    });
};

/**
 * Fetch BLOB
 * @param {*} properties - The Fetch options
 */
export const fetchBLOB = (properties) => {
  properties = checkFetchProperties(properties);
  const url = properties.url;
  const method = properties.method;

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.blob();
      else properties.fail(json);
    })
    .then((blob) => properties.success(blob))
    .catch(function (err) {
      properties.error(err);
    });
};

/**
 * Fetch plain text
 * @param {*} properties - The Fetch options
 */
export const fetchText = (properties) => {
  properties = checkFetchProperties(properties);
  const url = properties.url;
  const method = properties.method;

  fetch(url, method)
    .then((response) => {
      if (response.ok) return response.text();
      else properties.fail(json);
    })
    .then((text) => properties.success(text))
    .catch(function (err) {
      properties.error(err);
    });
};

/**
 * Checks fetch properties
 * @param {*} properties  - The fetch properties
 * @returns checked properties
 */
const checkFetchProperties = (properties) => {
  if (isEmpty(properties.method)) properties.method = { method: "POST" };
  else properties.method = { method: properties.method };

  if (isEmpty(properties.url)) properties.url = "https://127.0.0.1";
  if (isEmpty(properties.success)) properties.success = () => {};
  if (isEmpty(properties.fail)) properties.fail = () => {};
  if (isEmpty(properties.error)) properties.error = () => {};

  return properties;
};
