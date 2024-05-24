"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_APIS = void 0;
exports.AI_APIS = {
    ollama: {
        callback: ({ item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions, turnDate } }) => {
            var _a, _b, _c, _d;
            deleteMentionPlaceholder();
            const markdown = editor.storage.markdown.getMarkdown();
            const searchObj = Object.assign({ content: markdown }, context);
            const handleDateContent = (_a = turnDate({ content: item.prompt })) !== null && _a !== void 0 ? _a : '';
            const handlePropertiesContent = (_b = handleReplacingProperties({ content: handleDateContent, searchObj })) !== null && _b !== void 0 ? _b : '';
            const prompt = (_d = (_c = handleConditions({ content: handlePropertiesContent, searchObj })) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
            const body = JSON.stringify({
                model: item.model,
                prompt,
                stream: false
            });
            setContext(Object.assign(Object.assign({}, context), { loader: true }));
            // @ts-expect-error this will be stringified and await and typing is prohibited
            const handleResponse = (r) => r.json();
            fetch('http://localhost:11434/api/generate', {
                headers: {
                    'content-type': 'application/json'
                },
                body,
                method: 'POST'
            }).then(handleResponse).then(({ response }) => {
                var _a, _b;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                // @ts-expect-error output is a string but here type doesn't work
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                editor.commands.insertContent((_b = (_a = item.output) === null || _a === void 0 ? void 0 : _a.replaceAll('${response}', response)) !== null && _b !== void 0 ? _b : response);
                setContext(Object.assign(Object.assign({}, context), { loader: false }));
            }).catch(({ error }) => {
                setContext(Object.assign(Object.assign({}, context), { error: JSON.stringify(error), loader: false }));
            });
        }
    },
    gemini: {
        callback: ({ item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions, turnDate } }) => {
            var _a, _b, _c, _d;
            deleteMentionPlaceholder();
            console.log({ item });
            if (!item.token) {
                setContext(Object.assign(Object.assign({}, context), { error: 'No token provided', loader: false }));
                return;
            }
            const markdown = editor.storage.markdown.getMarkdown();
            const searchObj = Object.assign({ content: markdown }, context);
            const handleDateContent = (_a = turnDate({ content: item.prompt })) !== null && _a !== void 0 ? _a : '';
            const handlePropertiesContent = (_b = handleReplacingProperties({ content: handleDateContent, searchObj })) !== null && _b !== void 0 ? _b : '';
            const prompt = (_d = (_c = handleConditions({ content: handlePropertiesContent, searchObj })) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
            const body = JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                            // { "inlineData": {
                            //     "mimeType": "image/png",
                            //     "data": "'$(base64 -w0 cookie.png)'"
                            //   }
                            // }
                        ]
                    }
                ]
            });
            setContext(Object.assign(Object.assign({}, context), { loader: true }));
            // @ts-expect-error this will be stringified and await and typing is prohibited
            const handleResponse = (r) => r.json();
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            fetch(`https://generativelanguage.googleapis.com/v1/models/${item.model}:generateContent?key=${item.token}`, {
                headers: {
                    'content-type': 'application/json'
                },
                body,
                method: 'POST'
            }).then(handleResponse).then(({ candidates }) => {
                var _a, _b, _c;
                const response = (_a = candidates[0].content.parts.pop()) === null || _a === void 0 ? void 0 : _a.text;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                // @ts-expect-error output is a string but here type doesn't work
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                editor.commands.insertContent((_c = (_b = item.output) === null || _b === void 0 ? void 0 : _b.replaceAll('${response}', response)) !== null && _c !== void 0 ? _c : response);
                setContext(Object.assign(Object.assign({}, context), { loader: false }));
            }).catch(({ error }) => {
                setContext(Object.assign(Object.assign({}, context), { error: JSON.stringify(error), loader: false }));
            });
        }
    }
};
//# sourceMappingURL=aiApis.js.map