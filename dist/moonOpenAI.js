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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeywordFromOpenAi = void 0;
const moon_1 = require("@moonjot/moon");
const https_1 = __importDefault(require("https"));
const getKeywordFromOpenAi = ({ text, token, model }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    process.env.HELPERS.moonLog(JSON.stringify({ token }));
    if (!token)
        return false;
    const data = JSON.stringify({
        model: model !== null && model !== void 0 ? model : 'gpt-4',
        messages: [
            {
                role: 'system',
                content: "Create me a JSON object, this object as props, 'subject' is the subject of the following content in an array with maximum 3 subjects, 'people' is the people that are cited in the following content in an array with maximum 5 people, the 'organizations' that is the name of company or app in the following content in an array with maximum 5 organizations, and 'places' that are the places cited in the following content in the array with maximum 5 places. Do not format the response."
            },
            {
                role: 'user',
                content: text
            }
        ],
        temperature: 1,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    const result = yield new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                const jsonResponse = JSON.parse(responseData);
                resolve(jsonResponse);
            });
        });
        req.on('error', (error) => {
            reject(new Error(error.message));
        });
        req.write(data);
        req.end();
    });
    try {
        process.env.HELPERS.moonLog(JSON.stringify({ result }));
    }
    catch (_b) { }
    const content = (_a = result.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.replace('```json', '').replace('```', '');
    return Object.assign(Object.assign({}, moon_1.DEFAULT_TOPICS), JSON.parse(content !== null && content !== void 0 ? content : '{}'));
});
exports.getKeywordFromOpenAi = getKeywordFromOpenAi;
//# sourceMappingURL=moonOpenAI.js.map