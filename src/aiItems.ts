/* eslint-disable no-template-curly-in-string */
import { type AI_APIS } from './aiApis'

export const AIs: Array<{ title: string, prompt?: string, output?: string, type: keyof typeof AI_APIS }> = [{
  title: 'Ollama - Llama3',
  type: 'ollama',
  prompt: '{{content}}',
  output: '---\nAI:\n${response}\n\n---\n'
},
{
  title: 'Ollama - Mistral',
  type: 'ollama',
  prompt: '{{content}}',
  output: '---\nAI:\n${response}\n\n---\n'
}]
