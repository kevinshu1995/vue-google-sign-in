// customization attributes - doc https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
export interface GsiButtonConfiguration {
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

export type OnSignInSuccess = (response: CallbackDecode) => void;

export interface CallbackDecode {
    response: CredentialResponse;
    profile: any;
}

export interface GsiBtnConfig extends Omit<IdConfiguration, "callback"> {
    callback: OnSignInSuccess;
    button: {
        HTMLElement: HTMLElement | null;
        themeConfig: GsiButtonConfiguration;
    };
    triggerPrompt?: Boolean;
    debug?: Boolean;
}

// provide from google
export interface IdConfiguration {
    client_id: string;
    auto_select?: boolean;
    callback: (handleCredentialResponse: CredentialResponse) => void;
    login_uri?: string;
    native_callback?: Function;
    cancel_on_tap_outside?: boolean;
    prompt_parent_id?: string;
    nonce?: string;
    context?: "signin" | "signup" | "use";
    state_cookie_domain?: string;
    ux_mode?: "popup" | "redirect";
    allowed_parent_origin?: string | string[];
    intermediate_iframe_close_callback?: Function;
    itp_support?: boolean;
}

interface CredentialResponse {
    credential?: string;
    select_by?:
        | "auto"
        | "user"
        | "user_1tap"
        | "user_2tap"
        | "btn"
        | "btn_confirm"
        | "brn_add_session"
        | "btn_confirm_add_session";
    clientId?: string;
}

interface PromptMomentNotification {
    isDisplayMoment: () => boolean;
    isDisplayed: () => boolean;
    isNotDisplayed: () => boolean;
    getNotDisplayedReason: () =>
        | "browser_not_supported"
        | "invalid_client"
        | "missing_client_id"
        | "opt_out_or_no_session"
        | "secure_http_required"
        | "suppressed_by_user"
        | "unregistered_origin"
        | "unknown_reason";
    isSkippedMoment: () => boolean;
    getSkippedReason: () => "auto_cancel" | "user_cancel" | "tap_outside" | "issuing_failed";
    isDismissedMoment: () => boolean;
    getDismissedReason: () => "credential_returned" | "cancel_called" | "flow_restarted";
    getMomentType: () => "display" | "skipped" | "dismissed";
}

export interface Window {
    google?: {
        accounts: {
            id: {
                initialize: (input: IdConfiguration) => void;
                prompt: (momentListener: (res: PromptMomentNotification) => void) => void;
                renderButton: (
                    parent: HTMLElement,
                    options: GsiButtonConfiguration,
                    clickHandler: Function
                ) => void;
                disableAutoSelect: Function;
                storeCredential: () => {
                    credentials: { id: string; password: string };
                    callback: Function;
                };
                cancel: () => void;
                onGoogleLibraryLoad: Function;
                revoke: () => {
                    hint: string;
                    callback: () => { successful: boolean; error: string };
                };
            };
        };
    };
}

