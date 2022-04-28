import { APP } from "../app.js";
import { setDataset, setStyles } from "../lib/gtd-ts/web/uicomponent.js";
import { ConfigService } from "../services/config.js";

export enum ENVIROMENT {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
}

export class Configurations {
    
    //global runtime configurations
    public static BASE = {
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

    public static PATHS = {
        WEB : "../web/",
        ROOT : "../client/",
        LOGS : "../client/logs/",
        RESOURCES : "../client/resources/",
        IMAGES : "../client/resources/images/",
        ICONS : "../client/resources/icons/",
        WALLPAPERS : "../client/resources/wallpapers/",

    };

    public static VIEWS = {
        BASE_URL: "../#/",
        HOME: "../#/home",
        SOFTWARE: "../#/software",
        GAMES: "../#/games",
        MEDIA: "../#/media",
        ERROR: "../#/error/",
        DUMMY: "../#/dummy/",
    };
    
    public static API = {};


    /**
     * Set default configurations for the application
     */
    public static async setDefaultVariables() {

        await ConfigService.getAppConfig().success(json => {
            this.BASE.APP_NAME = json.APP_NAME;
            this.BASE.APP_VERSION = json.VERSION;
            this.BASE.ENVIRONMENT = json.ENVIRONMENT;
            
        }).jsonPromise()

        if(!Configurations.getConfigVariable("ANIMATIONS")) {
            this.setAnimations(true);
        }
    }

    /**
     * Toogle the dark / light mode.
     * if a wallpaper is set, does not change the theme
     */
    public static toggleTheme() {
        if (Configurations.getConfigVariable("WALLPAPER")){
            return;
        }

        Configurations.setTheme((Configurations.getConfigVariable("THEME") === "light") ? "dark" : "light")
    }

    /**
     * Set the application UI theme 
     * @param theme the theme to set
     */
    public static setTheme(theme : string) {

        if(!theme)
            theme = "dark";

        this.addConfigVariable("THEME", theme);
        this.addConfigVariable("WALLPAPER", false);

        document.documentElement.dataset.theme = theme;
    }

    public static getTheme() {
        return Configurations.getConfigVariable("THEME");
    }

    /**
     * Get if the dark mode is active
     * @returns true if the dark mode is active
     */
    public static isDarkModeActive() {
        return Configurations.getTheme() === "dark";
    }

    /**
     * Set the animations on/off
     * @param animations true to enable animations
     */
    public static setAnimations(animations : boolean) {
        document.documentElement.dataset.animations = animations ? "true" : "false";
        this.addConfigVariable("ANIMATIONS", animations);
    }

    /**
     * Get if the animations are enabled
     * @returns true if the animations are enableds
     */
    public static areAnimationsEnabled() {
        return Configurations.getConfigVariable("ANIMATIONS") + "" === "true";
    }

    /**
     * Get application configurations
     * @returns the application configurations
     */
    public static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem("akrck02.github.io-config"));

        if(!localStorageConfiguration) {
            localStorageConfiguration = {}
        }

        return localStorageConfiguration;
    }

    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    public static addConfigVariable(key: string, value: any) {
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
    public static getConfigVariable(key: string) : string{
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }

}


