import { logger } from "@vendetta";
import { findByName, findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";
import JumpToTopButton from "../components/JumpToTopButton";

const JumpToPresentModule = findByName("JumpToPresentButton", false);
const Design = findByProps("Stack", "Button", "Text");
const { Stack } = Design;

export function patchJumpToPresent() {
    return after("default", JumpToPresentModule, (_, original) => {
        if (original == null) return original;

        const children = original.props?.children;

        original.props.children = (
            <Stack>
                <JumpToTopButton />
                {children}
            </Stack>
        );
    });
}
