import type { ClientId } from "./types";
import { unref } from "vue-demi";
import type { Ref } from "vue-demi";

// customization attributes - doc https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
interface ButtonThemeConfig {
    type: string;
    theme: string;
    size: string;
    text: string;
    shape: string;
    logo_alignment: string;
    width: string;
    locale: string;
}

interface InitGoogleConfig {
    callback: OnSignInSuccess;
    clientId: ClientId;
    button: {
        ref: Ref | HTMLInputElement | null;
        themeConfig: ButtonThemeConfig;
    };
}

export interface CallbackResponse {
    clientId: ClientId;
    credential: string;
    select_by: string;
}

type OnSignInSuccess = (response: CallbackResponse) => void;

const googleScriptSrc: string = "https://accounts.google.com/gsi/client";

const loadGoogleScript = (fn: any): void => {
    const script = document.createElement("script");
    script.onload = () => {
        fn();
        console.info(`Script is loaded. src:${googleScriptSrc}`);
    };
    script.src = googleScriptSrc;
    document.head.appendChild(script);
};

const initGoogle = (configs: InitGoogleConfig): void => {
    const g = (window as any).google;
    const { callback, clientId, button } = configs;
    g.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
    });
    g.accounts.id.renderButton(unref(button.ref), button.themeConfig);
};

const setupGoogleBtn = (configs: InitGoogleConfig): void => {
    loadGoogleScript(() => initGoogle(configs));
};

export { setupGoogleBtn };

