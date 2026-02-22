import { findByProps, findByStoreName } from "@vendetta/metro";

const SelectedChannelStore = findByStoreName("SelectedChannelStore");
const ChannelStore = findByStoreName("ChannelStore");
const messageUtil = findByProps("jumpToMessage");

const { openUrl } = findByProps("openUrl");

export function jumpToTopOfCurrentChannel() {
    const currentChannelId = SelectedChannelStore.getChannelId();
    const channelDetails = ChannelStore.getChannel(currentChannelId);

    messageUtil.jumpToMessage({
        channelId: channelDetails.id,
        messageId: channelDetails.id,
        flash: true,
        jumpType: "ANIMATED",
    });
}

export function jumpToTopOfDifferentChannel(
    guildId: string,
    channelId: string,
) {
    openUrl(
        `https://discord.com/channels/${guildId}/${channelId}/${channelId}`,
    );
}

export function jumpToTopOfForum(guildId: string, threadId: string) {
    openUrl(`https://discord.com/channels/${guildId}/${threadId}/${threadId}`);
}
