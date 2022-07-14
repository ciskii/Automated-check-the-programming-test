import React, { useEffect, useState, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import { debounce } from "lodash";

import "./quiz.css";

const Quiz = () => {
  // const myTheme = createTheme({
  //   dark: "light",
  //   settings: {
  //     background: "#ffffff",
  //     foreground: "#4D4D4C",
  //     caret: "#AEAFAD",
  //     selection: "#D6D6D6",
  //     selectionMatch: "#D6D6D6",
  //     gutterBackground: "#FFFFFF",
  //     gutterForeground: "#4D4D4C",
  //     gutterBorder: "#ddd",
  //     lineHighlight: "#EFEFEF",
  //   },
  //   styles: [
  //     { tag: t.comment, color: "#010a13" },
  //     { tag: t.lineComment, color: "#b1afaf" },
  //     { tag: t.blockComment, color: "#ebebeb" },
  //     { tag: t.docComment, color: "#a18c8c" },
  //     { tag: t.name, color: "#0f6ce6" },
  //     { tag: t.definition(t.typeName), color: "#194a7b" },
  //     { tag: t.typeName, color: "#194a7b" },
  //     { tag: t.tagName, color: "#008a02" },
  //     { tag: t.variableName, color: "#000000" },
  //     { tag: t.definition(t.variableName), color: "#fb6060" },
  //     { tag: t.propertyName, color: "#7e3030" },
  //     { tag: t.labelName, color: "#039b1c" },
  //     { tag: t.macroName, color: "#ffffff" },
  //     { tag: t.special(t.string), color: "#ffffff" },
  //     { tag: t.escape, color: "#e9baba" },
  //     { tag: t.color, color: "#ffffff" },
  //     { tag: t.keyword, color: "#e01f1f" },
  //     { tag: t.operatorKeyword, color: "#ffffff" },
  //     { tag: t.controlKeyword, color: "#ffffff" },
  //     { tag: t.moduleKeyword, color: "#b300ad" },
  //     { tag: t.bracket, color: "#2f13a0" },
  //     { tag: t.angleBracket, color: "#ffffff" },
  //     { tag: t.squareBracket, color: "#4b6faa" },
  //     { tag: t.paren, color: "#ffffff" },
  //     { tag: t.brace, color: "#fb0e0e" },
  //     { tag: t.heading, color: "#fb6060" },
  //     { tag: t.contentSeparator, color: "#ffffff" },
  //     { tag: t.quote, color: "#ffffff" },
  //     { tag: t.link, color: "#b300ad" },
  //     { tag: t.monospace, color: "#180c0c" },
  //   ],
  // });

  const myTheme = createTheme({
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

  const code = `## Title

  \`\`\`jsx
  function Demo() {
    return <div>demo</div>
  }
  \`\`\`

  \`\`\`bash
  # Not dependent on uiw.
  npm install @codemirror/lang-markdown --save
  npm install @codemirror/language-data --save
  \`\`\`

  [weisit ulr](https://uiwjs.github.io/react-codemirror/)

  \`\`\`go
  package main
  import "fmt"
  func main() {
    fmt.Println("Hello, 世界")
  }
  \`\`\`
  `;

  const [codeCur, setCodeCur] = useState(code);
  const [value, setValue] = useState("Example.md");

  const changeHandler = useCallback((value, viewUpdate) => {
    console.log("value", value);
    setCodeCur(value);
  }, []);

  const debouncedChangeHandler = useMemo(
    (value, viewUpdate) => debounce(changeHandler, 300),
    []
  );

  // useState(() => {
  //   console.log("codeCur", codeCur);
  // });
  return (
    <div className='editor'>
      <div className='editor-title'>
        <div className='editor-title-label'>
          <p>DOCUMENT NAME</p>
        </div>
        <input className='editor-title-name' type='text' value={value} />
      </div>

      <div className='editor-container'>
        <CodeMirror
          value={codeCur}
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={debouncedChangeHandler}
          height='100vh'
          width='50vw'
          theme={myTheme}
          className='quiz-editor'
        />

        <ReactMarkdown
          className='editor-show'
          children={codeCur}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dracula}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default Quiz;
