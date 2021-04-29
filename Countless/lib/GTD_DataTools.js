/**
 * Return if an object is empty
 * @param {*} object - The object to evaluate
 * @returns true or false
 */
export const isEmpty = (object) => {

  if (object == null)       return true;
  if (object == undefined)  return true;
  if (object == "")         return true;
  if (object.length == 0)   return true;

  return false;
}

export const exists = (object) => {
  return !isEmpty(object);
}

export const orElse = (object, value) => {
  return isEmpty(object) ? value : object;
}

export const jsonForEach = (object , fn) => {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      fn(object[key]);
    }
  }
}