declare module "lib_main.ts" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export const VueGoogleSignInButton: typeof component;
    export function useRenderGoogleSignInBtn(): void;
}

