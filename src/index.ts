/* eslint-disable no-template-curly-in-string */
import { MoonPlugin, type MoonPluginConstructorProps, type MoonPluginSettings, type PluginSettingsDescription, type PluginMentionItem, type EndpointCallbackItem } from '@moonjot/moon'
import { AI_APIS } from './aiApis'
import { AIs } from './aiItems'

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
  items: string
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
    items: {
      type: 'text',
      required: true,
      label: 'Configure your AIs',
      description: 'To integrate the response into your output, simply use ${response} at the desired location. For additional information, please refer to the [documentation here](https://github.com/castroCrea/moon-ai-prompt-plugin/blob/0ec7935b190a477c57fa15b4158b7ce11d529183/README.md).',
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

    if (props.settings) {
      this.settings = {
        ...props.settings,
        items: JSON.stringify(uniqBy({ array: [...JSON.parse(props.settings.items ? props.settings.items : '[]'), ...AIs], key: 'title' }), null, 2)
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
      saveSettings({ key: 'items', value: JSON.stringify(uniqBy({ array: [...JSON.parse(this.settings.items ? this.settings.items : '[]'), ...AIs], key: 'title' }), null, 2) })
    }
  }] as EndpointCallbackItem[]

  mention = (): PluginMentionItem[] => {
    const mentions: PluginMentionItem[] = []

    mentions.push({
      name: 'ai_prompts',
      char: ':ai:',
      htmlClass: 'mention_collections',
      allowSpaces: true,
      getListItem: async () => {
        return (JSON.parse(this.settings.items ? this.settings.items : '[]') as typeof AIs).map(ai => ({ ...ai, pluginName: 'ai_prompts', callback: AI_APIS[ai.type].callback.toString() })).filter(ai => ai.token !== '')
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
