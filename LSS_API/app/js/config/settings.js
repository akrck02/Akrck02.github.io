import * as web from "../../../../web/js/config/settings.js";
export const settings =
{
    ENVIROMENT      : "DEVELOPMENT",
    PATH            :  web.settings().PATH +  "/#/lss/app/",
    REAL_PATH       :  web.settings().PATH + '/LSS_API/',
    THEME           : 'light',
    RESOURCES       :  web.settings().PATH + '/LSS_API/app/res/',
    ICONS           :  web.settings().PATH + '/LSS_API/app/res/icons/',
    COMMON_ICONS    :  web.settings().PATH + '/LSS_API/app/res/icons/common/',
    BACKEND_PATH    :  web.settings().PATH + "/LSS_API/app/rest/rest.php"
}
