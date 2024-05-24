/* eslint-disable no-template-curly-in-string */
import { type Callback } from './types'

export const AI_APIS: Record<'ollama' | 'gemini', { callback: Callback }> = {
  ollama: {
    callback: (
      { item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions, turnDate } }) => {
      deleteMentionPlaceholder()

      const markdown = editor.storage.markdown.getMarkdown()

      const searchObj = {
        content: markdown,
        ...context
      }

      const handleDateContent = turnDate({ content: item.prompt }) ?? ''

      const handlePropertiesContent = handleReplacingProperties({ content: handleDateContent, searchObj }) ?? ''

      const prompt = handleConditions({ content: handlePropertiesContent, searchObj })?.trim() ?? ''

      const body = JSON.stringify({
        model: item.model,
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
      { item, context, setContext, editor, deleteMentionPlaceholder, utils: { handleReplacingProperties, handleConditions, turnDate } }) => {
      deleteMentionPlaceholder()

      console.log({ item })

      if (!item.token) {
        setContext({ ...context, error: 'No token provided', loader: false })
        return
      }

      const markdown = editor.storage.markdown.getMarkdown()

      const searchObj = {
        content: markdown,
        ...context
      }

      const handleDateContent = turnDate({ content: item.prompt }) ?? ''

      const handlePropertiesContent = handleReplacingProperties({ content: handleDateContent, searchObj }) ?? ''

      const prompt = handleConditions({ content: handlePropertiesContent, searchObj })?.trim() ?? ''

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
      })

      setContext({ ...context, loader: true })

      // @ts-expect-error this will be stringified and await and typing is prohibited
      const handleResponse = (r) => r.json()

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fetch(`https://generativelanguage.googleapis.com/v1/models/${item.model}:generateContent?key=${item.token}`, {
        headers: {
          'content-type': 'application/json'
        },
        body,
        method: 'POST'
      }).then(handleResponse).then(({ candidates }) => {
        const response = candidates[0].content.parts.pop()?.text
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
