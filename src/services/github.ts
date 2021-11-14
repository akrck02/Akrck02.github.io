import { HTTPS_METHOD } from "../lib/gtd/core/http.js";
import { fetchJSON } from "../lib/gtd/data/easyfetch.js";


/**
 * Get the list of repositories for the given user.
 * @param user The user to get the repos for
 */
export function getUserRepos(user : string, fn: Function){
    const url = 'https://api.github.com/users/' + user + '/repos';
    const properties = {
        method: HTTPS_METHOD.GET,
        parameters: {},
        url: url,
        success: (json) => fn(json),
        error: (e) => console.error(e),
    };

    fetchJSON(properties);
}

