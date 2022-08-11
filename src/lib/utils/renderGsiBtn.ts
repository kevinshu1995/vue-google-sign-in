import type { GsiBtnConfig } from "../types";
import { Log } from "../utils/log";
import type { CustomConsole } from "../utils/log";

interface GsiBtn {
    log: CustomConsole | null;
}

const googleScriptSrc: string = "https://accounts.google.com/gsi/client";

const loadGoogleScript = (fn: any): void => {
    const script = document.createElement("script");
    script.src = googleScriptSrc;
    script.onload = fn;
    document.head.appendChild(script);
};

const initGoogle = (configs: GsiBtnConfig): void => {
    const g = (window as any).google;
    const { callback, clientId, button } = configs;
    g.accounts.id.initialize({
        client_id: clientId,
        callback,
    });
    g.accounts.id.renderButton(button.HTMLElement, button.themeConfig);
};

export function RenderGsiBtn(configs: GsiBtnConfig): GsiBtn {
    // TODO make sure the script is only loaded or initialized once
    const log: CustomConsole | null = Log(configs.debug ?? false);
    const initialize = () => {
        log?.info("before loading google script");
        loadGoogleScript(() => {
            log?.info("google script loaded. now initializing and render button");
            configs.callback = (...args) => {
                // configs.callback(args);
                log?.info("Response: ", ...args);
                return () => configs.callback(...args);
            };
            initGoogle(configs);
        });
    };

    initialize();

    return {
        log,
    };
}
