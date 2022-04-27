import { ConfigService } from "../services/config.js";
export var ENVIROMENT;
(function (ENVIROMENT) {
    ENVIROMENT["DEVELOPMENT"] = "development";
    ENVIROMENT["PRODUCTION"] = "production";
})(ENVIROMENT || (ENVIROMENT = {}));
export class Configurations {
    /**
     * Set default configurations for the application
     */
    static async setDefaultVariables() {
        await ConfigService.getAppConfig().success(json => {
            this.BASE.APP_NAME = json.APP_NAME;
            this.BASE.APP_VERSION = json.VERSION;
            this.BASE.ENVIRONMENT = json.ENVIRONMENT;
        }).jsonPromise();
        if (!Configurations.getConfigVariable("ANIMATIONS")) {
            this.setAnimations(true);
        }
    }
    /**
     * Toogle the dark / light mode.
     * if a wallpaper is set, does not change the theme
     */
    static toggleTheme() {
        if (Configurations.getConfigVariable("WALLPAPER")) {
            return;
        }
        Configurations.setTheme((Configurations.getConfigVariable("THEME") === "light") ? "dark" : "light");
    }
    /**
     * Set the application UI theme
     * @param theme the theme to set
     */
    static setTheme(theme) {
        if (!theme)
            theme = "dark";
        this.addConfigVariable("THEME", theme);
        this.addConfigVariable("WALLPAPER", false);
        document.documentElement.dataset.theme = theme;
    }
    static getTheme() {
        return Configurations.getConfigVariable("THEME");
    }
    /**
     * Get if the dark mode is active
     * @returns true if the dark mode is active
     */
    static isDarkModeActive() {
        return Configurations.getTheme() === "dark";
    }
    /**
     * Set the animations on/off
     * @param animations true to enable animations
     */
    static setAnimations(animations) {
        document.documentElement.dataset.animations = animations ? "true" : "false";
        this.addConfigVariable("ANIMATIONS", animations);
    }
    /**
     * Get if the animations are enabled
     * @returns true if the animations are enableds
     */
    static areAnimationsEnabled() {
        return Configurations.getConfigVariable("ANIMATIONS") + "" === "true";
    }
    /**
     * Get application configurations
     * @returns the application configurations
     */
    static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem("akrck02.github.io-config"));
        if (!localStorageConfiguration) {
            localStorageConfiguration = {};
        }
        return localStorageConfiguration;
    }
    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    static addConfigVariable(key, value) {
        let localStorageConfiguration = Configurations.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem("akrck02.github.io-config", JSON.stringify(config));
    }
    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    static getConfigVariable(key) {
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }
}
//global runtime configurations
Configurations.BASE = {
    APP_NAME: "akrck02.github.io",
    APP_VERSION: "v.x.x",
    HOST: "127.0.0.1",
    PORT: 80,
    URL: location.href,
    ENVIRONMENT: ENVIROMENT.DEVELOPMENT,
    DEBUG: true,
    LOG_LEVEL: "debug",
    LOG_FILE: "app.log",
};
Configurations.PATHS = {
    WEB: "../web/",
    ROOT: "../client/",
    LOGS: "../client/logs/",
    RESOURCES: "../client/resources/",
    IMAGES: "../client/resources/images/",
    ICONS: "../client/resources/icons/",
    WALLPAPERS: "../client/resources/wallpapers/",
};
Configurations.VIEWS = {
    BASE_URL: "../#/",
    HOME: "../#/home",
    SOFTWARE: "../#/software",
    ERROR: "../#/error/",
    DUMMY: "../#/dummy/",
};
Configurations.API = {};
