import Editor from "@monaco-editor/react";

function CodeEditor(props: { value?: string, onChange: (value?: string) => void }) {
    return <Editor
        height="90vh"
        defaultLanguage="c"
        theme="vs-dark"
        defaultValue="// Plop your C code in here!"
        value={props.value}
        onMount={(editor, monaco) => {
            editor.getModel()?.setEOL(monaco.editor.EndOfLineSequence.LF);
            editor.getModel()?.updateOptions({ tabSize: 3 });
        }}
        onChange={e => props.onChange(e)}
    />
}

export default CodeEditor;