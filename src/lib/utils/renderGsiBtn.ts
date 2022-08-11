import type { GsiBtnConfig } from "../types";

const googleScriptSrc: string = "https://accounts.google.com/gsi/client";

const loadGoogleScript = (fn: any): void => {
    const script = document.createElement("script");
    script.src = googleScriptSrc;
    script.onload = () => {
        fn();
    };
    document.head.appendChild(script);
};

const initGoogle = (configs: GsiBtnConfig): void => {
    const g = (window as any).google;
    const { callback, clientId, button } = configs;
    g.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
    });
    g.accounts.id.renderButton(button.HTMLElement, button.themeConfig);
};

export function RenderGsiBtn(configs: GsiBtnConfig) {
    // TODO make sure the script is only loaded or initialized once
    const initialize = () => {
        loadGoogleScript(() => initGoogle(configs));
    };

    initialize();

    return {};
}

