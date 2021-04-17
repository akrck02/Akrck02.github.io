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
