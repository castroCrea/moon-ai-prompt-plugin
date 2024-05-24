/* eslint-disable no-template-curly-in-string */
import { type Callback } from './types'

export const AI_APIS: Record<'ollama' | 'gemini', { callback: Callback }> = {
  ollama: {
    callback: (
      { item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions } }) => {
      deleteMentionPlaceholder()

      const markdown = editor.storage.markdown.getMarkdown()

      const searchObj = {
        content: markdown,
        ...context
      }

      const handlePropertiesContent = handleReplacingProperties({ content: item.prompt, searchObj }) ?? ''

      const prompt = handleConditions({ content: handlePropertiesContent, searchObj })?.trim() ?? ''

      const body = JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })

      setContext({ ...context, loader: true })

      // @ts-expect-error this will be stringified and await and typing is prohibited
      const handleResponse = (r) => r.json()

      fetch('http://localhost:11434/api/generate', {
        headers: {
          'content-type': 'application/json'
        },
        body,
        method: 'POST'
      }).then(handleResponse).then(({ response }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        // @ts-expect-error output is a string but here type doesn't work
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        editor.commands.insertContent(item.output?.replaceAll('${response}', response) ?? response)
        setContext({ ...context, loader: false })
      }).catch(({ error }) => {
        setContext({ ...context, error: JSON.stringify(error), loader: false })
      })
    }
  },
  gemini: {
    callback: (
      { item, context, setContext, editor, deleteMentionPlaceholder }) => {
      deleteMentionPlaceholder()

      const markdown = editor.storage.markdown.getMarkdown()

      // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
      const prompt = `${item.instruction ? `${item.instruction}` : ''}\n${markdown}`

      const body = JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })

      setContext({ ...context, loader: true })

      // @ts-expect-error this will be stringified and await and typing is prohibited
      const handleResponse = (r) => r.json()

      fetch('http://localhost:11434/api/generate', {
        headers: {
          'content-type': 'application/json'
        },
        body,
        method: 'POST'
      }).then(handleResponse).then(({ response }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        // @ts-expect-error output is a string but here type doesn't work
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        editor.commands.insertContent(item.output?.replaceAll('${response}', response) ?? response)
        setContext({ ...context, loader: false })
      }).catch(({ error }) => {
        setContext({ ...context, error: JSON.stringify(error), loader: false })
      })
    }
  }
}
