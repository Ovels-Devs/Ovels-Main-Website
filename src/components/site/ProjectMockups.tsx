"use client";

import { Music4, ShieldCheck, Ticket, Gamepad2, BarChart3, Settings2 } from "lucide-react";
import { Camera, Dumbbell, MessageSquareText, BarChartBig } from "lucide-react";

/**
 * Hand-built, animated UI mockups (no images) echoing the real product
 * screens of bot.ovels.in and app.ovels.in.
 */

export function BotMock() {
  return (
    <div className="glass float-slow relative w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(2,10,7,0.55)]" aria-hidden="true">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-[color:var(--line)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="label-mono ml-3 !text-[0.58rem] text-[color:var(--muted-foreground)]">dashboard.ovels.in</span>
        <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-2.5 py-1 text-[10px] text-[color:var(--brand)]">
          <span className="status-dot !h-1.5 !w-1.5" />
          Bot online
        </span>
      </div>

      <div className="grid grid-cols-[132px_1fr]">
        {/* sidebar */}
        <div className="border-r border-[color:var(--line)] p-3">
          <p className="label-mono !text-[0.55rem] text-[color:var(--muted-foreground)]">Overview</p>
          {[
            { icon: Settings2, t: "General" },
            { icon: BarChart3, t: "Statistics" },
          ].map((r) => (
            <div key={r.t} className="mt-1.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[color:var(--muted-foreground)]">
              <r.icon className="h-3.5 w-3.5" />
              {r.t}
            </div>
          ))}
          <p className="label-mono mt-3 !text-[0.55rem] text-[color:var(--muted-foreground)]">Moderation</p>
          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-[rgba(61,189,138,0.35)] bg-[rgba(61,189,138,0.1)] px-2.5 py-2 text-xs text-[color:var(--mint)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Moderation
          </div>
          {[
            { icon: Ticket, t: "Tickets" },
            { icon: Music4, t: "Music" },
            { icon: Gamepad2, t: "Minigames" },
          ].map((r) => (
            <div key={r.t} className="mt-1.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-[color:var(--muted-foreground)]">
              <r.icon className="h-3.5 w-3.5" />
              {r.t}
            </div>
          ))}
        </div>

        {/* main panel */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-semibold text-white">Moderation</p>
              <p className="mt-0.5 text-[11px] text-[color:var(--muted-foreground)]">My server, warnings and mod log</p>
            </div>
            {/* equalizer = music module running */}
            <div className="flex h-8 items-end gap-1 rounded-lg border border-[color:var(--line)] px-2.5 py-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="eq-bar h-full w-1 rounded-sm bg-[color:var(--brand-bright)]" />
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-[color:var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
            <p className="text-xs font-medium text-white">Warnings</p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <div>
                <p className="text-[10px] text-[color:var(--muted-foreground)]">Max warnings</p>
                <div className="mt-1 rounded-lg border border-[color:var(--line)] bg-[rgba(4,19,14,0.7)] px-2.5 py-2 text-xs text-white">5</div>
              </div>
              <div>
                <p className="text-[10px] text-[color:var(--muted-foreground)]">Action on limit</p>
                <div className="mt-1 flex items-center justify-between rounded-lg border border-[color:var(--line)] bg-[rgba(4,19,14,0.7)] px-2.5 py-2 text-xs text-white">
                  Timeout <span className="text-[color:var(--muted-foreground)]">▾</span>
                </div>
              </div>
            </div>
            <div className="mt-2.5">
              <p className="text-[10px] text-[color:var(--muted-foreground)]">Mod log channel</p>
              <div className="mt-1 rounded-lg border border-[color:var(--line)] bg-[rgba(4,19,14,0.7)] px-2.5 py-2 text-xs text-white"># mod log</div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-3">
              <span className="text-[11px] text-[color:var(--brand)]">✓ Saved</span>
              <span className="btn-primary rounded-lg px-3.5 py-2 text-[11px] font-semibold">Save changes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]" aria-hidden="true">
      {/* ambient glow */}
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.18),transparent)]" />
      <div className="glass float-slower relative overflow-hidden rounded-[2.4rem] border-[rgba(151,177,164,0.22)] p-3 shadow-[0_30px_90px_rgba(2,10,7,0.6)]">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] bg-[rgba(2,10,7,0.85)]">
          {/* notch */}
          <div className="flex justify-center pt-3">
            <span className="h-1.5 w-16 rounded-full bg-[rgba(255,255,255,0.14)]" />
          </div>
          <div className="p-4">
            <p className="font-heading text-sm font-semibold text-white">Good evening</p>
            {/* calorie ring */}
            <div className="relative mx-auto mt-3 h-36 w-36">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke="#3dbd8a" strokeWidth="9" strokeLinecap="round"
                  className="ring-draw"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-2xl font-bold text-white">1,840</p>
                <p className="text-[10px] text-[color:var(--muted-foreground)]">/ 2,200 kcal</p>
              </div>
            </div>
            {/* macros */}
            <div className="mt-4 space-y-2">
              {[
                { t: "Protein", v: "132g", c: "#3dbd8a" },
                { t: "Carbs", v: "188g", c: "#5fa8d3" },
                { t: "Fat", v: "54g", c: "#d9954f" },
              ].map((m) => (
                <div key={m.t} className="flex items-center gap-2 rounded-xl border border-[color:var(--line)] bg-[rgba(255,255,255,0.03)] px-3 py-2">
                  <span className="status-dot !h-1.5 !w-1.5" style={{ background: m.c }} />
                  <span className="text-xs text-white">{m.t}</span>
                  <span className="ml-auto text-xs font-semibold text-white">{m.v}</span>
                </div>
              ))}
            </div>
            {/* AI coach + scanner */}
            <div className="relative mt-3 overflow-hidden rounded-xl border border-[rgba(61,189,138,0.4)] bg-[rgba(61,189,138,0.08)] p-3">
              <span className="scanline" />
              <p className="label-mono !text-[0.55rem] text-[color:var(--teal-light)]">AI coach, scanning plate</p>
              <div className="mt-2 flex items-center gap-2">
                <Camera className="h-4 w-4 text-[color:var(--brand)]" />
                <Dumbbell className="h-4 w-4 text-[color:var(--sky)]" />
                <MessageSquareText className="h-4 w-4 text-[color:var(--amber)]" />
                <BarChartBig className="h-4 w-4 text-[color:var(--gold)]" />
                <span className="ml-auto text-[10px] text-[color:var(--brand)]">typing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GenericMock({ label }: { label: string }) {
  return (
    <div className="glass float-slow flex aspect-[16/10] w-full max-w-xl flex-col items-center justify-center gap-3 rounded-2xl text-center" aria-hidden="true">
      <span className="dash-march h-px w-40" />
      <p className="font-display text-xl tracking-widest text-[rgba(183,247,218,0.5)]">{label}</p>
      <span className="dash-march h-px w-40" />
    </div>
  );
}
