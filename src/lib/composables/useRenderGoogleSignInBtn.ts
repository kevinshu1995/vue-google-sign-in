import { unref } from "vue-demi";
import type { GsiBtnConfig } from "../types";
import { RenderGsiBtn } from "../utils/renderGsiBtn";

export const useRenderGoogleSignInBtn = (configs: GsiBtnConfig): void => {
    configs.button.HTMLElement = unref(configs.button.HTMLElement);
    RenderGsiBtn(configs);
};
