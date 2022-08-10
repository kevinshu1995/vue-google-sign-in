<script setup lang="ts">
import GoogleButton from "./../lib/googleSignInButton";
import type { ButtonThemeConfig } from "./../lib/googleSignInButton/useRenderGoogleSignInBtn";

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
    <GoogleButton :client-id="clientId" :button-configs="btnConfigs" />
</template>
