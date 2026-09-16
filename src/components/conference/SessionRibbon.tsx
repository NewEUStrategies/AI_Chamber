import { ChartTip } from '@/components/dossier/charts/ChartTip';
import { useChartTip } from '@/components/dossier/charts/useChartTip';
import { MARK } from '@/components/marketing/palette';
import { CHAPTERS, RECORDING, SESSIONS, timecode } from '@/content/conference/event';
import { MEDIUM_COLOR, ribbonPos } from './tokens';

/**
 * The recording as one proportional strip.
 *
 * Six segments, sized by their real length, in a single hue: the ribbon is
 * contiguous and left-to-right, so position already says which session came
 * first — stepping colour along it as well would spend a scale on information
 * the shape carries for free. What separates the segments is two pixels of
 * surface, which is what separates every stacked fill in this codebase.
 *
 * The hairlines inside each segment are the chapter marks. They are the
 * difference between a five-hour block nobody can cite and eighteen addressable
 * moments, so the picture shows them rather than counting them in a caption.
 */
export function SessionRibbon({
  height = 34,
  selected = null,
  onSelect,
  showChapters = true,
}: {
  height?: number;
  selected?: string | null;
  onSelect?: (key: string) => void;
  showChapters?: boolean;
}) {
  const tip = useChartTip();
  const fill = MEDIUM_COLOR.wideo;

  return (
    <div>
      <div className="flex w-full" style={{ height, gap: MARK.surfaceGap }} role="group" aria-label="Sesje nagrania">
        {SESSIONS.map((s) => {
          const on = selected === s.key;
          const rows = [
            { label: 'czas', value: `${timecode(s.start)} – ${timecode(s.start + s.minutes)}`, color: fill },
            { label: 'długość', value: `${s.minutes} min` },
            { label: 'język', value: s.lang.toUpperCase() },
            { label: 'rozdziałów', value: String(CHAPTERS.filter((c) => c.session === s.key).length) },
            { label: 'skład', value: s.confirmed ? 'z zapowiedzi' : 'szkielet produkcyjny' },
          ];
          const Tag = onSelect ? 'button' : 'div';
          return (
            <Tag
              key={s.key}
              {...(onSelect
                ? { type: 'button' as const, onClick: () => onSelect(s.key), 'aria-pressed': on }
                : { role: 'img' })}
              tabIndex={0}
              aria-label={`Sesja ${s.no}: ${s.title}, ${s.minutes} minut`}
              className="relative overflow-hidden rounded-[4px] outline-none transition-opacity"
              style={{
                width: `${(s.minutes / RECORDING.minutes) * 100}%`,
                background: fill,
                opacity: selected && !on ? 0.34 : 1,
              }}
              onPointerEnter={(e) => tip.show(e, rows, `Sesja ${s.no} — ${s.title}`, s.yield)}
              onFocus={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                tip.show(
                  { clientX: r.left + r.width / 2, clientY: r.top },
                  rows,
                  `Sesja ${s.no} — ${s.title}`,
                  s.yield
                );
              }}
              onPointerLeave={tip.hide}
              onBlur={tip.hide}
            >
              {showChapters &&
                CHAPTERS.filter((c) => c.session === s.key && c.at > s.start).map((c) => (
                  <span
                    key={c.at}
                    aria-hidden
                    className="absolute inset-y-0 w-px bg-white/45"
                    style={{ left: `${((c.at - s.start) / s.minutes) * 100}%` }}
                  />
                ))}
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-extrabold text-white/90">
                S{s.no}
              </span>
            </Tag>
          );
        })}
      </div>

      {/* Axis under the strip: the stream clock, at the session boundaries. */}
      <div className="relative mt-1 h-[13px]">
        {SESSIONS.map((s) => (
          <span
            key={s.key}
            className="absolute top-0 font-mono text-[9.5px] font-bold text-slate-400"
            style={{ left: `${ribbonPos(s.start)}%` }}
          >
            {timecode(s.start)}
          </span>
        ))}
        <span className="absolute right-0 top-0 font-mono text-[9.5px] font-bold text-slate-400">
          {timecode(RECORDING.minutes)}
        </span>
      </div>

      <ChartTip tip={tip.tip} />
    </div>
  );
}
