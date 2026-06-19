import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn, Play, Pause } from 'lucide-react'

interface SlideItem {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

const CAROUSEL_SLIDES: SlideItem[] = [
  {
    id: 1,
    src: 'assets/result1.jpg',
    alt: 'Hair Transplant Transformation - Day 1 to Final Results',
    title: 'Hair Transplant Transformation',
    description: 'Day 1 markings to successful dense hairline transformation.'
  },
  {
    id: 2,
    src: 'assets/result2.jpg',
    alt: 'Real Results Real Confidence - Hair Transformation',
    title: 'Real Results, Real Confidence',
    description: 'Natural hairline alignment and density restoration.'
  },
  {
    id: 3,
    src: 'assets/result3.jpg',
    alt: 'Hair Restoration - Confidence Restored Naturally',
    title: 'Natural Hair Restoration',
    description: 'Safe and advanced clinical techniques with minimal downtime.'
  },
  {
    id: 4,
    src: 'assets/result4.jpg',
    alt: 'Real Results Real Confidence - Front Hair Transplant',
    title: 'Sleek Aesthetic Alignment',
    description: 'Redefining the crown and frontal hair profile.'
  },
  {
    id: 5,
    src: 'assets/result5.jpg',
    alt: 'Hair Transplant Transformation - 1 Month After Results',
    title: '1-Month Post-Op Progress',
    description: 'Rapid recovery and hair growth results within one month.'
  }
]

export const ResultsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  
  const autoplayTimerRef = useRef<any>(null)

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying && lightboxIndex === null) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext()
      }, 4000)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isPlaying, currentIndex, lightboxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev === null || prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))
  }

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev === null || prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation for slider and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null)
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null || prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null || prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1))
      } else {
        if (e.key === 'ArrowLeft') handlePrev()
        if (e.key === 'ArrowRight') handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <section id="gallery" style={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Transformation Gallery</span>
          <div className="section-title-wrapper">
            <h2 className="section-title">Clinical Success Stories</h2>
          </div>
          <p style={styles.headerText}>
            Explore some of our real patient flyers and aesthetic outcomes. Click on any flyer to expand to full size.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          style={styles.carouselContainer}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Slide Track */}
          <div style={styles.slidesWindow}>
            <div 
              style={{
                ...styles.slidesTrack,
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <div key={slide.id} style={styles.slideFrame}>
                  <div className="carousel-card" style={styles.imageCard} onClick={() => setLightboxIndex(idx)}>
                    <img 
                      src={slide.src} 
                      alt={slide.alt} 
                      style={styles.slideImage} 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="carousel-hover-overlay" style={styles.hoverOverlay}>
                      <ZoomIn size={36} color="#d4af37" className="zoom-icon" style={styles.zoomIcon} />
                      <span style={styles.zoomText}>Click to Enlarge</span>
                    </div>

                    {/* Image Footer info */}
                    <div style={styles.slideInfoPanel}>
                      <h4 style={styles.slideTitle}>{slide.title}</h4>
                      <p style={styles.slideDesc}>{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            style={{ ...styles.navButton, left: '20px' }}
            aria-label="Previous Slide"
            className="carousel-nav-btn"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={handleNext}
            style={{ ...styles.navButton, right: '20px' }}
            aria-label="Next Slide"
            className="carousel-nav-btn"
          >
            <ChevronRight size={24} />
          </button>

          {/* Floating Autoplay Indicator */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={styles.playPauseToggle}
            title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={styles.dotsContainer}>
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              style={{
                ...styles.dot,
                backgroundColor: currentIndex === idx ? '#d4af37' : 'rgba(255, 255, 255, 0.2)',
                width: currentIndex === idx ? '24px' : '8px'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div 
          style={styles.lightboxOverlay} 
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)} 
            style={styles.lightboxClose}
            aria-label="Close Preview"
          >
            <X size={28} />
          </button>

          {/* Lightbox Navigation - Left */}
          <button 
            onClick={handleLightboxPrev} 
            style={{ ...styles.lightboxNav, left: '20px' }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image Container */}
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={CAROUSEL_SLIDES[lightboxIndex].src} 
              alt={CAROUSEL_SLIDES[lightboxIndex].alt} 
              style={styles.lightboxImage} 
            />
            <div style={styles.lightboxCaption}>
              <h3 style={styles.lightboxTitle}>{CAROUSEL_SLIDES[lightboxIndex].title}</h3>
              <p style={styles.lightboxDesc}>{CAROUSEL_SLIDES[lightboxIndex].description}</p>
            </div>
          </div>

          {/* Lightbox Navigation - Right */}
          <button 
            onClick={handleLightboxNext} 
            style={{ ...styles.lightboxNav, right: '20px' }}
            aria-label="Next Image"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0',
    backgroundColor: '#0c0c0e',
    borderBottom: '1px solid #1e1e24',
    position: 'relative'
  },
  headerText: {
    maxWidth: '600px',
    margin: '10px auto 0',
    color: '#a0a0b0',
    fontSize: '0.95rem'
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: '750px',
    margin: '0 auto',
    borderRadius: '20px',
    border: '1px solid rgba(212, 175, 55, 0.25)',
    boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.08)',
    overflow: 'hidden',
    backgroundColor: '#121215'
  },
  slidesWindow: {
    width: '100%',
    overflow: 'hidden'
  },
  slidesTrack: {
    display: 'flex',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%'
  },
  slideFrame: {
    minWidth: '100%',
    width: '100%',
    padding: '15px',
    boxSizing: 'border-box'
  },
  imageCard: {
    position: 'relative',
    borderRadius: '14px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#070708',
    aspectRatio: '1 / 1', // Perfect square to show the flyers nicely
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Preserve full aspect ratio of flyers without cropping
    transition: 'transform 0.5s ease'
  },
  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 7, 8, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 4
  },
  zoomIcon: {
    marginBottom: '10px',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  zoomText: {
    color: '#ffffff',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #d4af37',
    paddingBottom: '2px'
  },
  slideInfoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px 20px 15px',
    background: 'linear-gradient(to top, rgba(7,7,8,0.95) 0%, rgba(7,7,8,0.8) 60%, rgba(7,7,8,0) 100%)',
    zIndex: 3
  },
  slideTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#ffffff',
    fontSize: '1.25rem',
    marginBottom: '4px',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  },
  slideDesc: {
    color: '#d4af37',
    fontSize: '0.85rem',
    fontWeight: '500',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'rgba(18, 18, 21, 0.8)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    color: '#d4af37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
  },
  playPauseToggle: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(18, 18, 21, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 5,
    transition: 'all 0.2s ease'
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '25px'
  },
  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  lightboxOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(4, 4, 5, 0.96)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '20px',
    animation: 'fadeIn 0.25s ease'
  },
  lightboxClose: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    color: '#ffffff',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 10001
  },
  lightboxNav: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    opacity: 0.6,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    zIndex: 10001
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '75vh',
    objectFit: 'contain',
    borderRadius: '10px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.15)',
    border: '1px solid rgba(212, 175, 55, 0.3)'
  },
  lightboxCaption: {
    marginTop: '15px',
    textAlign: 'center',
    maxWidth: '600px'
  },
  lightboxTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#ffffff',
    fontSize: '1.4rem',
    marginBottom: '4px'
  },
  lightboxDesc: {
    color: '#d4af37',
    fontSize: '0.9rem'
  }
}
