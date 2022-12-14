import jwtDecode from "jwt-decode";
import { camelToSnake } from "../utils/stringFormat";
import { Log, type CustomConsole } from "../utils/log";
import type { CallbackDecode, GsiBtnConfig } from "../types";

export type prompt = () => void;

export interface GsiBtn {
    log: CustomConsole | null;
}

interface State {
    isInitialized: Boolean;
}

const googleScriptSrc: string = "https://accounts.google.com/gsi/client";

const state: State = {
    isInitialized: false,
};

const loadGoogleScript = (fn: any): void => {
    if ((window as any).google !== undefined) {
        fn();
        return;
    }
    const script = document.createElement("script");
    script.src = googleScriptSrc;
    script.onload = fn;
    document.head.appendChild(script);
};

const initGoogle = (configs: GsiBtnConfig): void => {
    const g = (window as any).google;
    const { button, triggerPrompt, debug, callback, ...otherConfigs } = configs;

    if (state.isInitialized === false) {
        state.isInitialized = true;

        // console.log(
        //     Object.entries(otherConfigs).reduce((acc, [key, value]) => {
        //         if (value === undefined) return acc;
        //         return {
        //             ...acc,
        //             [camelToSnake(key)]: value,
        //         };
        //     }, {})
        // );

        g.accounts.id.initialize({
            ...Object.entries(otherConfigs).reduce((acc, [key, value]) => {
                if (value === undefined) return acc;
                return {
                    ...acc,
                    [camelToSnake(key)]: value,
                };
            }, {}),
        });
    }
    g.accounts.id.renderButton(button.HTMLElement, button.themeConfig);
};

export function RenderGsiBtn(configs: GsiBtnConfig): GsiBtn {
    const log: CustomConsole | null = Log(configs.debug ?? false);

    const { triggerPrompt } = configs;

    const initialize = () => {
        log?.info("before loading google script");

        // * decode response with jwt_decode
        configs.callback = (response: any) => {
            const decode: CallbackDecode = {
                response,
                profile: jwtDecode(response.credential),
            };
            log?.info("Response: ", decode);
            return () => configs.callback(decode);
        };

        loadGoogleScript(() => {
            log?.info("google script loaded. now initializing and render button");
            initGoogle(configs);

            const g = (window as any).google;
            if (g && triggerPrompt) {
                g.accounts.id.prompt();
            }
        });
    };

    initialize();

    return {
        log,
    };
}
