import { unref } from "vue-demi";
import type { Ref } from "vue-demi";
import type { ClientId } from "../types";

// customization attributes - doc https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
export interface ButtonThemeConfig {
    type?: "standard" | "icon";
    theme?: "outline" | "filled_blue" | "filled_black";
    size?: "large" | "medium" | "small";
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
    shape?: "rectangular" | "pill" | "circle" | "square";
    logo_alignment?: "center" | "left";
    // TODO max number is 400
    width?: string;
    locale?: string;
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

export const useRenderGoogleSignInBtn = (configs: InitGoogleConfig): void => {
    // TODO make sure the script is only loaded or initialized once
    console.log("before loadGoogleScript");
    loadGoogleScript(() => initGoogle(configs));
};

