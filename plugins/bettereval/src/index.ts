import { plugin } from "@vendetta";
import { registerSettingsTile } from "./settings";
import { EvalPage } from "./EvalPage";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { manifest } from "@vendetta/plugin";

const patches: (() => void)[] = [];

export default {
    onLoad() {
        patches.push(
            registerSettingsTile({
                key: plugin.manifest.name,
                icon: getAssetIDByName(manifest.vendetta?.icon ?? ""),
                title: () => "Evaluate JavaScript",
                page: EvalPage,
            })
        );
    },

    onUnload() {
        for (const unpatch of patches) {
            unpatch();
        }
    },
}