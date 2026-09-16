import { useState } from 'react';
import {
  AS_DISTRIBUTION,
  LINK_ATTRIBUTES,
  LINK_COUNTRIES,
  SEO_DERIVED,
  TLD_SPLIT,
} from '@/content/dossier/seo';
import { plNum } from '@/content/dossier/analytics';
import { Term } from '@/components/dossier/Term';
import { INK, SERIES, plPct } from './trafficPalette';

/** Buckets at or below 10 are the junk end of the profile. */
const WEAK = '0–10';

function Bars({
  rows,
  accent,
}: {
  rows: { label: string; value: number; count: number; weak?: boolean }[];
  accent: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="space-y-2.5">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-3"
          onMouseEnter={() => setHover(r.label)}
          onMouseLeave={() => setHover(null)}
        >
          <span className="w-[108px] shrink-0 text-right text-[12px] font-bold text-chamber-navy">{r.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-[4px] bg-chamber-navy/[0.06]">
            <div
              className="h-full rounded-[4px] transition-[width] duration-700"
              style={{
                width: `${Math.max((r.value / max) * 100, 1.5)}%`,
                background: r.weak ? '#b45309' : accent,
              }}
            />
          </div>
          <span
            className={`w-24 shrink-0 text-right text-[11px] font-bold tabular-nums transition-colors ${
              hover === r.label ? 'text-chamber-navy' : 'text-slate-500'
            }`}
          >
            {plNum(r.count)} · {plPct(r.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Quality of the referring-domain profile: authority, TLD and origin. */
export function LinkQuality() {
  return (
    <div className="space-y-5">
      <div className="card">
        <h3>
          <Term k="domena odsyłająca">Domeny odsyłające</Term> według <Term k="AS">Authority Score</Term>
        </h3>
        <p>
          Rozkład pokazuje, z jak silnych serwisów prowadzą linki. Przedział 0–10 zaznaczono na
          bursztynowo, bo to pasmo, w którym mieszczą się strony zakładane masowo i katalogi
          generowane automatycznie.
        </p>
        <div className="mt-5">
          <Bars
            accent={SERIES.chamber}
            rows={AS_DISTRIBUTION.map((b) => ({
              label: b.range,
              value: b.pct,
              count: b.domains,
              weak: b.range === WEAK,
            }))}
          />
        </div>
        <p className="note">
          Powyżej 50 punktów mieści się {SEO_DERIVED.strongDomains} domen z 416 — mniej niż dwa i pół
          procent profilu.
        </p>
      </div>

      <div className="grid2">
        <div className="card">
          <h3>
            Końcówki domen <Term k="TLD" />
          </h3>
          <div className="mt-4">
            <Bars
              accent={SERIES.summit}
              rows={TLD_SPLIT.map((t) => ({
                label: t.tld,
                value: t.pct,
                count: t.domains,
                weak: t.cheap,
              }))}
            />
          </div>
          <p className="note">
            Na końcówkach .xyz i .site stoi {SEO_DERIVED.cheapTldDomains} domen, czyli{' '}
            {((SEO_DERIVED.cheapTldDomains / 416) * 100).toFixed(1).replace('.', ',')}% profilu.
          </p>
        </div>

        <div className="card">
          <h3>Kraje domen odsyłających</h3>
          <div className="mt-4">
            <Bars
              accent={SERIES.chamber}
              rows={LINK_COUNTRIES.map((c) => ({ label: c.country, value: c.pct, count: c.domains }))}
            />
          </div>
          <p className="note">
            Udziały liczone od domen, którym Semrush przypisał kraj — nie od wszystkich 416.
            Mołdawia na trzecim miejscu to sygnał charakterystyczny dla zaplecza linkowego, a nie dla
            zainteresowania rynkowego.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>
          Atrybuty linków
        </h3>
        <p>
          Tylko linki bez atrybutu ograniczającego przekazują autorytet. Reszta liczy się do statystyk,
          ale nie do pozycji.
        </p>
        <div className="mt-4 flex h-4 gap-[2px] overflow-hidden rounded-full">
          {LINK_ATTRIBUTES.filter((a) => a.count > 0).map((a, i) => (
            <span
              key={a.key}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${a.pct}%`,
                background: i === 0 ? SERIES.summit : i === 1 ? 'rgba(41,50,119,0.18)' : INK.dim,
              }}
              title={`${a.label}: ${plNum(a.count)} (${plPct(a.pct)})`}
            />
          ))}
        </div>
        <table className="data" style={{ marginTop: '14px' }}>
          <thead>
            <tr>
              <th>Atrybut</th>
              <th>Udział</th>
              <th>Linki</th>
              <th>Czy przekazuje autorytet</th>
            </tr>
          </thead>
          <tbody>
            {LINK_ATTRIBUTES.map((a) => (
              <tr key={a.key}>
                <td>
                  <Term k={a.key === 'follow' ? 'follow' : a.key === 'nofollow' ? 'nofollow' : a.key === 'ugc' ? 'UGC' : 'link sponsorowany'}>
                    {a.label}
                  </Term>
                </td>
                <td className="num tabnum">{plPct(a.pct)}</td>
                <td className="num tabnum">{plNum(a.count)}</td>
                <td className="num">
                  {a.key === 'follow' ? (
                    <span className="pill pos">tak</span>
                  ) : a.key === 'sponsored' ? (
                    <span className="pill">nie dotyczy</span>
                  ) : (
                    <span className="pill warn">nie</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          Siedem na dziesięć linków nie przekazuje autorytetu. Profil wygląda liczebnie lepiej, niż
          działa.
        </p>
      </div>
    </div>
  );
}
