import { defineComponent, ref, install, onMounted } from "vue-demi";
import type { PropType } from "vue-demi";
import {
    useRenderGoogleSignInBtn,
    CallbackResponse,
    ButtonThemeConfig,
} from "./useRenderGoogleSignInBtn";
import jwtDecode from "jwt-decode";

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
            useRenderGoogleSignInBtn({
                button: {
                    ref: buttonRef,
                    themeConfig: props.buttonConfigs,
                },
                callback: (response: CallbackResponse) => {
                    console.log(response, jwtDecode(response.credential));
                    emit("success", { response, profile: jwtDecode(response.credential) });
                },
                clientId: props.clientId,
            });
        });

        return {
            buttonRef,
        };
    },

    render() {
        return (
            <div class="inline-block">
                <div class="inline-block" ref="buttonRef" />
            </div>
        );
    },
});

