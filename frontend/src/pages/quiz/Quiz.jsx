import React, { useEffect, useState, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import { debounce } from "lodash";

import "./quiz.css";

const Quiz = () => {
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

  return (
    <div className='editor'>
      <div className='editor-title'>
        <div className='editor-title-label'>
          <p>DOCUMENT NAME</p>
        </div>
        <input
          className='editor-title-name'
          type='text'
          value={value}
          // onChange={debouncedChangeHandler}
        />
      </div>

      <div className='editor-container'>
        <CodeMirror
          value={codeCur}
          extensions={[markdown({ base: markdownLanguage })]}
          // onChange={(e) => {
          //   debouncedChangeHandler(e);
          // }}
          onChange={debouncedChangeHandler}
          // theme='dark'
          height='100vh'
          width='50vw'
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
