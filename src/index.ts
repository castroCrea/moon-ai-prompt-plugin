/* eslint-disable no-template-curly-in-string */
import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem, type EndpointCallbackItem, type PluginSettingsInputJsonDataDescriptionItem } from '@moonjot/moon'
import { AI_APIS } from './aiApis'
import { AIs } from './aiItems'

interface AiPromptsSettingsDescription extends PluginSettingsDescription {
  items: {
    type: 'json'
    required: boolean
    label: string
    description: string
    default?: Array<Record<string, string>>
    dataDescription: PluginSettingsInputJsonDataDescriptionItem[]
  }
  shortcut: {
    type: 'shortcut'
    required: boolean
    label: string
    description: string
    default: string
  }
}

interface AiPromptsSettings extends MoonPluginSettings {
  shortcut: string
  items: Array<Record<string, string>>
}

const uniqBy = ({
  array,
  key
}: {
  array: Array<Record<string, string>>
  key: string
}) => {
  const seen = new Set()
  return array.filter((item) => {
    const keyValue = item[key]
    if (seen.has(keyValue)) {
      return false
    } else {
      seen.add(keyValue)
      return true
    }
  })
}

export default class extends MoonPlugin {
  name: string = 'Ai Prompts'
  logo: string = '<svg role="img"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 21l15 -15l-3 -3l-15 15l3 3"></path><path d="M15 6l3 3"></path><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path></svg></svg>'

  settingsDescription: AiPromptsSettingsDescription = {
    shortcut: {
      type: 'shortcut',
      required: true,
      label: 'Configure shortcut',
      description: 'Shortcut to trigger AI.',
      default: 'Alt+Enter'
    },
    items: {
      type: 'json',
      required: true,
      label: 'Configure your AIs',
      description: 'To integrate the response into your output, simply use ${response} at the desired location. For additional information, please refer to the [documentation here](https://github.com/castroCrea/moon-ai-prompt-plugin/blob/0ec7935b190a477c57fa15b4158b7ce11d529183/README.md).',
      default: AIs,
      dataDescription: [
        {
          title: 'Title',
          type: 'string',
          key: 'title'
        },
        {
          title: 'Model',
          type: 'string',
          key: 'model'
        },
        {
          title: 'Prompt',
          type: 'template',
          key: 'prompt'
        },
        {
          title: 'Output',
          type: 'string',
          key: 'output'
        },
        {
          title: 'Type',
          type: 'selection',
          key: 'type',
          dataDescription: [
            {
              title: 'Ollama',
              value: 'ollama',
              key: 'ollama'
            },
            {
              title: 'Gemini',
              value: 'gemini',
              key: 'gemini'
            },
            {
              title: 'OpenAI',
              value: 'openai',
              key: 'openai'
            },
            {
              title: 'Mistral',
              value: 'mistral',
              key: 'mistral'
            }
          ]
        },
        {
          title: 'Token',
          type: 'string',
          key: 'token'
        }
      ]
    }
  }

  settings: AiPromptsSettings = {
    shortcut: '',
    items: AIs
  }

  private readonly log: any

  constructor (props?: MoonPluginConstructorProps<AiPromptsSettings>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(props)
    if (!props) return

    if (props.settings) {
      this.settings = {
        ...props.settings,
        items: uniqBy({ array: [...(props.settings.items ? props.settings.items as any[] : []), ...AIs], key: 'title' })
      }
    }
    this.log = props.helpers.moonLog

    this.settingsButtons = [
      {
        type: 'button',
        callback: () => {
          window.open('moonjot://moon-ai-prompt-plugin/update', '_blank')
        },
        label: 'Update AI configuration',
        description: 'If you want to reset everything, delete the configuration and click the button.'
      }
    ]
  }

  endpointCallbacks = [{
    endpoint: 'moon-ai-prompt-plugin/update',
    callback: ({ saveSettings }) => {
      saveSettings({ key: 'items', value: uniqBy({ array: [...this.settings.items ? (this.settings.items as []) : [], ...AIs], key: 'title' }) })
    }
  }] as EndpointCallbackItem[]

  // shortcuts: AIs.map(ai => ({...ai, callback: AI_APIS[ai.type].callback.toString() }))

  mention = (): PluginMentionItem[] => {
    const mentions: PluginMentionItem[] = []

    mentions.push({
      name: 'ai_prompts',
      char: ':ai:',
      shortcut: this.settings.shortcut,
      htmlClass: 'mention_collections',
      allowSpaces: true,
      getListItem: async () => {
        return ((this.settings.items ? this.settings.items : []) as typeof AIs).map(ai => ({ ...ai, pluginName: 'ai_prompts', callback: AI_APIS[ai.type].callback.toString() })).filter(ai => ai.token !== '')
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
