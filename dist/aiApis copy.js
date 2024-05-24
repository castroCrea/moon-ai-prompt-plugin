"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_APIS = void 0;
exports.AI_APIS = {
    ollama: {
        callback: ({ item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions } }) => {
            var _a, _b, _c;
            deleteMentionPlaceholder();
            const markdown = editor.storage.markdown.getMarkdown();
            const searchObj = Object.assign({ content: markdown }, context);
            const handlePropertiesContent = (_a = handleReplacingProperties({ content: item.prompt, searchObj })) !== null && _a !== void 0 ? _a : '';
            const prompt = (_c = (_b = handleConditions({ content: handlePropertiesContent, searchObj })) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '';
            const body = JSON.stringify({
                model: 'llama3',
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
        callback: ({ item, context, setContext, editor, deleteMentionPlaceholder }) => {
            deleteMentionPlaceholder();
            const markdown = editor.storage.markdown.getMarkdown();
            // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
            const prompt = `${item.instruction ? `${item.instruction}` : ''}\n${markdown}`;
            const body = JSON.stringify({
                model: 'llama3',
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
    }
};
//# sourceMappingURL=aiApis%20copy.js.map