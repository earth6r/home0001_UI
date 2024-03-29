import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

const CodeSnippet = ({ code }: { code: [] }) => {
  useEffect(() => {
    hljs.registerLanguage("javascript", javascript);
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};

export const Serializer = {
  types: {
    partner: (props: { children: any }) => <CodeSnippet code={props.children} />,
    image: ({node}) => {
      return (
        <img src={node.asset.url} className={`${node.fullwidth ? "w-full" : "w-6/12"} my-3`}/>
        )
    },
  },
  marks: {
    tick: (props: { children: any }) => <span className="tick">{props.children}</span>,
    code: (props: { children: any }) => <CodeSnippet code={props.children} />,
    partner: (props: { children: any }) => <CodeSnippet code={props.children} />,
  },
};
