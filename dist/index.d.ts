import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem, type EndpointCallbackItem, type PluginSettingsInputJsonDataDescriptionItem } from '@moonjot/moon';
interface AiPromptsSettingsDescription extends PluginSettingsDescription {
    items: {
        type: 'json';
        required: boolean;
        label: string;
        description: string;
        default?: Array<Record<string, string>>;
        dataDescription: PluginSettingsInputJsonDataDescriptionItem[];
    };
    shortcut: {
        type: 'shortcut';
        required: boolean;
        label: string;
        description: string;
        default: string;
    };
}
interface AiPromptsSettings extends MoonPluginSettings {
    shortcut: string;
    items: Array<Record<string, string>>;
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
