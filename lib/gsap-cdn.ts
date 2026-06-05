import type gsap from 'gsap';

type GsapType = typeof gsap;

let _gsap: GsapType | null = null;
let _loading: Promise<void> | null = null;

async function _load(): Promise<void> {
  const [{ default: g }, { ScrollTrigger: ST }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  g.registerPlugin(ST);
  _gsap = g;
}

export function loadGsap(): Promise<void> {
  if (!_loading) _loading = _load();
  return _loading;
}

export function getGsap(): GsapType | null { return _gsap; }
