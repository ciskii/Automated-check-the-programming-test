import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { useState } from "react";

const Mirror = () => {
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

  useState(() => console.log("codeCur", codeCur));

  return (
    <CodeMirror
      value={code}
      extensions={[markdown({ base: markdownLanguage })]}
      // onChange={setCodeCur(value)}
      onChange={(value, viewUpdate) => {
        setCodeCur(value);
      }}
    />
  );
};

export default Mirror;
