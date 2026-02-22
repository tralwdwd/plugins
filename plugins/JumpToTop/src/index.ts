import { patchActionSheets } from "./patches/actionsheets";
import { patchJumpToPresent } from "./patches/jumptopresent";
import settings from "./components/settings";
import { initStorage } from "./storage";

const patches: (() => void)[] = [];

export default {
    onLoad() {
        initStorage();

        patches.push(patchJumpToPresent());
        patches.push(patchActionSheets());
    },

    onUnload() {
        for (const unpatch of patches) {
            unpatch();
        }
    },

    settings,
};
