import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function getGsap() {
  return gsap;
}

export function getScrollTrigger() {
  return ScrollTrigger;
}
