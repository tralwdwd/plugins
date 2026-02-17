import { logger } from "@vendetta";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { ReactNative as RN } from "@vendetta/metro/common";

const Design = findByProps("Stack", "Button", "Text");
const { IconButton } = Design;

const SelectedChannelStore = findByStoreName("SelectedChannelStore");
const ChannelStore = findByStoreName("ChannelStore");
const messageUtil = findByProps("jumpToMessage");

export default function JumpToTopButton() {
    const currentChannelId = SelectedChannelStore.getChannelId();
    const channelDetails = ChannelStore.getChannel(currentChannelId);

    return (
        // Theres no arrow up icon so we flip the arrow down one.
        <RN.View
            style={{
                transform: [{ scaleY: -1 }],
            }}
        >
            <IconButton
                onPress={() => {
                    logger.log(channelDetails);
                    messageUtil.jumpToMessage({
                        channelId: channelDetails.id,
                        messageId: channelDetails.id,
                        flash: true,
                        jumpType: "ANIMATED",
                    });
                }}
                variant={"secondary"}
                icon={getAssetIDByName("ArrowLargeDownIcon")}
            />
        </RN.View>
    );
}
