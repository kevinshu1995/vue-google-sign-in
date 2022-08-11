import type { PropType } from "vue-demi";
import type { CallbackDecode, ButtonThemeConfig } from "../types";
import { defineComponent, h, ref, install, onMounted, unref } from "vue-demi";
import { useRenderGoogleSignInBtn } from "../composables/useRenderGoogleSignInBtn";
import "./style.css";

install();

export default defineComponent({
    name: "VueGoogleSignInButton",

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

    emits: ["success"],

    setup(props, { emit }) {
        const buttonRef = ref<HTMLInputElement | null>(null);

        onMounted(() => {
            if (buttonRef === null) {
                console.error("Btn ref is null please check your code");
                return;
            }

            useRenderGoogleSignInBtn({
                button: {
                    HTMLElement: unref(buttonRef),
                    themeConfig: props.buttonConfigs,
                },
                callback: (response: CallbackDecode) => {
                    emit("success", response);
                },
                clientId: props.clientId,
                debug: true,
            });
        });

        return () => {
            // TODO support passing attrs & slots
            return h("div", { class: "inline-block" }, [
                h("div", { class: "inline-block", ref: buttonRef }),
            ]);
        };
    },
});
