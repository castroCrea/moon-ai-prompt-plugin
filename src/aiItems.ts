/* eslint-disable no-template-curly-in-string */
import { type AI_APIS } from './aiApis'

export const AIs: Array<{ title: string, model: string, prompt?: string, output?: string, type: keyof typeof AI_APIS, token?: string }> = [
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
]
