import { logger } from "@vendetta";
import { findByName, findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";
import JumpToTopButton from "../components/JumpToTopButton";
import { storage } from "../storage";

const JumpToPresentModule = findByName("JumpToPresentButton", false);
const Design = findByProps("Stack", "Button", "Text");
const { Stack } = Design;

const SYM_PATCHED = Symbol("Patched by JumpToTop");

export function patchJumpToPresent() {
    return after("default", JumpToPresentModule, (_, original) => {
        if (!storage.jumpToPresent) return;
        if (original == null || original[SYM_PATCHED]) return;

        const children = original.props?.children;
        original[SYM_PATCHED] = true;

        original.props.children = (
            <Stack>
                <JumpToTopButton />
                {children}
            </Stack>
        );
    });
}
