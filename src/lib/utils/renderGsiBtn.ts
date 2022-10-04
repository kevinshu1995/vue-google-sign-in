import jwtDecode from "jwt-decode";
import { Log, type CustomConsole } from "../utils/log";
import type { CallbackDecode, GsiBtnConfig, Window } from "../types";

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
    if ((window as Window).google !== undefined) {
        fn();
        return;
    }
    const script = document.createElement("script");
    script.src = googleScriptSrc;
    script.onload = fn;
    document.head.appendChild(script);
};

const initGoogle = (configs: GsiBtnConfig, log: CustomConsole | null): void => {
    const g = (window as Window).google;
    if (g === undefined) {
        log?.error('"google" is not defined');
        return;
    }

    const { button, triggerPrompt, debug, callback, ...otherConfigs } = configs;

    if (state.isInitialized === false) {
        state.isInitialized = true;
        // * decode response with jwt_decode
        g.accounts.id.initialize({
            callback: response => {
                const decode: CallbackDecode = {
                    response,
                    profile: response.credential ? jwtDecode(response.credential) : null,
                };
                log?.info("Response: ", decode);
                return () => configs.callback(decode);
            },
            ...otherConfigs,
        });
    }
    if (button.HTMLElement === null) {
        return log?.error("button.HTMLElement should not be null");
    }
    g.accounts.id.renderButton(button.HTMLElement, button.themeConfig, () => {
        console.log("test");
    });
};

export function RenderGsiBtn(configs: GsiBtnConfig): GsiBtn {
    const log: CustomConsole | null = Log(configs.debug ?? false);

    const { trigger_prompt } = configs;

    const initialize = () => {
        log?.info("before loading google script");

        loadGoogleScript(() => {
            log?.info("google script loaded. now initializing and render button");
            initGoogle(configs, log);
            console.log("configs", configs);

            const g = (window as any).google;
            if (g && trigger_prompt) {
                g.accounts.id.prompt();
            }
        });
    };

    initialize();

    return {
        log,
    };
}

