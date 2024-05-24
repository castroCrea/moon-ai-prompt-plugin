/* eslint-disable no-template-curly-in-string */
import { type AI_APIS } from './aiApis'

export const AIs: Array<{ title: string, model: string, prompt?: string, output?: string, type: keyof typeof AI_APIS, token?: string }> = [
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
]
