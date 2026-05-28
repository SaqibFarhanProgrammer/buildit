export const coloursManaco = {
  'editor.background': '#0A0A0A',
  'editor.foreground': '#E6EDF3',
  'editor.lineHighlightBackground': '#111111',
  'editor.lineHighlightBorder': '#1a1a1a',
  'editor.selectionBackground': '#0004ff40',
  'editor.selectionHighlightBackground': '#0004ff20',
  'editor.inactiveSelectionBackground': '#0004ff15',
  'editor.selectionForeground': '#ffffff',
  'editorCursor.foreground': '#0004ff',
  'editorCursor.background': '#0A0A0A',
  'editorLineNumber.foreground': '#333333',
  'editorLineNumber.activeForeground': '#E6EDF3',
  'editorLineNumber.dimmedForeground': '#222222',
  'editorIndentGuide.background': '#161616',
  'editorIndentGuide.activeBackground': '#2a2a2a',
  'editorWhitespace.foreground': '#222222',
};

export const rulesManaco = [
  // Comments - Gray
  { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
  { token: 'comment.doc', foreground: '6A737D', fontStyle: 'italic' },
  // Keywords - White bold (import, export, function, const, etc)
  { token: 'keyword', foreground: 'FF7B72', fontStyle: 'bold' },
  { token: 'keyword.control', foreground: 'FF7B72' },
  { token: 'keyword.operator', foreground: 'FF7B72' },
  { token: 'keyword.other', foreground: 'FF7B72' },
  // Types - Cyan/Blue
  { token: 'type', foreground: '79C0FF' },
  { token: 'type.identifier', foreground: '79C0FF' },
  { token: 'namespace', foreground: '79C0FF' },
  // Functions - Blue
  { token: 'function', foreground: 'D2A8FF' },
  { token: 'function.declaration', foreground: 'D2A8FF' },
  { token: 'function.call', foreground: 'D2A8FF' },
  { token: 'method', foreground: 'D2A8FF' },
  // Identifiers/Variables - White
  { token: 'identifier', foreground: 'E6EDF3' },
  { token: 'variable', foreground: 'E6EDF3' },
  { token: 'variable.other', foreground: 'E6EDF3' },
  { token: 'variable.parameter', foreground: 'FFA657' },
  // Strings - Green
  { token: 'string', foreground: 'A5D6FF' },
  { token: 'string.quote', foreground: 'A5D6FF' },
  { token: 'string.template', foreground: 'A5D6FF' },
  { token: 'string.regex', foreground: 'A5D6FF' },
  // Numbers - Blue
  { token: 'number', foreground: '79C0FF' },
  { token: 'number.float', foreground: '79C0FF' },
  { token: 'number.hex', foreground: '79C0FF' },
  // Operators - White/Gray
  { token: 'operator', foreground: 'FF7B72' },
  { token: 'delimiter', foreground: 'C9D1D9' },
  { token: 'delimiter.bracket', foreground: 'C9D1D9' },
  { token: 'delimiter.parenthesis', foreground: 'C9D1D9' },
  // Tags (HTML/JSX) - Blue
  { token: 'tag', foreground: '7EE787' },
  { token: 'tag.id', foreground: '79C0FF' },
  { token: 'tag.class', foreground: '79C0FF' },
  { token: 'attribute.name', foreground: '7EE787' },
  { token: 'attribute.value', foreground: 'A5D6FF' },
  // CSS properties
  { token: 'property', foreground: '79C0FF' },
  { token: 'property.value', foreground: 'A5D6FF' },
  { token: 'unit', foreground: '79C0FF' },
  // JSON
  { token: 'key', foreground: '7EE787' },
  { token: 'string.key', foreground: '7EE787' },
  // Markdown
  { token: 'markup.heading', foreground: '79C0FF', fontStyle: 'bold' },
  { token: 'markup.bold', foreground: 'E6EDF3', fontStyle: 'bold' },
  { token: 'markup.italic', foreground: 'E6EDF3', fontStyle: 'italic' },
  { token: 'markup.link', foreground: 'A5D6FF' },
  { token: 'markup.code', foreground: 'FFA657' },
  // Constants
  { token: 'constant', foreground: '79C0FF' },
  { token: 'constant.language', foreground: '79C0FF' },
  { token: 'constant.numeric', foreground: '79C0FF' },
  { token: 'constant.character', foreground: 'A5D6FF' },
  // Storage (const, let, var, class, interface)
  { token: 'storage', foreground: 'FF7B72', fontStyle: 'bold' },
  { token: 'storage.type', foreground: 'FF7B72' },
  { token: 'storage.modifier', foreground: 'FF7B72' },
  // Support (built-in objects, methods)
  { token: 'support', foreground: '79C0FF' },
  { token: 'support.function', foreground: 'D2A8FF' },
  { token: 'support.class', foreground: '79C0FF' },
  { token: 'support.type', foreground: '79C0FF' },
  // Invalid/Error
  { token: 'invalid', foreground: 'FF4444' },
  { token: 'error', foreground: 'FF4444' },
];
