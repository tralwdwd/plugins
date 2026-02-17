import { patchJumpToPresent } from "./patches/jumptopresent";

const patches: (() => void)[] = [];

export default {
    onLoad() {
        patches.push(patchJumpToPresent());
    },

    onUnload() {
        for (const unpatch of patches) {
            unpatch();
        }
    },
};
