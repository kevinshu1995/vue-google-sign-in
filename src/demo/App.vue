<script setup lang="ts">
import { VueGoogleSignInButton } from "../lib/lib_main";
import type { ButtonThemeConfig } from "../lib/composables/useRenderGoogleSignInBtn";

const clientId: string = import.meta.env.VITE_GOOGLE_SIGN_IN_ID;
const btnConfigs: ButtonThemeConfig = {
    type: "standard",
    theme: "filled_black",
    size: "large",
    text: "signin_with",
    shape: "pill",
    logo_alignment: "left",
    width: "300",
    locale: "en",
};
</script>

<template>
    <VueGoogleSignInButton :client-id="clientId" :button-configs="btnConfigs" />
</template>

