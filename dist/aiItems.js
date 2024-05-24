"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIs = void 0;
exports.AIs = [
    {
        title: 'Ollama - Llama3',
        type: 'ollama',
        model: 'llama3',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n'
    },
    {
        title: 'Ollama - Mistral',
        type: 'ollama',
        model: 'mistral',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n'
    },
    {
        title: 'Gemini - Google',
        type: 'gemini',
        model: 'gemini-pro',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n'
    }
];
//# sourceMappingURL=aiItems.js.map