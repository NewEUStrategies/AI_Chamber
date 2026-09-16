import { useEffect, useRef } from 'react';

const GAP = 10;
const EDGE = 8;
const ARROW_MIN = 12;
const MOBILE = '(max-width: 1023px)';

/**
 * Tooltips (`.term .tt`) are position:fixed in CSS so no scroll container
 * (tables, cards) can ever clip them. This hook pins each tooltip to the
 * viewport on hover and keyboard focus: above the term, below it when
 * there is no room, and always clamped inside the window.
 */
export function useTermTooltipPositioning() {
  const active = useRef<{ term: HTMLElement; tt: HTMLElement } | null>(null);

  useEffect(() => {
    const place = (tt: HTMLElement, term: HTMLElement) => {
      if (window.matchMedia(MOBILE).matches) {
        tt.style.left = '';
        tt.style.top = '';
        tt.classList.remove('below');
        return;
      }
      const r = term.getBoundingClientRect();
      tt.classList.toggle('below', r.top < tt.offsetHeight + GAP + EDGE);
      const w = tt.offsetWidth;
      const h = tt.offsetHeight;
      const x = Math.min(Math.max(r.left + r.width / 2 - w / 2, EDGE), window.innerWidth - w - EDGE);
      const y = tt.classList.contains('below') ? r.bottom + GAP : r.top - h - GAP;
      tt.style.left = `${Math.round(x)}px`;
      tt.style.top = `${Math.round(y)}px`;
      tt.style.setProperty(
        '--ax',
        `${Math.round(Math.min(Math.max(r.left + r.width / 2 - x, ARROW_MIN), w - ARROW_MIN))}px`
      );
    };

    const onOver = (e: Event) => {
      const term = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.term');
      if (!term) return;
      const tt = term.querySelector<HTMLElement>(':scope > .tt');
      if (!tt) return;
      place(tt, term);
      active.current = { term, tt };
    };

    const onOut = (e: Event) => {
      const current = active.current;
      if (!current) return;
      const to = e instanceof MouseEvent || e instanceof FocusEvent ? (e.relatedTarget as Node | null) : null;
      if (to && current.term.contains(to)) return;
      active.current = null;
    };

    const reposition = () => {
      if (active.current) place(active.current.tt, active.current.term);
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('focusin', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('focusout', onOut);
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('focusin', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('focusout', onOut);
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, []);
}
