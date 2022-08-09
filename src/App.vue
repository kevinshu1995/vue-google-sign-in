<script setup lang="ts">
import GoogleButton from "./core/googleSignInButton";

const clientId: string = import.meta.env.VITE_GOOGLE_SIGN_IN_ID;
</script>

<template>
    <GoogleButton :client-id="clientId" />
</template>
