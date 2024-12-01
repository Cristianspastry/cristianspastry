import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, AlignLeft } from 'lucide-react';
import StarterKit from '@tiptap/starter-kit';

// Toolbar personalizzata con Lucide
function Toolbar({ editor }) {
  if (!editor) return null;

  const buttonClasses = (isActive) =>
    `flex items-center justify-center p-2 rounded ${
      isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
    }`;

  return (
    <div className="flex gap-2 mb-4 bg-gray-100 p-2 rounded">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClasses(editor.isActive('bold'))}
        title="Bold"
      >
        <Bold className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClasses(editor.isActive('italic'))}
        title="Italic"
      >
        <Italic className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClasses(editor.isActive('underline'))}
        title="Underline"
      >
        <UnderlineIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClasses(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        <List className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClasses(editor.isActive('orderedList'))}
        title="Ordered List"
      >
        <ListOrdered className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={buttonClasses(editor.isActive('paragraph'))}
        title="Paragraph"
      >
        <AlignLeft className="h-5 w-5" />
      </button>
    </div>
  );
}

// Editor principale
export default function TextEditor({value, onChange}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return (
    <div className="p-4 border border-gray-300 rounded bg-white">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[150px] p-4 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
