import * as colors from './colors/colors';
import * as https from './core/http';
import * as datetools from './data/datetools';
import * as easyfetch from './data/easyfetch';
import * as numeric from './data/numeric';
import * as urltools from './data/urltools';
import * as materialcolors from './material/materialcolors';
import * as materialicons from './material/materialicons';
import * as timetools from './sync/timetools';
import * as regexp from './validation/regexp';
import * as responsivetools from './web/responsivetools';
import * as uicomponent from './web/uicomponent';


export const MODULES = { 
    colors : colors,
    https : https,
    datetools : datetools,
    easyfetch : easyfetch,
    numeric : numeric,
    urltools : urltools,
    materialcolors : materialcolors,
    materialicons : materialicons,
    timetools : timetools,
    regexp : regexp,
    responsivetools : responsivetools,
    uicomponent : uicomponent,
}
