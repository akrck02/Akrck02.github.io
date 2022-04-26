import { HTTPS_METHOD } from "../lib/gtd-ts/core/http.js";
import { efetch } from "../lib/gtd-ts/data/easyfetch.js";
export class ConfigService {
    static getAppConfig() {
        const response = efetch({
            method: HTTPS_METHOD.GET,
            url: "../version.json",
            parameters: {}
        });
        return response;
    }
}
