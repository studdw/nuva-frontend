import type { ReactNode } from 'react';

/* Mockup de celular — moldura com gradiente "cromado" do sistema */
export default function Celular({ children }: { children: ReactNode }) {
  return (
    <div className="cromado mx-auto w-[280px] rounded-[44px] p-[10px] shadow-[rgba(0,0,0,0.2)_0px_18px_20px_0px] md:rotate-[-4deg]">
      <div className="relative h-[560px] overflow-hidden rounded-[36px] bg-obsidian">
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-void" />
        <div className="h-full overflow-hidden px-5 pb-6 pt-14">{children}</div>
      </div>
    </div>
  );
}
