import { useState } from 'react';
import { FACEBOOK_POSTS, LINKEDIN_POSTS, type PostFormat, type SocialPost } from '@/content/dossier/social';
import { Term } from '@/components/dossier/Term';
import { INK, SERIES } from './trafficPalette';

const FORMAT_PILL: Record<PostFormat, { label: string; cls: string }> = {
  zdjecia: { label: 'zdjęcia', cls: 'pill pos' },
  live: { label: 'na żywo', cls: 'pill pos' },
  karuzela: { label: 'karuzela', cls: 'pill cyan' },
  obraz: { label: 'grafika', cls: 'pill' },
  newsletter: { label: 'newsletter', cls: 'pill' },
};

function Ledger({ posts, accent, scaleMax }: { posts: SocialPost[]; accent: string; scaleMax: number }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {posts.map((p) => (
        <div key={p.title}>
          <button
            type="button"
            onClick={() => setOpen(open === p.title ? null : p.title)}
            className="flex w-full items-center gap-3 rounded-[6px] px-1.5 py-1.5 text-left transition-colors hover:bg-chamber-navy/[0.04]"
            aria-expanded={open === p.title}
          >
            <span className="w-[62px] shrink-0 text-[11px] font-bold tabular-nums text-slate-500">{p.when}</span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-chamber-navy">{p.title}</span>
            <span className="hidden shrink-0 sm:block">
              <span className={FORMAT_PILL[p.format].cls}>{FORMAT_PILL[p.format].label}</span>
            </span>
            <span className="w-[86px] shrink-0">
              <span className="block h-2.5 overflow-hidden rounded-[3px]" style={{ background: INK.track }}>
                <span
                  className="block h-full rounded-[3px]"
                  style={{ width: `${Math.max((p.reactions / scaleMax) * 100, 1.5)}%`, background: accent }}
                />
              </span>
            </span>
            <span className="w-8 shrink-0 text-right text-[12px] font-extrabold tabular-nums text-chamber-navy">
              {p.reactions}
            </span>
          </button>
          {open === p.title && (
            <div className="mb-1 ml-[70px] mr-1 rounded-[6px] bg-chamber-navy/[0.035] px-3 py-2.5 text-[12px] leading-[1.6] text-slate-700">
              <span className="font-bold">{p.reactions}</span> reakcji ·{' '}
              <span className="font-bold">{p.comments}</span> komentarzy ·{' '}
              <span className="font-bold">{p.shares}</span> udostępnień · język:{' '}
              <span className="font-bold">{p.lang === 'pl' ? 'polski' : 'angielski'}</span>
              {p.note && <div className="mt-1.5 text-slate-600">{p.note}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Every post read from the screenshots, ranked in feed order. */
export function PostLedger() {
  const scale = Math.max(...LINKEDIN_POSTS.map((p) => p.reactions));
  return (
    <div className="space-y-5">
      <div className="card">
        <h3>
          LinkedIn — wszystkie odczytane posty
          <span className="mono">{LINKEDIN_POSTS.length} pozycji</span>
        </h3>
        <p>
          Kolejność feedu, od najnowszego. Słupek to liczba <Term k="reakcja">reakcji</Term> w
          skali całej próby. Kliknięcie wiersza pokazuje komplet liczb.
        </p>
        <div className="mt-4">
          <Ledger posts={LINKEDIN_POSTS} accent={SERIES.chamber} scaleMax={scale} />
        </div>
      </div>

      <div className="card">
        <h3>
          Facebook — wszystkie odczytane posty
          <span className="mono">{FACEBOOK_POSTS.length} pozycji</span>
        </h3>
        <p>
          Ta sama skala co wyżej. To nie jest błąd renderowania — słupki są tak krótkie, bo
          liczby są jednocyfrowe.
        </p>
        <div className="mt-4">
          <Ledger posts={FACEBOOK_POSTS} accent={SERIES.summit} scaleMax={scale} />
        </div>
        <p className="note">
          Facebook pokazuje dokładne daty, LinkedIn tylko przybliżony wiek posta. Dlatego
          kalendarz publikacji da się odtworzyć precyzyjnie wyłącznie dla słabszego kanału.
        </p>
      </div>
    </div>
  );
}
