# vue-google-sign-in

[![GitHub latest tag](https://img.shields.io/github/tag/kevinshu1995/vue-google-sign-in.svg)](https://github.com/kevin/vue-google-sign-in/tags/)
[![GitHub latest commit](https://badgen.net/github/last-commit/kevinshu1995/vue-google-sign-in)](https://GitHub.com/kevinshu1995/vue-google-sign-in/commit/)
[![GitHub license](https://img.shields.io/github/license/kevinshu1995/vue-google-sign-in)](https://github.com/kevinshu1995/vue-google-sign-in/blob/master/LICENSE)

A simple Vue component for [Sign in With Google][sign in with google].
Just import the component and pass your client id as a component prop, and vue-google-sign-in would do all the stuff for you!

Now it Support

-   [x] popup UX mode
-   [x] Render official button which is built by Google (You could do a bit customization)

-   [ ] One Tap UX mode
-   [ ] Render my custom button with slot

## Install

```bash
$ npm i @kevin_hws/vue-google-sign-in

$ yarn add @kevin_hws/vue-google-sign-in

$ pnpm i @kevin_hws/vue-google-sign-in
```

:warning: When using with Vue 2.6 or older, [@vue/composition-api][@vue/composition-api] is required separately.

For Vue 2.7 or later, import vue directly like Vue3.

## Props

| Prop          | Type   | default                                                                                                                                                                                               | information                                                                                                                         |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| clientId      | String | (Required) -                                                                                                                                                                                          | Google API client ID. Follow the steps [here][getclientid] to get your own client ID.                                               |
| buttonConfigs | Object | (Optional) <pre>{<br> type: "standard",<br> theme: "outline", size: "large",<br> text: "signin",<br> shape: "rectangular",<br> logo_alignment: "left",<br> width: "200",<br> locale: "", <br>} </pre> | The button is rendered by GSI API. If you need more detail, please check it out on [GsiButtonConfiguration][gsibuttonconfiguration] |

### Example

```html
<script setup lang="ts">
    import VueGoogleSignInButton from "@kevin_hws/vue-google-sign-in";
    // Or you can import like this
    // import { VueGoogleSignInButton } from "@kevin_hws/vue-google-sign-in";

    // clientId: Your google client id it would looks like: XXXXXXXXXXXX.apps.googleusercontent.com
    const clientId: string = `YOUR_GOOGLE_CLIENT_ID`;
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

## Q&A

-   How to get my Google API client ID ?
    -   Please follow the steps [here][getclientid] to setup **Credential** and **OAuth Consent Screen**

## Reference

-   [Sign in With Google][sign in with google]
-   [google/google-api-javascript-client](https://github.com/google/google-api-javascript-client)

[sign in with google]: https://developers.google.com/identity/gsi/web/
[@vue/composition-api]: https://www.npmjs.com/package/@vue/composition-api
[gsibuttonconfiguration]: https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
[getclientid]: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id
