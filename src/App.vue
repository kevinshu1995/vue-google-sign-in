<script setup lang="ts">
import GoogleButton from "./lib/googleSignInButton";
// import { VueGoogleSignInButton } from "vue-google-sign-in";

const clientId: string = import.meta.env.VITE_GOOGLE_SIGN_IN_ID;
</script>

<template>
    <GoogleButton :client-id="clientId" />
    <!-- <VueGoogleSignInButton :client-id="clientId" /> -->
</template>
