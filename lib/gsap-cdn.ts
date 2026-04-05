import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export function getGsap() {
  return gsap;
}

export function getScrollTrigger() {
  return ScrollTrigger;
}

export function getThree() {
  return THREE;
}
