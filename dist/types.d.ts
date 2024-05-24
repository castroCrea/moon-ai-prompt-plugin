import { type MentionItem, type PluginMentionItem } from '@moonjot/moon';
export type Item = MentionItem & {
    prompt: string;
    token?: string;
    model: string;
    temperature?: number;
};
export type CallbackProps = Parameters<PluginMentionItem['onSelectItem']>[0] & {
    item: Item;
};
export type Callback = (props: CallbackProps) => ReturnType<PluginMentionItem['onSelectItem']>;
