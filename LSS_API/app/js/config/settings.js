import * as web from "../../../../web/js/config/settings.js";
export const settings =
{
    ENVIROMENT      : "DEVELOPMENT",
    WEB_PATH        :  web.settings().PATH,
    PATH            :  web.settings().PATH +  "#/lss/app/",
    MAKER_PATH      :  web.settings().PATH +  "#/lss/app/maker/",
    REAL_PATH       :  web.settings().PATH + '/LSS_API/',
    FAVICON         :  web.settings().PATH + '/LSS_API/app/logo.png',
    THEME           : 'light',
    RESOURCES       :  web.settings().PATH + '/LSS_API/app/res/',
    ICONS           :  web.settings().PATH + '/LSS_API/app/res/icons/',
    COMMON_ICONS    :  web.settings().PATH + '/LSS_API/app/res/icons/common/',
    BACKEND_PATH    :  web.settings().PATH + "/LSS_API/app/rest/rest.php"
}
