import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem } from '@moonjot/moon';
interface AiPromptsSettingsDescription extends PluginSettingsDescription {
    items: {
        type: 'text';
        required: boolean;
        label: string;
        description: string;
        default: string;
    };
}
interface AiPromptsSettings extends MoonPluginSettings {
}
export default class extends MoonPlugin {
    name: string;
    logo: string;
    settingsDescription: AiPromptsSettingsDescription;
    settings: AiPromptsSettings;
    private readonly log;
    constructor(props?: MoonPluginConstructorProps<AiPromptsSettings>);
    mention: () => PluginMentionItem[];
}
export {};
