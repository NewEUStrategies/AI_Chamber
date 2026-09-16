import { ANCHORS, DOMAIN_HEALTH, SEO_DERIVED, TOP_BACKLINKS } from '@/content/dossier/seo';
import { plNum } from '@/content/dossier/analytics';
import { Term } from '@/components/dossier/Term';
import { SERIES, plPct } from './trafficPalette';

const KIND_LABEL: Record<string, { label: string; cls: string }> = {
  spam: { label: 'reklama sprzedawcy linków', cls: 'pill warn' },
  brand: { label: 'nazwa organizacji', cls: 'pill pos' },
  editorial: { label: 'cytat redakcyjny', cls: 'pill cyan' },
  empty: { label: 'brak tekstu', cls: 'pill' },
};

/** What the anchor texts pointing at the domain actually say. */
export function AnchorProfile() {
  const other = DOMAIN_HEALTH.backlinks - SEO_DERIVED.spamBacklinks - SEO_DERIVED.brandBacklinks;
  const segments = [
    { label: 'reklamy sprzedawców linków', value: SEO_DERIVED.spamBacklinks, color: '#b45309' },
    { label: 'nazwa organizacji', value: SEO_DERIVED.brandBacklinks, color: SERIES.summit },
    { label: 'pozostałe', value: other, color: 'rgba(41,50,119,0.18)' },
  ];

  return (
    <div className="space-y-5">
      <div className="card">
        <h3>
          Z czego składa się profil <Term k="anchor">anchorów</Term>
        </h3>
        <p>
          Anchor to widoczny tekst, w który wpisany jest odnośnik. Wyszukiwarka traktuje go jako opis
          strony docelowej — dlatego to, co mówią anchory, jest ważniejsze niż to, ile ich jest.
        </p>

        <div className="mt-5 flex h-5 gap-[2px] overflow-hidden rounded-full">
          {segments.map((s) => (
            <span
              key={s.label}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ width: `${(s.value / DOMAIN_HEALTH.backlinks) * 100}%`, background: s.color }}
              title={`${s.label}: ${plNum(s.value)}`}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {segments.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-2 text-xs text-slate-600">
              <i className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              {s.label}
              <b className="font-extrabold tabular-nums text-chamber-navy">
                {plNum(s.value)} · {plPct(Number(((s.value / DOMAIN_HEALTH.backlinks) * 100).toFixed(1)))}
              </b>
            </span>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="data">
            <thead>
              <tr>
                <th>Anchor</th>
                <th>Linki</th>
                <th>Domeny</th>
                <th>Pierwszy raz</th>
                <th>Ostatnio</th>
                <th>Rodzaj</th>
              </tr>
            </thead>
            <tbody>
              {ANCHORS.map((a) => (
                <tr key={a.text}>
                  <td style={{ maxWidth: '320px' }}>{a.text}</td>
                  <td className="num tabnum">{plNum(a.backlinks)}</td>
                  <td className="num tabnum">{plNum(a.domains)}</td>
                  <td className="num tabnum">{a.firstSeen}</td>
                  <td className="num tabnum">{a.lastSeen}</td>
                  <td className="num">
                    <span className={KIND_LABEL[a.kind].cls}>{KIND_LABEL[a.kind].label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Pięć pierwszych pozycji to ogłoszenia kanałów Telegram handlujących linkami. Razem{' '}
          {plNum(SEO_DERIVED.spamBacklinks)} linków, czyli {plPct(SEO_DERIVED.spamShare)} całego
          profilu. Nazwa organizacji pojawia się w {plNum(SEO_DERIVED.brandBacklinks)} linkach z{' '}
          {SEO_DERIVED.brandDomains} domen.
        </p>
      </div>

      <div className="card">
        <h3>Najmocniejsze linki w profilu</h3>
        <p>
          Posortowane według Authority Score strony, z której prowadzi link. To jest realny dorobek
          linkowy izby — powstały redakcyjnie, bez udziału farm.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="data">
            <thead>
              <tr>
                <th>
                  <Term k="Page AS" />
                </th>
                <th>Domena</th>
                <th>Kontekst</th>
                <th>Anchor</th>
                <th>Typ</th>
              </tr>
            </thead>
            <tbody>
              {TOP_BACKLINKS.map((b) => (
                <tr key={`${b.domain}-${b.anchor}-${b.pageAs}`}>
                  <td className="num tabnum" style={{ fontWeight: 800 }}>
                    {b.pageAs}
                  </td>
                  <td>{b.domain}</td>
                  <td style={{ maxWidth: '280px' }}>
                    {b.source}
                    {b.note && <span className="pill cyan" style={{ marginLeft: '8px' }}>{b.note}</span>}
                  </td>
                  <td className="num">{b.anchor}</td>
                  <td className="num">
                    <Term k={b.follow ? 'follow' : 'nofollow'}>
                      <span className={b.follow ? 'pill pos' : 'pill'}>{b.follow ? 'follow' : 'nofollow'}</span>
                    </Term>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Lista obejmuje czternaście najwyżej ocenionych pozycji ze stu wyeksportowanych. Euronews,
          Euractiv, GITEX, FutureLaw i WMF to realne wzmianki branżowe — dokładnie ten rodzaj linków,
          którego potrzeba więcej.
        </p>
      </div>
    </div>
  );
}
