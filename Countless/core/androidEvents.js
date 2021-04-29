
let android = undefined;

if (typeof Android !== 'undefined') {
    android = Android;
}
export const showAndroidToast = (toast) => {
    if(android)
        Android.showToast(toast);
}



export const showAndroidNotification = (title,content) => {
    if(android)
        Android.showNotification(title,content);
}
