import React, { useRef, useState } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/edit/closebrackets.js';

export const Editor = ({ expression, handleChange, options = {} }) => {
  const defaultOptions = {
    mode: 'javascript',
    lineNumbers: true,
    extraKeys: {
      Ctrl: 'autocomplete',
      'Ctrl-Q': (cm) => {
        cm.foldCode(cm.getCursor());
      },
    },
    theme: 'neat',
    smartIndent: true, // 智能缩进
    indentUnit: 4, // 智能缩进单位为4个空格
    indentWithTabs: true, // 使用制表符进行智能缩进
    lineWrapping: true, // 自动换行
    foldGutter: true,
    matchBrackets: true, // 匹配结束符号，比如"]、}"
    autoCloseBrackets: true, // 自动闭合符号
    // styleActiveLine: true, // 显示选中行的样式
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    hintOptions: { hint: handleExpressionChange, completeSingle: true },
  };
  const codeEditorRef = useRef();
  const [code, setCode] = useState(expression);

  function handleExpressionChange(value) {
    setCode(value);
    handleChange(value);
  }

  return (
    <CodeMirror
      ref={codeEditorRef}
      value={code}
      onChange={handleExpressionChange}
      options={Object.assign(defaultOptions, options)}
    />
  );
};
