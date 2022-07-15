import React, { useEffect, useState, useMemo, useCallback } from "react";
import { debounce } from "lodash";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import "katex/dist/katex.min.css";

import CodeMirror from "@uiw/react-codemirror";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";

import { myTheme, code } from "./theme";
import "./quiz.css";
import "github-markdown-css";
// hljs = require("highlight.js/lib/common");

const Quiz = () => {
  const [codeCur, setCodeCur] = useState(code);
  const [value, setValue] = useState("Example.md");

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
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
        <input className='editor-title-name' type='text' value={value} />
      </div>

      <div className='editor-container'>
        <CodeMirror
          value={codeCur}
          extensions={[markdown({ base: markdownLanguage })]}
          onChange={debouncedChangeHandler}
          // height='max-content'
          // width='auto'
          theme={myTheme}
          className='quiz-editor'
        />

        <ReactMarkdown
          className='editor-show markdown-body'
          children={codeCur}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={githubGist}
                  PreTag='div'
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                  // useInlineStyles={false}
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
