import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface GlossItem {
  word: string;
  index: number;
}

export interface GlossEditorProps {
  initialGloss: string[];
  onCorrected: (corrected: string[]) => void;
}

export const GlossEditor: React.FC<GlossEditorProps> = ({
  initialGloss,
  onCorrected,
}) => {
  const [items, setItems] = useState<string[]>(initialGloss);

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Gloss sequence: ${items.join(", ")}</p>`,
  });

  const handleEdit = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    setItems(next);
    if (editor) {
      editor.commands.setContent(`<p>Gloss sequence: ${next.join(", ")}</p>`);
    }
  };

  const handleConfirm = () => {
    onCorrected(items);
  };

  return (
    <div className="gloss-editor">
      <h3>Gloss Sequence Editor (TipTap)</h3>
      <p>Correct the gloss sequence before animation.</p>
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleEdit(idx, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleConfirm}>Confirm & Animate</button>
      <div className="fallback-info">
        <h4>Fallback Chain</h4>
        <ol>
          <li>Validated animation</li>
          <li>Procedural from gloss</li>
          <li>Fingerspell</li>
          <li>Unavailable</li>
        </ol>
      </div>
    </div>
  );
};
