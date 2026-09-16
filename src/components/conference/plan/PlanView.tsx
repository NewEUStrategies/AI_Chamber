import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AtSign, Globe, Newspaper, Share2 } from 'lucide-react';
import { EmailPanel } from './EmailPanel';
import { MediaPackPanel } from './MediaPackPanel';
import { SocialPanel } from './SocialPanel';
import { WebsitePanel } from './WebsitePanel';
import { PLAN_ACCENT } from '../tokens';
import type { PlanKey } from '@/lib/route';


const TABS: {
  key: PlanKey;
  label: string;
  short: string;
  icon: typeof Share2;
  lead: string;
  render: () => ReactNode;
}[] = [
  {
    key: 'social',
    label: 'Social media',
    short: 'Social',
    icon: Share2,
    lead: 'Decyzje kanałowe, odwrócony miks formatów, rytm tygodniowy i protokół amplifikacji.',
    render: () => <SocialPanel />,
  },
  {
    key: 'email',
    label: 'E-mail marketing',
    short: 'E-mail',
    icon: AtSign,
    lead: 'Higiena wysyłki, jedna lista z segmentacją, Policy Brief i sześć sekwencji cyklu życia.',
    render: () => <EmailPanel />,
  },
  {
    key: 'www',
    label: 'Strona www',
    short: 'Strona',
    icon: Globe,
    lead: 'Naprawa techniczna w pierwszym tygodniu, cztery sekcje do zbudowania, warstwa cytowalności.',
    render: () => <WebsitePanel />,
  },
  {
    key: 'mediapack',
    label: 'Media pack',
    short: 'Media pack',
    icon: Newspaper,
    lead: 'Tiering listy, mechanika embarga, dziewięć elementów pakietu, SLA rzecznika i pakiet sponsorski.',
    render: () => <MediaPackPanel />,
  },
];

/**
 * Proposed actions — four channels, four sets of recommendations.
 *
 * This is the other half of the conference page: the material view answers
 * "what comes out of one day of recordings", this one answers "what do we do
 * about the channels that day has to travel through". They share the page
 * because the conference is where all four converge — the media pack is
 * written for it, the mail sequence runs off it, the site is where its
 * recordings land, and social is what carries it.
 *
 * Numbers are not restated here. Every count in the social tab joins to the
 * archived posts in the dossier data, so a correction there corrects the
 * recommendation. What this section owns is the judgement.
 */
export function PlanView({ channel }: { channel?: PlanKey } = {}) {
  const [active, setActive] = useState<PlanKey>(channel ?? 'social');
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = TABS.map((t) => t.key);
    const i = keys.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % keys.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + keys.length) % keys.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = keys.length - 1;
    else return;
    e.preventDefault();
    setActive(keys[next]);
    refs.current[keys[next]]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Kanały objęte rekomendacjami"
        onKeyDown={move}
        className="flex flex-wrap gap-1.5"
      >
        {TABS.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                refs.current[t.key] = el;
              }}
              role="tab"
              id={`plan-tab-${t.key}`}
              aria-selected={on}
              aria-controls={`plan-panel-${t.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold outline-none transition-colors ${
                on ? 'text-white shadow-md' : 'border border-slate-200 text-chamber-navy hover:bg-slate-50'
              }`}
              style={on ? { background: PLAN_ACCENT, boxShadow: `0 4px 12px ${PLAN_ACCENT}33` } : undefined}
            >
              <t.icon aria-hidden className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.short}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 max-w-3xl text-[13px] leading-[1.7] text-slate-600">{current.lead}</p>

      <div
        role="tabpanel"
        id={`plan-panel-${current.key}`}
        aria-labelledby={`plan-tab-${current.key}`}
        tabIndex={0}
        className="mt-5 outline-none"
      >
        {current.render()}
      </div>
    </div>
  );
}
