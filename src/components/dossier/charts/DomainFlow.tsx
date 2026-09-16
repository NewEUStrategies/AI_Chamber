import {
  CHAMBER_INCOMING,
  CHAMBER_OUTGOING,
  SUMMIT_INCOMING,
  SUMMIT_OUTGOING,
  plNum,
} from '@/content/dossier/analytics';
import { INK, SERIES, plPct } from './trafficPalette';

/**
 * How the two properties link to each other. The chamber sends traffic to the
 * summit; nothing measurable comes back.
 */
export function DomainFlow() {
  return (
    <div className="card p-5 sm:p-7">
      <h3>Przepływ ruchu między domenami</h3>
      <p>
        Izba jest głównym dostawcą ruchu dla summitu. W drugą stronę nie płynie nic, co SimilarWeb
        potrafiłby przypisać.
      </p>

      <svg
        viewBox="0 0 720 240"
        className="mt-5 block h-auto w-full"
        role="img"
        aria-label="Diagram przepływu ruchu: aichamber.eu kieruje 71,14 procent linków wychodzących do ceeaisummit.eu, który czerpie z tego 75,95 procent odesłań przychodzących"
      >
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={SERIES.chamber} />
          </marker>
          <marker id="flow-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={INK.dim} />
          </marker>
        </defs>

        {/* chamber → summit */}
        <path
          d="M215,86 C300,86 340,86 425,86"
          fill="none"
          stroke={SERIES.chamber}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path d="M215,86 C300,86 340,86 420,86" fill="none" stroke={SERIES.chamber} strokeWidth="2" markerEnd="url(#flow-arrow)" />
        <text x="320" y="70" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={INK.strong}>
          71,14% linków wychodzących
        </text>
        <text x="320" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill={INK.muted}>
          = 75,95% odesłań summitu
        </text>

        {/* summit → chamber: nothing measurable */}
        <path
          d="M425,170 C340,170 300,170 220,170"
          fill="none"
          stroke={INK.dim}
          strokeWidth="1.5"
          strokeDasharray="5 5"
          markerEnd="url(#flow-arrow-dim)"
        />
        <text x="322" y="158" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK.muted}>
          brak przypisanego ruchu zwrotnego
        </text>

        {/* nodes */}
        <g>
          <rect x="24" y="52" width="192" height="68" rx="7" fill="#ffffff" stroke={SERIES.chamber} strokeWidth="2" />
          <text x="120" y="80" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK.strong} fontFamily="Manrope, sans-serif">
            aichamber.eu
          </text>
          <text x="120" y="98" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={INK.muted}>
            {plNum(5361)} wizyt
          </text>
        </g>
        <g>
          <rect x="428" y="52" width="192" height="68" rx="7" fill="#ffffff" stroke={SERIES.summit} strokeWidth="2" />
          <text x="524" y="80" textAnchor="middle" fontSize="13" fontWeight="800" fill={INK.strong} fontFamily="Manrope, sans-serif">
            ceeaisummit.eu
          </text>
          <text x="524" y="98" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={INK.muted}>
            {plNum(1871)} wizyt
          </text>
        </g>
        <g>
          <rect x="24" y="142" width="192" height="56" rx="7" fill="#f8fafc" stroke={INK.grid} strokeWidth="1.5" />
          <text x="120" y="166" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK.body}>
            odesłania do izby
          </text>
          <text x="120" y="184" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={INK.muted}>
            100% nieprzypisane
          </text>
        </g>
        <g>
          <rect x="428" y="142" width="192" height="56" rx="7" fill="#f8fafc" stroke={INK.grid} strokeWidth="1.5" />
          <text x="524" y="166" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK.body}>
            oba serwisy wychodzą
          </text>
          <text x="524" y="184" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={INK.muted}>
            na linkedin.com
          </text>
        </g>
      </svg>

      <div className="grid2" style={{ marginTop: '20px' }}>
        <div>
          <div className="matters-title">aichamber.eu</div>
          <table className="data">
            <thead>
              <tr>
                <th>Kierunek</th>
                <th>Domena</th>
                <th>Udział</th>
              </tr>
            </thead>
            <tbody>
              {CHAMBER_INCOMING.map((l) => (
                <tr key={`in-${l.domain}`}>
                  <td>przychodzące</td>
                  <td>{l.domain}</td>
                  <td className="num tabnum">{plPct(l.sharePct)}</td>
                </tr>
              ))}
              {CHAMBER_OUTGOING.map((l) => (
                <tr key={`out-${l.domain}`}>
                  <td>wychodzące</td>
                  <td>{l.domain}</td>
                  <td className="num tabnum">{plPct(l.sharePct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="matters-title">ceeaisummit.eu</div>
          <table className="data">
            <thead>
              <tr>
                <th>Kierunek</th>
                <th>Domena</th>
                <th>Udział</th>
              </tr>
            </thead>
            <tbody>
              {SUMMIT_INCOMING.map((l) => (
                <tr key={`in-${l.domain}`}>
                  <td>przychodzące</td>
                  <td>{l.domain}</td>
                  <td className="num tabnum">{plPct(l.sharePct)}</td>
                </tr>
              ))}
              {SUMMIT_OUTGOING.map((l) => (
                <tr key={`out-${l.domain}`}>
                  <td>wychodzące</td>
                  <td>{l.domain}</td>
                  <td className="num tabnum">{plPct(l.sharePct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="note">
        „Nieprzypisane" to pozycja, której SimilarWeb nie powiązał z konkretną domeną. Brak nazwanego
        źródła odesłań do izby oznacza, że summit nie odsyła mierzalnego ruchu z powrotem.
      </p>
    </div>
  );
}
