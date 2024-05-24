# Moon Ai via Mention

<span class="badge-npmversion"><a href="https://npmjs.org/package/@moonjot/moon-ai-prompt-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@moonjot/moon-ai-prompt-plugin.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@moonjot/moon-ai-prompt-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@moonjot/moon-ai-prompt-plugin.svg" alt="NPM downloads" /></a></span>


# Concept

Use `:ai:` to trigger ai flows.

## Build items property

In your settings you got this kind of item:
```json
  {
    "title": "ChatGPT - 4",                        // You can change that as you want
    "type": "openai",                              // openai | gemini | ollama
    "model": "gpt-4",                              // depending on the type refer to official ai doc
    "token": "",                                   // token if needed (openai | gemini)
    "prompt": "{{content}}",                       // you can customize that as you wish {{content}} is the content of the Launcher
    "output": "---\nAI:\n${response}\n\n---\n"     // you can customize how the answer will be formatted before be inserted in the text editor
  }
```

### output

Feel free to customize them, for example change the output

```json
  "output": "The GPT 4 AI answer with : \n${response}\n"
```

### prompt

Feel free to customize them, for example change the prompt like
```json
    "prompt": "Answer to this prompt only in French: '{{content}}'",
```

You can also add `context`

```json
    "prompt": "Answer to this prompt only in French: 'Question : {{content}}\n Article content: {{source.text}}'",
```


## There is only 3 type of AI integration available for now

Ask me if you want more

- [openai](https://platform.openai.com/docs/api-reference/making-requests)
- [gemini](https://ai.google.dev/gemini-api/docs/models/gemini?hl=fr)
- [ollama](https://ollama.com/)



# TODO

- [ ] Add shortcut maybe

# Develop on Moon

Check the doc here https://github.com/castroCrea/moon/blob/main/doc/Plugin_Development.md

Check also the tutorial video https://youtu.be/dvoalnWBwv4 📹

## Installation

```bash
yarn
```

## Build before publishing

```bash
yarn build
```

## For dev mode run 

```bash
yarn watch
```

## Publishing

First remove current git origin
```bash
git remote remove origin
```

Add you repo origin and change also **credential** iin `package.json`

Then
```bash
yarn pub
```