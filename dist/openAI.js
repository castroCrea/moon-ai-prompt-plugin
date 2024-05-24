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
exports.sendPromptToAI = void 0;
const sendPromptToAI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = getFromStore({ key: 'settings.ai.token' });
        const model = (_a = getFromStore({
            key: 'settings.ai.model'
        })) !== null && _a !== void 0 ? _a : 'gpt-4-vision-preview';
        const instruction = getFromStore({
            key: 'settings.ai.instruction'
        });
        if (!token)
            throw new Error('No token provided');
        const openai = new OpenAI({
            apiKey: token
        });
        const result = yield openai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'user',
                    content: `${instruction ? `${instruction}` : ''}${prompt}`
                }
            ],
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        if (!result.choices[0].message.content) {
            throw new Error('No content provided');
        }
        return { content: result.choices[0].message.content };
    }
    catch (err) {
        return { error: err.message };
    }
});
exports.sendPromptToAI = sendPromptToAI;
//# sourceMappingURL=openAI.js.map