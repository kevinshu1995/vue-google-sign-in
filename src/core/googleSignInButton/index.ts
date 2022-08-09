import { defineComponent, h, ref, install, onMounted } from "vue-demi";
import { setupGoogleBtn, CallbackResponse } from "./gsi_client";

interface emitSuccessResponse {
    response: CallbackResponse;
    profile: unknown;
}

install();

export default defineComponent({
    name: "GoogleSignInButton",

    props: {
        type: {
            type: String,
            default: "standard",
            validator(value: string) {
                return ["standard", "icon"].includes(value);
            },
        },
        theme: {
            type: String,
            default: "outline",
            validator(value: string) {
                return ["outline", "filled_blue", "filled_black"].includes(value);
            },
        },
        size: {
            type: String,
            default: "large",
            validator(value: string) {
                return ["large", "medium", "small"].includes(value);
            },
        },
        text: {
            type: String,
            default: "signin",
            validator(value: string) {
                return ["signin_with", "signup_with", "continue_with", "signin"].includes(value);
            },
        },
        shape: {
            type: String,
            default: "rectangular",
            validator(value: string) {
                return ["rectangular", "pill", "circle", "square"].includes(value);
            },
        },
        logo_alignment: {
            type: String,
            default: "left",
            validator(value: string) {
                return ["center", "left"].includes(value);
            },
        },
        width: {
            type: String,
            default: "200",
            validator(value: string) {
                return Number(value) <= 400;
            },
        },
        locale: {
            type: String,
            default: "",
        },
        clientId: {
            type: String,
            required: true,
        },
    },

    emits: ["success"],

    setup(props, { emit }) {
        const buttonRef = ref<HTMLInputElement | null>(null);

        onMounted(() => {
            if (buttonRef === null) {
                console.error("Btn ref is null");
                return;
            }
            setupGoogleBtn({
                button: {
                    ref: buttonRef,
                    themeConfig: {
                        type: props.type,
                        theme: props.theme,
                        size: props.size,
                        text: props.text,
                        shape: props.shape,
                        logo_alignment: props.logo_alignment,
                        width: props.width,
                        locale: props.locale,
                    },
                },
                callback: (response: CallbackResponse) => {
                    console.log(response);
                    emit("success", { response, profile: response.credential });
                },
                clientId: props.clientId,
            });
        });

        return {
            buttonRef,
        };
    },

    render() {
        return h("div", { class: "inline-block" }, [
            h("div", { class: "inline-block", ref: "buttonRef" }),
        ]);
    },
});

