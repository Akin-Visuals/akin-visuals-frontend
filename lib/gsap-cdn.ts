import type gsap from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

type GsapType = typeof gsap;
type ScrollTriggerType = typeof ScrollTrigger;

let _gsap: GsapType | null = null;
let _st: ScrollTriggerType | null = null;
let _loading: Promise<void> | null = null;

async function _load(): Promise<void> {
  const [{ default: g }, { ScrollTrigger: ST }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  g.registerPlugin(ST);
  _gsap = g;
  _st = ST;
}

export function loadGsap(): Promise<void> {
  if (!_loading) _loading = _load();
  return _loading;
}

export function getGsap(): GsapType | null { return _gsap; }
export function getScrollTrigger(): ScrollTriggerType | null { return _st; }
