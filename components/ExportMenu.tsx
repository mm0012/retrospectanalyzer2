"use client";
import { exportMarkdown, exportNotion, exportPdf } from "@/lib/export";

type Props = { payload: any };

export default function ExportMenu({ payload }: Props) {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded" onClick={() => exportPdf(payload)}>PDF</button>
      <button className="px-3 py-1 border rounded" onClick={() => exportMarkdown(payload)}>Markdown</button>
      <button className="px-3 py-1 border rounded" onClick={() => exportNotion(payload)}>Notion</button>
    </div>
  );
}


