"use client";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  initial?: string;
  render: (id: string) => React.ReactNode;
}

export default function Tabs({ tabs, initial, render }: Props) {
  const [active, setActive] = useState(initial || tabs[0]?.id);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-slate-100 box-border flex items-center justify-center p-[4px] relative rounded-[12px] w-[288px] mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`${
              active === t.id
                ? 'bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]'
                : ''
            } box-border flex items-center justify-center overflow-clip px-3 py-2 relative rounded-[8px] shrink-0 flex-1 cursor-pointer transition-all`}
            onClick={() => setActive(t.id)}
          >
            <div className={`font-pretendard font-medium leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap ${
              active === t.id ? 'text-[#020618]' : 'text-[#90a1b9]'
            }`}>
              <p className="leading-[24px] whitespace-pre">{t.label}</p>
            </div>
          </button>
        ))}
      </div>
      <div>{active ? render(active) : null}</div>
    </div>
  );
}


