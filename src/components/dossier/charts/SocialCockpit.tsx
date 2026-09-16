import { CHANNELS, FB, LI, SOCIAL_DERIVED } from '@/content/dossier/social';
import { plNum } from '@/content/dossier/analytics';
import { Term } from '@/components/dossier/Term';
import { INK, SERIES } from './trafficPalette';

const pl1 = (n: number) => n.toLocaleString('pl-PL', { maximumFractionDigits: 1 });

/** Two channels side by side. The gap is the story. */
export function SocialCockpit() {
  const max = Math.max(LI.max, FB.max);
  const rows = [
    { label: 'LinkedIn', color: SERIES.chamber, s: LI, followers: CHANNELS.linkedin.followers },
    { label: 'Facebook', color: SERIES.summit, s: FB, followers: CHANNELS.facebook.followers },
  ];

  return (
    <div className="space-y-5">
      <div className="metrics c4">
        <div className="metric amber">
          <div className="n">{plNum(CHANNELS.linkedin.followers)}</div>
          <div className="l">obserwujących na LinkedIn</div>
        </div>
        <div className="metric">
          <div className="n">{LI.median}</div>
          <div className="l">
            mediana <Term k="reakcja">reakcji</Term> na LinkedIn
          </div>
        </div>
        <div className="metric cyan">
          <div className="n">{FB.median}</div>
          <div className="l">mediana reakcji na Facebooku</div>
        </div>
        <div className="metric">
          <div className="n">{SOCIAL_DERIVED.fbSilentDays}</div>
          <div className="l">dni ciszy na Facebooku</div>
        </div>
      </div>

      <div className="card">
        <h3>Dwa kanały, dwa światy</h3>
        <p>
          Ta sama organizacja, ta sama treść, ten sam okres. Słupki pokazują medianę i
          maksimum reakcji na post w każdym kanale — w tej samej skali.
        </p>

        <div className="mt-5 space-y-5">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-[13px] font-extrabold text-chamber-navy">
                  {r.label}
                  <span className="ml-2 text-[11px] font-bold text-slate-500">
                    {r.followers ? `${plNum(r.followers)} obserwujących` : 'licznik obserwujących ukryty'}
                  </span>
                </span>
                <span className="text-[11px] font-bold tabular-nums text-slate-500">
                  {r.s.posts} postów · {r.s.reactions} reakcji łącznie
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  { k: 'mediana', v: r.s.median },
                  { k: 'maksimum', v: r.s.max },
                ].map((b) => (
                  <div key={b.k} className="flex items-center gap-3">
                    <span className="w-[68px] shrink-0 text-right text-[11px] font-bold text-slate-500">{b.k}</span>
                    <div className="h-3.5 flex-1 overflow-hidden rounded-[4px]" style={{ background: INK.track }}>
                      <div
                        className="h-full rounded-[4px] transition-[width] duration-700"
                        style={{ width: `${Math.max((b.v / max) * 100, 0.8)}%`, background: r.color }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-[12px] font-extrabold tabular-nums text-chamber-navy">
                      {b.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <table className="data" style={{ marginTop: '18px' }}>
          <thead>
            <tr>
              <th>Wskaźnik</th>
              <th>LinkedIn</th>
              <th>Facebook</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Posty w próbie</td>
              <td className="num tabnum">{LI.posts}</td>
              <td className="num tabnum">{FB.posts}</td>
            </tr>
            <tr>
              <td>Mediana reakcji</td>
              <td className="num tabnum">{LI.median}</td>
              <td className="num tabnum">{FB.median}</td>
            </tr>
            <tr>
              <td>Najlepszy post</td>
              <td className="num tabnum">{LI.max}</td>
              <td className="num tabnum">{FB.max}</td>
            </tr>
            <tr>
              <td>Komentarze łącznie</td>
              <td className="num tabnum">{LI.comments}</td>
              <td className="num tabnum">{FB.comments}</td>
            </tr>
            <tr>
              <td>
                <Term k="udostepnienie">Udostępnienia</Term> łącznie
              </td>
              <td className="num tabnum">{LI.shares}</td>
              <td className="num tabnum">{FB.shares}</td>
            </tr>
            <tr>
              <td>Ostatnia publikacja</td>
              <td className="num">
                <span className="pill pos">{SOCIAL_DERIVED.liNewestDays} dzień temu</span>
              </td>
              <td className="num">
                <span className="pill warn">{SOCIAL_DERIVED.fbSilentDays} dni temu</span>
              </td>
            </tr>
            <tr>
              <td>
                <Term k="ER" /> wobec bazy obserwujących
              </td>
              <td className="num tabnum">{LI.er ? `${pl1(LI.er)}%` : '—'}</td>
              <td className="num">nie do policzenia</td>
            </tr>
          </tbody>
        </table>

        <p className="note">
          Mediana postu na LinkedIn jest {pl1(SOCIAL_DERIVED.channelGap)} raza wyższa niż na
          Facebooku. Najlepszy post na Facebooku ({FB.max} reakcje) przegrywa z najsłabszym
          postem na LinkedIn ({LI.min} reakcji).
        </p>
      </div>
    </div>
  );
}
