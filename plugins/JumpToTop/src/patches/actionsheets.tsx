import { findByName, findByProps } from "@vendetta/metro";
import { ReactNative as RN } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { findInReactTree } from "@vendetta/utils";
import { jumpToTopOfDifferentChannel, jumpToTopOfForum } from "../utils";
import { storage } from "../storage";

const { ActionSheetRow } = findByProps("ActionSheetRow");

const ForumPostLongPressActionSheet = findByName(
    "ForumPostLongPressActionSheet",
    false,
);

const ChannelLongPressActionSheet = findByName(
    "ChannelLongPressActionSheet",
    false,
);

function findActionGroups(tree: any) {
    return findInReactTree(
        tree,
        (node) => node?.[0]?.type?.name === "ActionSheetRowGroup",
    );
}

function buildJumpToTopRow(onPress: () => void) {
    return (
        <ActionSheetRow.Group>
            <ActionSheetRow
                label="Jump To Top"
                icon={
                    <RN.View style={{ transform: [{ scaleY: -1 }] }}>
                        <ActionSheetRow.Icon
                            source={getAssetIDByName("ArrowLargeDownIcon")}
                        />
                    </RN.View>
                }
                onPress={onPress}
            />
        </ActionSheetRow.Group>
    );
}

// https://docs.discord.food/resources/channel#channel-type
const allowedChannelTypes = [0, 1, 2, 3, 5, 6, 10, 11, 12];

export function patchActionSheets() {
    const patches: (() => void)[] = [];

    patches.push(
        after("default", ForumPostLongPressActionSheet, ([{ thread }], ret) => {
            if (!storage.actionSheets) return;

            const actions = findActionGroups(ret);
            if (!actions) return;

            actions.unshift(
                buildJumpToTopRow(() =>
                    jumpToTopOfForum(thread.guild_id, thread.id),
                ),
            );
        }),
    );

    patches.push(
        after("default", ChannelLongPressActionSheet, (_, ret) => {
            if (!storage.actionSheets) return;

            const channel = ret?.props?.channel;
            if (!channel) return;

            if (!(channel.type in allowedChannelTypes)) return;

            after("type", ret, (_, component) => {
                const actions = findActionGroups(component);
                if (!actions) return;

                actions.unshift(
                    buildJumpToTopRow(() =>
                        jumpToTopOfDifferentChannel(
                            channel.guild_id ?? "@me",
                            channel.id,
                        ),
                    ),
                );
            });
        }),
    );

    return () => {
        for (const unpatch of patches) unpatch();
    };
}
