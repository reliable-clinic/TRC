import React, { useState, useRef } from 'react'
import { Eye } from 'lucide-react'

export const BeforeAfter: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50)
  const [activeTab, setActiveTab] = useState<'hair' | 'skin'>('hair')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button dragged
      handleMove(e.clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  return (
    <section id="results" style={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Real Transformations</span>
          <div className="section-title-wrapper">
            <h2 className="section-title">Before & After Results</h2>
          </div>
          <p style={styles.headerText}>
            Slide the divider to see the immediate transformation and premium clinical results of our treatments.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={styles.tabContainer}>
          <button 
            className="before-after-tab-btn"
            style={{...styles.tabBtn, ...(activeTab === 'hair' ? styles.activeTab : {})}}
            onClick={() => { setActiveTab('hair'); setSliderPos(50); }}
          >
            Hair Transplant
          </button>
          <button 
            className="before-after-tab-btn"
            style={{...styles.tabBtn, ...(activeTab === 'skin' ? styles.activeTab : {})}}
            onClick={() => { setActiveTab('skin'); setSliderPos(50); }}
          >
            Carbon Peel / Laser
          </button>
        </div>

        {/* The Split Slider Container */}
        <div 
          ref={containerRef}
          className="before-after-slider"
          style={styles.sliderContainer}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={(e) => handleMove(e.clientX)}
        >
          {activeTab === 'hair' ? (
            <>
              {/* Background: AFTER (Full hair density) */}
              <div style={styles.slideAfter}>
                <div style={{...styles.graphicContainer, ...styles.hairAfter}}>
                  <div style={styles.graphicOverlay}>
                    <h3 style={styles.graphicTitle}>After Treatment</h3>
                    <p style={styles.graphicSubtitle}>Full & Dense Natural Hairline</p>
                  </div>
                </div>
              </div>

              {/* Foreground: BEFORE (Receding/thinning hair) clipped dynamically */}
              <div 
                style={{
                  ...styles.slideBefore,
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <div style={{...styles.graphicContainer, ...styles.hairBefore}}>
                  <div style={styles.graphicOverlay}>
                    <h3 style={styles.graphicTitle}>Before Treatment</h3>
                    <p style={styles.graphicSubtitle}>Receding Hairline & Thinning Crown</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Background: AFTER (Clean skin) */}
              <div style={styles.slideAfter}>
                <div style={{...styles.graphicContainer, ...styles.skinAfter}}>
                  <div style={styles.graphicOverlay}>
                    <h3 style={styles.graphicTitle}>After Carbon Peel</h3>
                    <p style={styles.graphicSubtitle}>Flawless, Smooth & Radiant Glow</p>
                  </div>
                </div>
              </div>

              {/* Foreground: BEFORE (Impure skin) clipped dynamically */}
              <div 
                style={{
                  ...styles.slideBefore,
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }}
              >
                <div style={{...styles.graphicContainer, ...styles.skinBefore}}>
                  <div style={styles.graphicOverlay}>
                    <h3 style={styles.graphicTitle}>Before Carbon Peel</h3>
                    <p style={styles.graphicSubtitle}>Impure Skin, Large Pores & Dull Tone</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Central Handle Bar */}
          <div style={{...styles.handleBar, left: `${sliderPos}%`}}>
            <div style={styles.handleKnob}>
              <Eye size={16} color="#000000" />
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div style={styles.helperText}>
          <span>← Drag to compare Before & After →</span>
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0',
    backgroundColor: '#070708',
    borderBottom: '1px solid #1e1e24',
    userSelect: 'none',
  },
  headerText: {
    maxWidth: '600px',
    margin: '10px auto 0',
    color: '#a0a0b0',
    fontSize: '0.95rem',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '40px',
  },
  tabBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid #2a2a35',
    color: '#a0a0b0',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    border: '1px solid #d4af37',
    color: '#d4af37',
    background: 'rgba(212, 175, 55, 0.05)',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    height: '450px',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #2a2a35',
    cursor: 'ew-resize',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
  },
  slideAfter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  slideBefore: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  graphicContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  graphicOverlay: {
    padding: '30px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
    width: '100%',
  },
  graphicTitle: {
    fontSize: '1.4rem',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '4px',
  },
  graphicSubtitle: {
    fontSize: '0.85rem',
    color: '#d4af37',
  },
  /* Styled CSS Graphics for Hair */
  hairBefore: {
    backgroundImage: "url('assets/hair_before.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  hairAfter: {
    backgroundImage: "url('assets/hair_after.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  /* Styled CSS Graphics for Skin */
  skinBefore: {
    backgroundImage: "url('assets/skin_before.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  skinAfter: {
    backgroundImage: "url('assets/skin_after.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  handleBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#d4af37',
    zIndex: 3,
    transform: 'translateX(-50%)',
    boxShadow: '0 0 10px rgba(212,175,55,0.5)',
  },
  handleKnob: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#d4af37',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 175, 55, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ffffff',
  },
  helperText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b6b7b',
    fontSize: '0.85rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
}
