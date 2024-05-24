import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem, type EndpointCallbackItem } from '@moonjot/moon';
interface AiPromptsSettingsDescription extends PluginSettingsDescription {
    items: {
        type: 'text';
        required: boolean;
        label: string;
        description: string;
        default: string;
    };
    shortcut: {
        type: 'shortcut';
        required: boolean;
        label: string;
        description: string;
    };
}
interface AiPromptsSettings extends MoonPluginSettings {
    items: string;
}
export default class extends MoonPlugin {
    name: string;
    logo: string;
    settingsDescription: AiPromptsSettingsDescription;
    settings: AiPromptsSettings;
    private readonly log;
    constructor(props?: MoonPluginConstructorProps<AiPromptsSettings>);
    endpointCallbacks: EndpointCallbackItem[];
    mention: () => PluginMentionItem[];
}
export {};
