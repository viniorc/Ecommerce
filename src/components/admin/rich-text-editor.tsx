"use client";

import { useEffect, useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Link2, List, ListOrdered, Text } from "lucide-react";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Descreva o produto...",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        heading: false,
        blockquote: false,
        code: false,
        codeBlock: false,
      }),
      HardBreak.configure({ keepMarks: true }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[140px] w-full rounded-[12px] border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none",
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  const isBold = editor?.isActive("bold");
  const isBullet = editor?.isActive("bulletList");
  const isOrdered = editor?.isActive("orderedList");

  const toolbarButtonClass = useMemo(
    () =>
      "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:border-gold/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    []
  );

  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Cole o link:", previousUrl ?? "");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url.trim() }).run();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={cn(toolbarButtonClass, isBold && "border-gold text-foreground")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Negrito"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={cn(toolbarButtonClass, isBullet && "border-gold text-foreground")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          aria-label="Lista com marcadores"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={cn(toolbarButtonClass, isOrdered && "border-gold text-foreground")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          aria-label="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          aria-label="Quebra de linha"
        >
          <Text className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          onClick={handleSetLink}
          aria-label="Adicionar link"
        >
          <Link2 className="h-4 w-4" />
        </button>
      </div>
      <div className="rounded-[14px] border border-border/70 bg-card/70 p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
