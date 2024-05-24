import { type MentionItem, type PluginMentionItem } from '@moonjot/moon';
type Item = MentionItem & {
    prompt: string;
};
type CallbackProps = Parameters<PluginMentionItem['onSelectItem']>[0] & {
    item: Item;
};
type Callback = (props: CallbackProps) => ReturnType<PluginMentionItem['onSelectItem']>;
export declare const AI_APIS: Record<'ollama' | 'gemini', {
    callback: Callback;
}>;
export {};
