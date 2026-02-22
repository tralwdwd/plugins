import { logger } from "@vendetta";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ReactNative as RN } from "@vendetta/metro/common";
import {
    jumpToTopOfCurrentChannel,
    jumpToTopOfDifferentChannel,
} from "../utils";

const Design = findByProps("Stack", "Button", "Text");
const { IconButton } = Design;

export default function JumpToTopButton({
    isNotCurrentChannel = false,
    details = {},
}: {
    isNotCurrentChannel: boolean;
    details: { guildId?: string; channelId?: string };
}) {
    return (
        // Theres no arrow up icon so we flip the arrow down one.
        <RN.View
            style={{
                transform: [{ scaleY: -1 }],
            }}
        >
            <IconButton
                onPress={
                    isNotCurrentChannel
                        ? () =>
                              jumpToTopOfDifferentChannel(
                                  details.guildId,
                                  details.channelId,
                              )
                        : jumpToTopOfCurrentChannel
                }
                variant={"secondary"}
                icon={getAssetIDByName("ArrowLargeDownIcon")}
            />
        </RN.View>
    );
}
