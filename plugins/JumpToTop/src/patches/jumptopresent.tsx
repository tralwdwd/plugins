import { logger } from "@vendetta";
import { findByName, findByProps, findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";
import JumpToTopButton from "../components/JumpToTopButton";
import { storage } from "../storage";

const JumpToPresentModule = findByName("JumpToPresentButton", false);
const Design = findByProps("Stack", "Button", "Text");
const { Stack } = Design;

const ChannelStore = findByStoreName("ChannelStore");

const SYM_PATCHED = Symbol("Patched by JumpToTop");

export function patchJumpToPresent() {
    return after(
        "default",
        JumpToPresentModule,
        ([{ channelId }], original) => {
            if (!storage.jumpToPresent) return;
            if (original == null || original[SYM_PATCHED]) return;

            const children = original.props?.children;
            original[SYM_PATCHED] = true;

            const { type: channelType, guild_id: guildId } =
                ChannelStore.getChannel(channelId);

            original.props.children = (
                <Stack>
                    <JumpToTopButton
                        isNotCurrentChannel={channelType === 2}
                        details={{ channelId, guildId }}
                    />
                    {children}
                </Stack>
            );
        },
    );
}
