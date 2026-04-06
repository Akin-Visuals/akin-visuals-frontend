'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getGsap } from '@/lib/gsap-cdn';
import { prefersReducedMotion } from '@/lib/animations';

export default function Hero() {
  const t = useTranslations('hero');
  const shaderRef = useRef<HTMLDivElement>(null);
  const [videoActive, setVideoActive] = useState(false);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = shaderRef.current;
    if (!container) return;

    let destroyed = false;
    let cleanup: (() => void) | null = null;

    import('three').then((THREE) => {
      if (destroyed || !container) return;

      const W = container.offsetWidth  || window.innerWidth;
      const H = container.offsetHeight || window.innerHeight;
      const scene    = new THREE.Scene();
      const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(Math.floor(W / 2), Math.floor(H / 2));
      renderer.setPixelRatio(1);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0.55;image-rendering:auto;';
      container.appendChild(renderer.domElement);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime:       { value: 0 },
          iResolution: { value: new THREE.Vector2(W, H) },
        },
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
          uniform float iTime;
          uniform vec2  iResolution;
          #define NUM_OCTAVES 2
          float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 ip = floor(p); vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            return mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y);
          }
          float fbm(vec2 x) {
            float v=0.; float a=0.3;
            vec2 shift=vec2(100);
            mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
            for(int i=0;i<NUM_OCTAVES;i++){v+=a*noise(x);x=rot*x*2.+shift;a*=0.4;}
            return v;
          }
          void main() {
            vec2 shake = vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
            vec2 p = ((gl_FragCoord.xy + shake*iResolution.xy) - iResolution.xy*0.5) / iResolution.y * mat2(6.,-4.,4.,6.);
            vec2 v;
            vec4 o = vec4(0.);
            float f = 2.0 + fbm(p + vec2(iTime*5.,0.))*0.5;
            for(float i=0.;i<18.;i++){
              v = p + cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.,11.))*3.5
                    + vec2(sin(iTime*3.+i)*0.003, cos(iTime*3.5-i)*0.003);
              float tailNoise = fbm(v+vec2(iTime*0.5,i))*0.3*(1.-(i/18.));
              vec4 col = vec4(
                0.1+0.3*sin(i*0.2+iTime*0.4),
                0.3+0.5*cos(i*0.3+iTime*0.5),
                0.7+0.3*sin(i*0.4+iTime*0.3),
                1.0
              );
              float thin = smoothstep(0.,1.,i/18.)*0.6;
              o += col * exp(sin(i*i+iTime*0.8)) / length(max(v,vec2(v.x*f*0.015,v.y*1.5)))
                   * (1.+tailNoise*0.8) * thin;
            }
            o = tanh(pow(o/100., vec4(1.6)));
            gl_FragColor = o * 1.5;
          }
        `,
        transparent: true,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      let frameId: number, running = true, lastT = 0;
      const animate = (ts: number) => {
        if (!running) return;
        frameId = requestAnimationFrame(animate);
        if (ts - lastT < 33) return;
        lastT = ts;
        material.uniforms.iTime.value += 0.033;
        renderer.render(scene, camera);
      };
      animate(0);

      const heroEl = document.getElementById('hero');
      const obs = new IntersectionObserver(entries => {
        running = entries[0].isIntersecting;
        if (running) animate(0);
        else cancelAnimationFrame(frameId);
      }, { threshold: 0.1 });
      if (heroEl) obs.observe(heroEl);

      const onResize = () => {
        const nW = container.offsetWidth;
        const nH = container.offsetHeight;
        renderer.setSize(Math.floor(nW / 2), Math.floor(nH / 2));
        material.uniforms.iResolution.value.set(nW, nH);
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        obs.disconnect();
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    });

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const wrap = videoWrapRef.current;
    const hero = document.getElementById('hero');
    if (!wrap || !hero) return;

    const gsap = getGsap();
    if (!gsap) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(wrap, { rotateY: dx * 8, rotateX: -dy * 5, duration: 0.6, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center center' });
    };
    const onMouseLeave = () => gsap.to(wrap, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="section-snap">
      <div ref={shaderRef} className="hero-shader" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left: Text */}
        <div>
          <span id="h-label" className="font-[var(--font-label)] text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-6 block font-semibold">
            {t('label')}
          </span>

          <h1 id="h-title" className="font-[var(--font-headline)] font-bold text-[#e1e2e7] mb-7" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.8rem,5.5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '0.01em' }}>
            {t('titleLine1')}<br />
            <span className="gradient-text">{t('titleHighlight')}</span><br />
            {t('titleLine3')}
          </h1>

          <p id="h-sub" className="text-lg text-[#c6c6cb] max-w-lg mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {t('sub')}
          </p>

          <div id="h-cta" className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#contact" className="btn-primary px-9 py-4 rounded-xl font-bold text-base glow-purple text-center">
              {t('cta1')}
            </a>
            <a href="#work" className="btn-ghost px-9 py-4 rounded-xl font-bold text-base text-center">
              {t('cta2')}
            </a>
          </div>

          <div id="h-stats">
            <p className="text-sm text-[rgba(225,226,231,0.6)] tracking-wide" style={{ fontFamily: 'var(--font-label)' }}>
              {t('trust')}
            </p>
          </div>
        </div>

        {/* Right: Video */}
        <div ref={videoWrapRef} id="h-video-wrap">
          <div className="video-frame-wrap">
            <div className="video-badge">
              <div className="dot" />
              Showreel
            </div>
            {videoActive ? (
              <video autoPlay muted playsInline preload="auto">
                <source src="/brand_assets/31b07c0b00407242cdbc56d56d0327fc_1775314448_puougnxu.mp4" type="video/mp4" />
              </video>
            ) : (
              <button
                onClick={() => setVideoActive(true)}
                className="video-play-btn"
                aria-label="Play showreel"
              >
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="26" fill="rgba(255,255,255,0.12)" />
                  <polygon points="21,17 39,26 21,35" fill="white" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div id="hero-clip" />

      <div id="scroll-hint">
        <span className="text-[10px] text-[rgba(225,226,231,0.3)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-label)' }}>Scroll</span>
        <span className="arrow material-symbols-outlined text-[rgba(225,226,231,0.3)] text-lg">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
