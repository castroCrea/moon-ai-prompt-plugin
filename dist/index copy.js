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
const aiApis_1 = require("aiApis");
const AIs = [{
        title: 'Ollama - Llama3',
        type: 'ollama',
        instruction: '',
        output: '---\nAI:\n${response}\n\n---\n'
    },
    {
        title: 'Ollama - Mistral',
        type: 'ollama',
        instruction: '',
        output: '---\nAI:\n${response}\n\n---\n'
    }];
class default_1 extends moon_1.MoonPlugin {
    constructor(props) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(props);
        this.name = 'Ai Prompts';
        this.logo = '<svg width="16" height="16" viewBox="0 0 16 16" role="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 21l15 -15l-3 -3l-15 15l3 3"></path><path d="M15 6l3 3"></path><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path></svg></svg>';
        this.settingsDescription = {
            items: {
                type: 'text',
                required: true,
                label: 'Configure your AIs',
                description: 'Use ${response} in output, to place the response at this spot. Check out the doc here [](). ',
                default: JSON.stringify(AIs, null, 2)
            }
        };
        this.settings = {
            items: JSON.stringify(AIs, null, 2)
        };
        this.mention = () => {
            const mentions = [];
            mentions.push({
                name: 'ai_prompts',
                char: ':ai:',
                htmlClass: 'mention_collections',
                allowSpaces: true,
                getListItem: () => __awaiter(this, void 0, void 0, function* () {
                    return AIs.map(ai => (Object.assign(Object.assign({}, ai), { pluginName: 'ai_prompts', callback: aiApis_1.AI_APIS[ai.type].callback.toString() })));
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
        if (props.settings)
            this.settings = Object.assign(Object.assign({}, props.settings), { items: JSON.stringify(Object.assign(Object.assign({}, AIs), JSON.parse(props.settings.item)), null, 2) });
        this.log = props.helpers.moonLog;
    }
}
exports.default = default_1;
//# sourceMappingURL=index%20copy.js.map