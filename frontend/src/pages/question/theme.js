import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const myTheme = createTheme({
  dark: "light",
  settings: {
    background: "#ffffff",
    foreground: "#000000",
    caret: "#000000",
    selection: "#d6d6d6",
    selectionMatch: "#D6D6D6",
    gutterBackground: "#FFFFFF",
    gutterForeground: "#4D4D4C",
    gutterBorder: "#ddd",
    lineHighlight: "#EFEFEF",
  },
  styles: [
    { tag: t.comment, color: "#000000" },
    { tag: t.lineComment, color: "#a0a0a2" },
    { tag: t.name, color: "#000000" },
    { tag: t.definition(t.typeName), color: "#194a7b" },
    { tag: t.typeName, color: "#194a7b" },
    { tag: t.tagName, color: "#0a290b" },
    { tag: t.variableName, color: "#000000" },
    { tag: t.definition(t.variableName), color: "#000000" },
    { tag: t.function(t.variableName), color: "#000000" },
    { tag: t.propertyName, color: "#000000" },
    { tag: t.function(t.propertyName), color: "#000000" },
    { tag: t.definition(t.propertyName), color: "#000000" },
    { tag: t.special(t.propertyName), color: "#000000" },
    { tag: t.attributeName, color: "#000000" },
    { tag: t.labelName, color: "#ff0000" },
    { tag: t.namespace, color: "#000000" },
    { tag: t.operatorKeyword, color: "#000000" },
    { tag: t.controlKeyword, color: "#000000" },
    { tag: t.definitionKeyword, color: "#000000" },
    { tag: t.moduleKeyword, color: "#9402e3" },
    { tag: t.operator, color: "#000000" },
    { tag: t.derefOperator, color: "#000000" },
    { tag: t.angleBracket, color: "#000000" },
    { tag: t.squareBracket, color: "#000000" },
    { tag: t.brace, color: "#000000" },
    { tag: t.content, color: "#000000" },
    { tag: t.heading, color: "#f16609" },
    { tag: t.contentSeparator, color: "#000000" },
    { tag: t.quote, color: "#000000" },
    { tag: t.link, color: "#8e02e3" },
    // { tag: t.monospace, color: "#3a75fd" },
    { tag: t.strikethrough, color: "#000000" },
    { tag: t.inserted, color: "#e60f0f" },
    { tag: t.documentMeta, color: "#000000" },
    { tag: t.annotation, color: "#000000" },
    // { tag: t.processingInstruction, color: "#000000" },
  ],
});

export const code = `# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
You should probably combine it with
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

<blockquote>
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)
`;
