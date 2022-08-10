# vue-google-sign-in

Vue component for [Sign in With Google][sign in with google]. Just import the component and pass your client id as a component prop, and vue-google-sign-in would do all the stuff for you!

Now it's Support

-   [x] popup UX mode
-   [ ] One Tap UX mode
-   [ ] Render official button (You could do a bit customization)

## Demo

TODO

## Install

```bash
$ npm i @kevin_hws/vue-google-sign-in

$ yarn add @kevin_hws/vue-google-sign-in

$ pnpm i @kevin_hws/vue-google-sign-in
```

```html
<script setup lang="ts">
    import VueGoogleSignInButton from "@kevin_hws/vue-google-sign-in";

    const clientId: string = `XXXXXXXXXXXX.apps.googleusercontent.com`; // Your google client id
</script>

<template>
    <div>
        <VueGoogleSignInButton
            :client-id="clientId"
            :button-configs="{
                type: 'standard',
                theme: 'filled_black',
                size: 'large',
                text: 'signin_with',
                shape: 'pill',
                logo_alignment: 'left',
                width: '300',
                locale: 'en',
            }"
        />
    </div>
</template>
```

##

## Reference

-   [Sign in With Google][sign in with google]
-   [google/google-api-javascript-client](https://github.com/google/google-api-javascript-client)

[sign in with google]: https://developers.google.com/identity/gsi/web/
