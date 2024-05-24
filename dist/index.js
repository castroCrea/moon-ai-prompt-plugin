"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const moon_1 = require("@moonjot/moon");
const aiApis_1 = require("./aiApis");
const aiItems_1 = require("./aiItems");
const uniqBy = ({ array, key }) => {
    const seen = new Set();
    return array.filter((item) => {
        const keyValue = item[key];
        if (seen.has(keyValue)) {
            return false;
        }
        else {
            seen.add(keyValue);
            return true;
        }
    });
};
class default_1 extends moon_1.MoonPlugin {
    constructor(props) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(props);
        this.name = 'Ai Prompts';
        this.logo = '<svg role="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 21l15 -15l-3 -3l-15 15l3 3"></path><path d="M15 6l3 3"></path><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path></svg></svg>';
        this.settingsDescription = {
            items: {
                type: 'text',
                required: true,
                label: 'Configure your AIs',
                description: 'To integrate the response into your output, simply use ${response} at the desired location. For additional information, please refer to the [documentation here](https://github.com/castroCrea/moon-ai-prompt-plugin/blob/0ec7935b190a477c57fa15b4158b7ce11d529183/README.md).',
                default: JSON.stringify(aiItems_1.AIs, null, 2)
            }
        };
        this.settings = {
            items: JSON.stringify(aiItems_1.AIs, null, 2)
        };
        this.endpointCallbacks = [{
                endpoint: 'moon-ai-prompt-plugin/update',
                callback: ({ saveSettings }) => {
                    saveSettings({ key: 'items', value: JSON.stringify(uniqBy({ array: [...JSON.parse(this.settings.items ? this.settings.items : '[]'), ...aiItems_1.AIs], key: 'title' }), null, 2) });
                }
            }];
        // shortcuts: AIs.map(ai => ({...ai, callback: AI_APIS[ai.type].callback.toString() }))
        this.mention = () => {
            const mentions = [];
            mentions.push({
                name: 'ai_prompts',
                char: ':ai:',
                htmlClass: 'mention_collections',
                allowSpaces: true,
                getListItem: () => __awaiter(this, void 0, void 0, function* () {
                    return JSON.parse(this.settings.items ? this.settings.items : '[]').map(ai => (Object.assign(Object.assign({}, ai), { pluginName: 'ai_prompts', callback: aiApis_1.AI_APIS[ai.type].callback.toString() }))).filter(ai => ai.token !== '');
                }),
                onSelectItem: (props) => {
                    // @ts-expect-error this is to be handle easier
                    // eslint-disable-next-line no-eval, @typescript-eslint/no-unsafe-argument
                    const callback = eval(props.item.callback);
                    callback(props);
                }
            });
            return mentions;
        };
        if (!props)
            return;
        if (props.settings) {
            this.settings = Object.assign(Object.assign({}, props.settings), { items: JSON.stringify(uniqBy({ array: [...JSON.parse(props.settings.items ? props.settings.items : '[]'), ...aiItems_1.AIs], key: 'title' }), null, 2) });
        }
        this.log = props.helpers.moonLog;
        this.settingsButtons = [
            {
                type: 'button',
                callback: () => {
                    window.open('moonjot://moon-ai-prompt-plugin/update', '_blank');
                },
                label: 'Update AI configuration',
                description: 'If you want to reset everything, delete the configuration and click the button.'
            }
        ];
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map