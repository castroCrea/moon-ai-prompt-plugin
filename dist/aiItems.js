"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIs = void 0;
exports.AIs = [
    {
        title: 'Ollama - Llama3',
        type: 'ollama',
        model: 'llama3',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'Ollama - Mistral',
        type: 'ollama',
        model: 'mistral',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'Gemini - Google',
        type: 'gemini',
        model: 'gemini-pro',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'ChatGPT - 3.5 Turbo',
        type: 'openai',
        model: 'gpt-3.5-turbo',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'ChatGPT - 4',
        type: 'openai',
        model: 'gpt-4',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'ChatGPT - 4o',
        type: 'openai',
        model: 'gpt-4o',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    },
    {
        title: 'Mistral - Large',
        type: 'mistral',
        model: 'mistral-large-latest',
        token: '',
        prompt: '{{content}}',
        output: '---\nAI:\n${response}\n\n---\n<br/>'
    }
];
//# sourceMappingURL=aiItems.js.map