import Editor from "@monaco-editor/react";

function CodeEditor(props: { value?: string, onChange: (value?: string) => void }) {
    return <Editor
        height="90vh"
        defaultLanguage="c"
        defaultValue="// Plop your C code in here!"
        value={props.value}
        onChange={e => props.onChange(e)}
    />
}

export default CodeEditor;