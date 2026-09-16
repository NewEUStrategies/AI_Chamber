import { Camera } from 'lucide-react';
import { INK, STATUS, pl } from '@/components/marketing/palette';
import { BarRows, StatTile } from '@/components/marketing/primitives';
import { artifactByKey } from '@/content/conference/artifacts';
import { GALLERY, SHOT_PLAN } from '@/content/conference/assets';
import type { Shot } from '@/content/conference/types';
import { FORMATS, LINKEDIN_POSTS } from '@/content/dossier/social';
import { GateList, Panel } from '../primitives';
import { MEDIUM_COLOR } from '../tokens';

const ARTIFACT = artifactByKey('zdjecia');
const FILL = MEDIUM_COLOR.foto;

const RATIO_CLASS: Record<Shot['ratio'], string> = {
  '16:9': 'aspect-[16/9]',
  '3:2': 'aspect-[3/2]',
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
};

/** The one post from the summit the reconnaissance found, with its age. */
const SUMMIT_POST = LINKEDIN_POSTS.find((p) => p.title.includes('CEE AI Summit in Prague'));
/** Read date is 16 September 2026; the summit was 3 September. */
const OBSERVED_DELAY = SUMMIT_POST ? 13 - SUMMIT_POST.ageDays : null;

const must = SHOT_PLAN.filter((s) => s.priority === 'obowiązkowe').length;
const sameDay = SHOT_PLAN.filter((s) => s.slaMin !== null).length;

/**
 * The photographs.
 *
 * Two visualisations, neither of them a picture of a picture. The first is the
 * shot list drawn as a contact sheet — ten frames at their real proportions,
 * each with the minutes it has to be out — because a signing frame that nobody
 * planned is a snapshot, and the plan is the artefact here. The second is the
 * argument: reaction medians by format, read off the twenty-seven archived
 * LinkedIn posts, with the one format that wins carrying the only colour.
 */
export function PhotosTab() {
  const rows = FORMATS.map((f) => ({
    label: f.label,
    value: Number(f.mean.toFixed(1)),
    /* Emphasis, not a categorical scale: one format is the point, the rest are
       the context that makes it a point. */
    color: f.key === 'zdjecia' ? FILL : 'rgba(41, 50, 119, 0.24)',
    detail: [
      { label: 'postów', value: String(f.posts) },
      { label: 'komentarzy', value: String(f.comments) },
      { label: 'udostępnień', value: String(f.shares) },
    ],
    note: f.key === 'zdjecia' ? 'Dwa posty na dwadzieścia siedem. Najwyższy wynik kanału.' : undefined,
  }));

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Kadrów w planie zdjęciowym" value={String(SHOT_PLAN.length)} sub={`${must} obowiązkowych, ${sameDay} z terminem w dniu zero`} accent={FILL} />
        <StatTile label="Minut na pierwsze zdjęcie z sali" value="60" sub="od otwarcia drzwi; zdjęcie podpisu ma 30" accent={FILL} />
        <StatTile label="Plików w galerii" value={String(GALLERY.files)} sub={`otagowane, do pobrania w ${GALLERY.due}`} />
        <StatTile
          label="Dni do relacji po edycji 2026"
          value={OBSERVED_DELAY !== null ? `T+${OBSERVED_DELAY}` : 'nieznane'}
          sub={`przy progu ${ARTIFACT.dueShort === '60 min' ? 'T+1' : ARTIFACT.dueShort} — materiał był, zabrakło tempa`}
          tone="bad"
        />
      </div>

      <Panel
        kicker="Arkusz stykowy"
        title="Dziesięć kadrów, każdy z własnym terminem"
        lead={
          <>
            Ramki mają rzeczywiste proporcje kadru — pion 4:5 idzie do pakietu amplifikacyjnego, panorama
            16:9 na stronę i do mediów. Lista istnieje po to, żeby fotograf nie rozstrzygał w trakcie, co
            jest ważne.
          </>
        }
        note={
          <>
            <b className="text-slate-600">Moment podpisu to kadr ustawiony.</b> Deklaracja podpisana przez
            dziewięć państw jest gotowym materiałem prasowym, ale tylko wtedy, gdy ktoś wcześniej ustawił
            ujęcie: pióro, dokument, flagi, twarze widoczne. Zrobiony z ręki z trzeciego rzędu jest
            pamiątką, nie dowodem.
          </>
        }
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SHOT_PLAN.map((s) => {
            const urgent = s.slaMin !== null && s.slaMin <= 30;
            return (
              <li key={s.id} className="rounded-[10px] border border-slate-200 p-2.5">
                {/* A frame, not a photograph: the slot is the data. */}
                <div
                  className={`relative flex items-center justify-center rounded-[6px] border border-dashed border-slate-300 ${
                    RATIO_CLASS[s.ratio]
                  }`}
                  style={{ background: INK.track }}
                >
                  <Camera aria-hidden className="h-5 w-5 text-slate-300" />
                  <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-white/85 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-slate-400">
                    {s.ratio}
                  </span>
                  <span
                    className="absolute bottom-1.5 right-1.5 rounded-[4px] px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-white"
                    style={{ background: urgent ? STATUS.brak.fill : FILL }}
                  >
                    {s.slaLabel}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] font-extrabold leading-snug text-chamber-navy">{s.label}</p>
                <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {s.moment} · {s.priority}
                </p>
                <p className="mt-1 text-[11.5px] leading-[1.55] text-slate-600">{s.composition}</p>
                <p className="mt-1.5 border-t border-slate-100 pt-1.5 text-[10.5px] font-semibold leading-snug text-slate-400">
                  zasila: {s.feeds.join(' · ')}
                </p>
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          kicker="Dowód"
          title="Dlaczego fotograf, a nie kolejna grafika"
          lead={
            <>
              Średnia reakcji na post według formatu, odczytana z dwudziestu siedmiu zarchiwizowanych
              publikacji LinkedIna. Jeden format ma kolor, bo o jeden format tu chodzi — reszta jest tłem,
              które nadaje mu sens.
            </>
          }
          note={
            <>
              Najczęściej produkowany format kanału — pojedyncza grafika — wypada w tym zestawieniu
              przedostatnio, a stanowi dwanaście z dwudziestu siedmiu publikacji. Zdjęcia z wydarzeń
              stanowią dwa i wygrywają{' '}
              <b className="text-slate-600">
                {pl((FORMATS[0].mean / FORMATS[FORMATS.length - 1].mean) || 0)}-krotnie
              </b>{' '}
              nad ostatnim. To jest cały argument za fotografem na każdym wydarzeniu.
            </>
          }
        >
          <BarRows data={rows} color={FILL} unit=" reakcji" labelWidth={148} tableCols={['Format', 'Średnia reakcji']} />
        </Panel>

        <div className="space-y-5">
          <Panel
            kicker="Co pokazało rozpoznanie"
            title="Materiał był. Zabrakło tempa."
            lead="To jedyna rodzina materiału, której po edycji 2026 widać ślad — i dlatego jedyna, o której da się powiedzieć coś twardego."
          >
            <div className="space-y-3">
              {SUMMIT_POST && (
                <div className="rounded-[10px] border border-slate-200 px-3.5 py-3">
                  <p className="text-[12.5px] font-bold leading-snug text-chamber-navy">{SUMMIT_POST.title}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    <span style={{ color: FILL }}>{SUMMIT_POST.reactions} reakcji</span>
                    <span>{SUMMIT_POST.comments} komentarzy</span>
                    {OBSERVED_DELAY !== null && <span style={{ color: STATUS.brak.fill }}>publikacja ok. T+{OBSERVED_DELAY}</span>}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[1.6] text-slate-600">{SUMMIT_POST.note}</p>
                </div>
              )}
              <p className="text-[12.5px] leading-[1.7] text-slate-600">
                Najmocniejszy post w całej próbie przy medianie kanału na poziomie czternastu reakcji — i
                jednocześnie jedyny ślad szczytu po jego zakończeniu. Wyszedł około szóstego dnia po
                wydarzeniu, przy progu mówiącym o pierwszym zdjęciu w godzinę i pełnej galerii nazajutrz.
                Facebook przemilczał szczyt w całości, w trakcie czterdziestojednodniowej ciszy.
              </p>
              <p className="text-[12.5px] leading-[1.7] text-slate-600">
                Wniosek nie brzmi „róbcie lepsze zdjęcia”. Zdjęcia były dobre — wygrały kanał. Brakowało
                trzeciej roli na miejscu: kogoś, kto w dniu zero nie robi nic poza publikowaniem.
              </p>
            </div>
          </Panel>

          <Panel kicker="Warunki" title="Próg publikacji">
            <GateList items={ARTIFACT.gate} title="" />
          </Panel>
        </div>
      </div>
    </div>
  );
}
