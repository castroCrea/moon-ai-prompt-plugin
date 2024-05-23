# Moon Ai via Mention

<span class="badge-npmversion"><a href="https://npmjs.org/package/@moonjot/moon-ai-prompt-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@moonjot/moon-ai-prompt-plugin.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@moonjot/moon-ai-prompt-plugin" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@moonjot/moon-ai-prompt-plugin.svg" alt="NPM downloads" /></a></span>


# Concept

Use `:ai:` to trigger ai flows.

# TODO

- [ ] Add shortcut maybe
- [ ] Add template for instructions, like author or content and maybe {{content}} for text editor content

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