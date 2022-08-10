# vue-google-sign-in

Vue component for [Sign in With Google][sign in with google]. Just import the component and pass your client id as a component prop, and vue-google-sign-in would do all the stuff for you!

Now it's Support

-   [x] popup UX mode
-   [ ] One Tap UX mode
-   [ ] Render official button (You could do a bit customization)

## Install

TODO

## Demo

TODO

## Usage

TODO

<!-- prettier-ignore-start -->
```html
<script setup lang="ts">
    import GoogleButton from "./../lib/googleSignInButton";

    const clientId: string = `XXXXXXXXXXXX.apps.googleusercontent.com`; // Your google client id
</script>

<template>
    <div>
        <GoogleButton
            :client-id="clientId"
            :button-configs="{
                type: "standard",
                theme: "filled_black",
                size: "large",
                text: "signin_with",
                shape: "pill",
                logo_alignment: "left",
                width: "300",
                locale: "en",
            }"
        />
    </div>
</template>
```
<!-- prettier-ignore-end -->

##

## Reference

-   [Sign in With Google][sign in with google]
-   [google/google-api-javascript-client](https://github.com/google/google-api-javascript-client)

[sign in with google]: https://developers.google.com/identity/gsi/web/
