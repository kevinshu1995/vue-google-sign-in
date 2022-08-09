<template>
    <div class="inline-block">
        <div ref="btnRef" class="inline-block" />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from "vue-demi";
import { setupGoogleBtn, CallbackResponse } from "../utils/gsi_client";

interface emitSuccessResponse {
    response: CallbackResponse;
    profile: unknown;
}

const props = defineProps({
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
});

const emit = defineEmits<{
    (e: "success", response: emitSuccessResponse): void;
}>();

const btnRef = ref<HTMLInputElement | null>(null);

// const checkMigrateByCookie = () =>{
//   // doc: https://developers.google.com/identity/gsi/web/guides/migration#identifying_affected_code_and_testing
//   Cookies.set('G_AUTH2_MIGRATION', 'informational:showauth2use')
// }

onMounted(() => {
    if (btnRef === null) {
        console.error("Btn ref is null");
        return;
    }
    setupGoogleBtn({
        button: {
            ref: btnRef,
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
            emit("success", { response, profile: response.credential });
        },
        clientId: props.clientId,
    });
});
</script>

<style scoped>
.inline-block {
    display: inline-block;
}
</style>

