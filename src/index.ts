/* eslint-disable no-template-curly-in-string */
import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem } from '@moonjot/moon'

interface AiPromptsSettingsDescription extends PluginSettingsDescription {
  items: {
    type: 'text'
    required: boolean
    label: string
    description: string
    default: string
  }
}

interface AiPromptsSettings extends MoonPluginSettings {
}

const AI_APIS: Record<'ollama', { callback: PluginMentionItem['onSelectItem'] }> = {
  ollama: {
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

const AIs: Array<{ title: string, instruction?: string, output?: string, type: keyof typeof AI_APIS }> = [{
  title: 'Ollama - Llama3',
  type: 'ollama',
  instruction: '',
  output: '---\nAI:\n${response}\n\n---\n'
},
{
  title: 'Ollama - Mistral',
  type: 'ollama',
  instruction: '',
  output: '---\nAI:\n${response}\n\n---\n'
}]

export default class extends MoonPlugin {
  name: string = 'Ai Prompts'
  logo: string = '<svg width="16" height="16" viewBox="0 0 16 16" role="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 21l15 -15l-3 -3l-15 15l3 3"></path><path d="M15 6l3 3"></path><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path></svg></svg>'

  settingsDescription: AiPromptsSettingsDescription = {
    items: {
      type: 'text',
      required: true,
      label: 'Configure your AIs',
      description: 'Use ${response} in output, to place the response at this spot. Check out the doc here [](). ',
      default: JSON.stringify(AIs, null, 2)
    }
  }

  settings: AiPromptsSettings = {
    items: JSON.stringify(AIs, null, 2)
  }

  private readonly log: any

  constructor (props?: MoonPluginConstructorProps<AiPromptsSettings>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(props)
    if (!props) return
    if (props.settings) this.settings = { ...props.settings, items: JSON.stringify({ ...AIs, ...JSON.parse(props.settings.item) }, null, 2) }
    this.log = props.helpers.moonLog
  }

  mention = (): PluginMentionItem[] => {
    const mentions: PluginMentionItem[] = []

    mentions.push({
      name: 'ai_prompts',
      char: ':ai:',
      htmlClass: 'mention_collections',
      allowSpaces: true,
      getListItem: async () => {
        return AIs.map(ai => ({ ...ai, pluginName: 'ai_prompts', callback: AI_APIS[ai.type].callback.toString() }))
      },
      onSelectItem: (props) => {
        // @ts-expect-error this is to be handle easier
        // eslint-disable-next-line no-eval, @typescript-eslint/no-unsafe-argument
        const callback = eval(props.item.callback)
        callback(props)
      }
    })

    return mentions
  }
}
