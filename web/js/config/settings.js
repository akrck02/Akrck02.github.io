export const settings = () => {
  let set = {};

  set.PATH = "http://192.168.0.20/akrck02.com/";
  set.RESOURCES = set.PATH + 'web/res/';
  set.LSS_RESOURCES = set.RESOURCES + 'LSS/';
  set.LSS_ICONS = set.LSS_RESOURCES + 'icons/';

  return set;
};
