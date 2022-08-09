import { defineComponent, h, ref, install, onMounted } from "vue-demi";
import type { PropType } from "vue-demi";
import { setupGoogleBtn, CallbackResponse, ButtonThemeConfig } from "./gsi_client";

interface EmitSuccessPayload {
    response: CallbackResponse;
    profile: unknown;
}

install();

export default defineComponent({
    name: "GoogleSignInButton",

    props: {
        buttonConfigs: {
            type: Object as PropType<ButtonThemeConfig>,
            default: () => ({
                type: "standard",
                theme: "outline",
                size: "large",
                text: "signin",
                shape: "rectangular",
                logo_alignment: "left",
                width: "200",
                locale: "",
            }),
        },
        clientId: {
            type: String,
            required: true,
        },
    },

    emits: {
        success(payload: EmitSuccessPayload) {
            return true;
        },
    },

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
                    themeConfig: props.buttonConfigs,
                },
                callback: (response: CallbackResponse) => {
                    console.log(response);
                    // TODO deal jwt
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

