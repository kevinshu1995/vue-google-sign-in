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
        triggerPrompt: {
            type: Boolean,
            default: false,
        },
        debug: {
            type: Boolean,
            default: false,
        },

        promptParentId: String,
        autoSelect: Boolean,
        loginUri: URL,
        nativeCallback: Function,
        cancelOnTapOutside: Function,
        nonce: String,
        context: String,
        stateCookie_domain: String,
        uxMode: String,
        allowedParentOrigin: [String, Array],
        intermediateIframeCloseCallback: Function,
        itpSupport: Boolean,
    },

    emits: ["success"],

    setup(props, { emit }) {
        const buttonRef = ref<HTMLElement | null>(null);

        onMounted(() => {
            if (buttonRef.value !== null) {
                const { buttonConfigs, clientId, ...otherConfigs } = props;

                const filterOtherConfigs = Object.entries(otherConfigs)
                    .filter(([key, value]) => value !== undefined)
                    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

                useRenderGoogleSignInBtn({
                    button: {
                        HTMLElement: unref(buttonRef),
                        themeConfig: buttonConfigs,
                    },
                    callback: (response: CallbackDecode) => {
                        emit("success", response);
                    },
                    clientId,
                    // filter undefined props
                    ...filterOtherConfigs,
                });
            }
        });

        return { buttonRef };
    },
    render() {
        // TODO support passing attrs & slots
        return h("div", { class: "inline-block", ref: "buttonRef" });
    },
});
