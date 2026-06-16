import React, { useState, useEffect } from 'react';
import './index.css';
import primitives from './data/primitives.json';
import semantic from './data/semantic.json';
import components from './data/components.json';
import logoUrl from './assets/logo.svg';

import dark1 from './assets/screens/Dark Mode 1.png';
import dark2 from './assets/screens/Dark Mode 2.png';
import dark3 from './assets/screens/Dark Mode 3.png';
import light1 from './assets/screens/Light Mode 1.png';
import light2 from './assets/screens/Light Mode 2.png';
import light3 from './assets/screens/Light Mode 3.png';

const resolveTokenValue = (path, obj) => {
  if (!path || typeof path !== 'string') return path;
  const resolved = path.replace(/[{}]/g, '').split('.').reduce((o, i) => o && o[i], obj);
  return resolved ? resolved.$value : path;
};

// --- SLEEK THEME TOGGLE ---
function ThemeToggle({ isDark, toggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}>Theme</span>
      <button onClick={toggle} style={{
        width: '44px', height: '24px', borderRadius: '12px',
        background: isDark ? 'var(--color-brand-insigneo-blue)' : 'var(--border-strong)',
        border: 'none', position: 'relative', cursor: 'pointer',
        transition: 'background 0.3s', padding: 0
      }} aria-label="Toggle Theme">
        <div style={{
          width: '20px', height: '20px', background: '#fff', borderRadius: '50%',
          position: 'absolute', top: '2px', left: '2px',
          transform: `translateX(${isDark ? '20px' : '0'})`,
          transition: 'transform 0.3s var(--easing-spring)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}></div>
      </button>
    </div>
  );
}

// --- 3D PHONE MOCKUP ---
function PhoneMockup({ screen, isDark, angle, zIndex, scale, translateX }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '300px',
      height: '620px',
      transform: `translate(-50%, -50%) translateX(${translateX}) scale(${scale}) rotateY(${angle})`,
      zIndex: zIndex,
      borderRadius: '44px',
      backgroundColor: '#0f172a', // Bezel edge
      boxShadow: `
        0 25px 50px -12px rgba(0, 0, 0, 0.5), 
        inset 0 0 0 2px rgba(255, 255, 255, 0.15), 
        inset 0 0 0 10px #0a0f1c
      `,
      padding: '10px', // Bezel thickness
      display: 'flex',
      justifyContent: 'center',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s var(--easing-spring)'
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute',
        top: '22px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '28px',
        backgroundColor: '#000',
        borderRadius: '20px',
        zIndex: 10
      }}></div>

      {/* Screen Container */}
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: isDark ? '#000' : '#fff',
        borderRadius: '34px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img src={screen} alt="App Screen" style={{ width: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

// --- DEVICE MOCKUP PRESENTATION ---
function DeviceMockupDisplay({ isDark, isMobile }) {
  const screenLeft = isDark ? dark2 : light2;
  const screenCenter = isDark ? dark1 : light1;
  const screenRight = isDark ? dark3 : light3;
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: '800px', height: isMobile ? '320px' : '700px', perspective: '1400px', margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: isMobile ? 'scale(0.5)' : 'none',
      transformOrigin: 'top center',
      marginTop: isMobile ? 'var(--spacing-8)' : 0
    }}>
      <PhoneMockup screen={screenLeft} isDark={isDark} angle="25deg" zIndex={1} scale={0.85} translateX="-240px" />
      <PhoneMockup screen={screenRight} isDark={isDark} angle="-25deg" zIndex={1} scale={0.85} translateX="240px" />
      <PhoneMockup screen={screenCenter} isDark={isDark} angle="0deg" zIndex={2} scale={1.05} translateX="0px" />
    </div>
  );
}

// --- COLOR SWATCH COMPONENT ---
function ColorSwatch({ name, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <div style={{
        background: value,
        borderRadius: 'var(--radius-lg)',
        height: '80px',
        boxShadow: 'inset 0 0 0 1px var(--border-subtle)'
      }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-sm)' }}>{name}</span>
        <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)' }}>{value}</span>
      </div>
    </div>
  );
}

// --- TOKEN RENDERERS ---
function renderColorGroup(title, colorObj, prefix = '') {
  if (!colorObj) return null;
  const entries = Object.entries(colorObj).filter(([k]) => !k.startsWith('$'));
  if (entries.length === 0) return null;

  return (
    <div style={{ marginBottom: 'var(--spacing-12)' }}>
      <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', textTransform: 'capitalize' }}>{title}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--spacing-4)' }}>
        {entries.map(([key, data]) => {
          if (data.$value) {
            return <ColorSwatch key={key} name={`${prefix}${key}`} value={data.$value} />;
          } else {
            // It's a nested group (e.g. status.success)
            return Object.entries(data).filter(([k]) => !k.startsWith('$')).map(([subKey, subData]) => (
               <ColorSwatch key={`${key}-${subKey}`} name={`${key}.${subKey}`} value={subData.$value} />
            ));
          }
        })}
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1024px)').matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleResize = (e) => setIsMobile(e.matches);
    
    // Initial check
    setIsMobile(mediaQuery.matches);
    
    // Listener
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);
  return isMobile;
}

// --- MAIN APP ---
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', color: 'var(--text-primary)',
      background: 'var(--bg-primary)', transition: 'background var(--duration-normal) var(--easing-default), color var(--duration-normal) var(--easing-default)',
    }}>
      
      {/* SIDEBAR */}
      {isMobile && isMenuOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <aside style={{
        width: '280px', position: 'fixed', top: 0, left: isMobile ? (isMenuOpen ? 0 : '-100%') : 0, bottom: 0,
        background: 'var(--surface-default)', borderRight: '1px solid var(--border-subtle)',
        padding: 'var(--spacing-8)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', 
        zIndex: 100, transition: 'left 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <img src={logoUrl} alt="Logo" style={{ height: '24px' }} />
          <div style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-sm)' }}>Design System</div>
        </div>
        <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }} onClick={() => isMobile && setIsMenuOpen(false)}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wider)', marginBottom: 'var(--spacing-2)' }}>Overview</div>
          <a href="#hero" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Introduction</a>
          
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wider)', margin: 'var(--spacing-6) 0 var(--spacing-2)' }}>Primitives</div>
          <a href="#primitive-colors" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Colors</a>
          <a href="#primitive-spacing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Spacing & Sizing</a>
          <a href="#primitive-shadows" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Shadows & Radii</a>
          
          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wider)', margin: 'var(--spacing-6) 0 var(--spacing-2)' }}>Semantics</div>
          <a href="#semantic-colors" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Adaptive Colors</a>
          <a href="#semantic-typography" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Typography Scale</a>

          <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-wider)', margin: 'var(--spacing-6) 0 var(--spacing-2)' }}>Components</div>
          <a href="#components" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)' }}>Component Tokens</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ 
        marginLeft: isMobile ? 0 : '280px', 
        flex: 1, 
        padding: isMobile ? 'var(--spacing-8)' : 'var(--spacing-20) var(--spacing-16)',
        width: isMobile ? '100%' : 'calc(100% - 280px)',
        boxSizing: 'border-box'
      }}>
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <img src={logoUrl} alt="Logo" style={{ height: '24px' }} />
              <div style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-sm)' }}>Design System</div>
            </div>
            <button onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-primary)' }}>
              ☰
            </button>
          </div>
        )}
        
        {/* HERO */}
        <section id="hero" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', marginBottom: isMobile ? 'var(--spacing-16)' : '128px' }}>
          <div style={{ maxWidth: '600px', width: '100%', textAlign: isMobile ? 'center' : 'left', margin: isMobile ? '0 auto var(--spacing-8)' : 0 }}>
            <h1 style={{ fontSize: isMobile ? '40px' : '64px', fontWeight: 'var(--font-weight-bold)', lineHeight: 1, letterSpacing: 'var(--letter-spacing-tighter)', marginBottom: 'var(--spacing-6)' }}>
              Atomic Design<br/>Architecture.
            </h1>
            <p style={{ fontSize: isMobile ? 'var(--font-size-lg)' : 'var(--font-size-xl)', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              The comprehensive UI Kit documenting every primitive, semantic, and component token for the Insigneo ecosystem.
            </p>
          </div>
          <DeviceMockupDisplay isDark={isDark} isMobile={isMobile} />
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: isMobile ? 'var(--spacing-16) 0' : '160px 0' }} />

        {/* --- PRIMITIVES --- */}
        <section id="primitive-colors" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Primitive Colors</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-12)' }}>The core palette. These should never be used directly in components; use Semantic tokens instead.</p>
          
          {Object.entries(primitives.color).filter(([k]) => !k.startsWith('$')).map(([key, data]) => (
            <div key={key}>{renderColorGroup(key, data)}</div>
          ))}
        </section>

        <section id="primitive-spacing" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Spacing & Sizing</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-12)' }}>The foundational grid and measurement system.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--spacing-16)' }}>
            <div>
              <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)' }}>Spacing</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {Object.entries(primitives.spacing).filter(([k]) => !k.startsWith('$')).map(([key, data]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <div style={{ width: '60px', fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>{key}</div>
                    <div style={{ width: '60px', fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{data.$value}</div>
                    <div style={{ height: '24px', width: data.$value, background: 'var(--color-brand-insigneo-blue)', borderRadius: 'var(--radius-xs)', opacity: 0.8 }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)' }}>Sizes & Icon Sizes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {Object.entries(primitives.size).filter(([k]) => !k.startsWith('$')).map(([key, data]) => {
                  if (data.$value) {
                    return (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-2) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div style={{ flex: 1, fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>{key}</div>
                        <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{data.$value}</div>
                      </div>
                    );
                  } else {
                    return Object.entries(data).filter(([k]) => !k.startsWith('$')).map(([subKey, subData]) => (
                      <div key={`${key}-${subKey}`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-2) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div style={{ flex: 1, fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>{key}.{subKey}</div>
                        <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{subData.$value}</div>
                      </div>
                    ));
                  }
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="primitive-shadows" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Shadows & Radii</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'var(--spacing-16)', marginTop: 'var(--spacing-12)' }}>
            <div>
              <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)' }}>Shadows (Elevation)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                {Object.entries(primitives.shadow).filter(([k]) => !k.startsWith('$')).map(([key, data]) => (
                  <div key={key} style={{
                    background: 'var(--surface-default)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-lg)',
                    boxShadow: data.$value, border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 'var(--font-weight-bold)' }}>{key}</span>
                    <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{data.$value.substring(0, 20)}...</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)' }}>Border Radii</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 'var(--spacing-6)' }}>
                {Object.entries(primitives.radius).filter(([k]) => !k.startsWith('$')).map(([key, data]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <div style={{
                      width: '80px', height: '80px', background: 'var(--interactive-default)',
                      borderRadius: data.$value, border: '1px solid var(--border-strong)'
                    }}></div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-sm)' }}>{key}</div>
                      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>{data.$value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: isMobile ? 'var(--spacing-16) 0' : '160px 0' }} />

        {/* --- SEMANTICS --- */}
        <section id="semantic-colors" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Semantic Colors</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-12)' }}>
            These tokens automatically adapt between light and dark modes. Toggle the theme to see them change.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
            {Object.entries(semantic.light.color).filter(([k]) => !k.startsWith('$')).map(([category, tokens]) => (
              <div key={category}>
                <h4 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-6)', textTransform: 'capitalize', borderBottom: '2px solid var(--border-default)', paddingBottom: 'var(--spacing-2)' }}>{category}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
                  {Object.entries(tokens).filter(([k]) => !k.startsWith('$')).map(([key, data]) => {
                    if (data.$value) {
                      return <ColorSwatch key={key} name={key} value={`var(--${category}-${key})`} />;
                    } else {
                      // Nested semantics (like status.success.bg)
                      return Object.entries(data).filter(([k]) => !k.startsWith('$')).map(([subKey, subData]) => (
                        <ColorSwatch key={`${key}-${subKey}`} name={`${key}.${subKey}`} value={`var(--${category}-${key}-${subKey})`} />
                      ));
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="semantic-typography" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Typography Scale</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-12)' }}>The full responsive typography hierarchy.</p>
          
          <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--radius-2xl)', padding: 'var(--spacing-12)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)' }}>
            {Object.entries(semantic.light.typography).filter(([k]) => !k.startsWith('$')).map(([key, data]) => {
              const fs = resolveTokenValue(data.size.$value, primitives);
              const fw = resolveTokenValue(data.weight.$value, primitives);
              const lh = resolveTokenValue(data.lineHeight.$value, primitives);
              const ls = resolveTokenValue(data.letterSpacing.$value, primitives);
              return (
                <div key={key} style={{ paddingBottom: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-4)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-widest)', fontWeight: 'var(--font-weight-bold)' }}>{key}</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: 'var(--text-tertiary)' }}>{fs} / {fw} / {lh}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-family-primary)', fontSize: fs, fontWeight: fw, lineHeight: lh, letterSpacing: ls, color: 'var(--text-primary)' }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: isMobile ? 'var(--spacing-16) 0' : '160px 0' }} />

        {/* --- COMPONENTS --- */}
        <section id="components" style={{ marginBottom: '128px' }}>
          <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-4)' }}>Component Tokens</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-12)' }}>
            Highly specific tokens for individual components, mapped directly from semantics and primitives.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--spacing-8)' }}>
            {Object.entries(components).filter(([k]) => !k.startsWith('$')).map(([compName, compData]) => (
              <div key={compName} style={{ background: 'var(--surface-default)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ background: 'var(--surface-sunken)', padding: 'var(--spacing-6)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', textTransform: 'capitalize' }}>{compName}</h4>
                  {compData.$description && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: 'var(--spacing-2)' }}>{compData.$description}</p>}
                </div>
                <div style={{ padding: 'var(--spacing-6)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
                    <tbody>
                      {Object.entries(compData).filter(([k]) => !k.startsWith('$')).map(([propKey, propData]) => {
                        if (propData.$value) {
                          return (
                            <tr key={propKey} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                              <td style={{ padding: 'var(--spacing-3) 0', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>{propKey}</td>
                              <td style={{ padding: 'var(--spacing-3) 0', fontFamily: 'var(--font-family-mono)', color: 'var(--text-tertiary)', textAlign: 'right' }}>{propData.$value}</td>
                            </tr>
                          );
                        } else {
                          // Variant (like button.primary)
                          return (
                            <React.Fragment key={propKey}>
                              <tr>
                                <td colSpan={2} style={{ padding: 'var(--spacing-6) 0 var(--spacing-2)', fontWeight: 'var(--font-weight-bold)', color: 'var(--text-accent)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)' }}>Variant: {propKey}</td>
                              </tr>
                              {Object.entries(propData).filter(([k]) => !k.startsWith('$')).map(([subKey, subData]) => (
                                <tr key={`${propKey}-${subKey}`} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                  <td style={{ padding: 'var(--spacing-3) 0', paddingLeft: 'var(--spacing-4)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>{subKey}</td>
                                  <td style={{ padding: 'var(--spacing-3) 0', fontFamily: 'var(--font-family-mono)', color: 'var(--text-tertiary)', textAlign: 'right' }}>{subData.$value}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
