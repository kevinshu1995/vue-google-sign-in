export type ClientId = string;

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

export interface CallbackResponse {
    clientId: ClientId;
    credential: string;
    select_by: string;
}

export type OnSignInSuccess = (response: CallbackDecode) => void;

export interface CallbackDecode {
    response: CallbackResponse;
    profile: any;
}

export interface GsiBtnConfig {
    callback: OnSignInSuccess;
    button: {
        HTMLElement: HTMLElement | null;
        themeConfig: ButtonThemeConfig;
    };
    triggerPrompt?: Boolean;
    debug?: Boolean;
    // configs for google api
    clientId: ClientId;
    promptParent_id?: String;
    autoSelect?: Boolean;
    loginUri?: URL;
    nativeCallback?: Function;
    cancelOnTapOutside?: Function;
    nonce?: String;
    context?: "signin" | "signup" | "use";
    stateCookieDomain?: String;
    uxMode?: "popup" | "redirect";
    allowedParentOrigin?: string | string[];
    intermediateIframeCloseCallback?: Function;
    itpSupport?: Boolean;
}
