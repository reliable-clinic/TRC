import React from 'react'
import { Calendar, Phone, MessageSquare, Award, Shield, Users } from 'lucide-react'
import { VideoBackground } from './VideoBackground.tsx'

interface HeroProps {
  onBookNowClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onBookNowClick }) => {
  return (
    <section className="hero-section" style={styles.hero}>
      {/* Decorative Gold Radial Glow */}
      <div style={styles.radialGlow}></div>

      {/* Looping Clinical Treatment Video Background */}
      <VideoBackground />

      <div className="container hero-container" style={styles.container}>
        <div className="hero-content" style={styles.content}>
          <div className="animate-fade-in" style={styles.badgeWrapper}>
            <span className="badge-gold">DHA Phase 5, Karachi</span>
          </div>

          <h1 className="animate-fade-in" style={styles.title}>
            Restore Your Hair,<br />
            <span className="gold-shine-text">Restore Your Confidence</span>
          </h1>

          <p className="animate-fade-in" style={styles.subtitle}>
            TRC - The Reliable Aesthetic Clinic is Karachi's premier destination for advanced hair restoration, Platelets Rich Plasma, whitening drips, and state-of-the-art laser treatments. Under expert medical guidance, experience natural and permanent results.
          </p>

          {/* Quick Key Benefits Grid */}
          <div className="hero-stats-grid" style={styles.statsGrid}>
            <div style={styles.statCard}>
              <Award style={styles.statIcon} size={24} />
              <div>
                <h4 style={styles.statLabel}>Expert Doctors</h4>
                <p style={styles.statDesc}>Certified Surgeons</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <Shield style={styles.statIcon} size={24} />
              <div>
                <h4 style={styles.statLabel}>50% Off Offers</h4>
                <p style={styles.statDesc}>Limited Time Discounts</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <Users style={styles.statIcon} size={24} />
              <div>
                <h4 style={styles.statLabel}>Guaranteed Results</h4>
                <p style={styles.statDesc}>Permanent Solutions</p>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="hero-btn-group" style={styles.btnGroup}>
            <button className="btn btn-primary" onClick={onBookNowClick}>
              <Calendar size={18} />
              Book Free Consultation
            </button>
            
            <a href="tel:+923180360483" className="btn btn-secondary">
              <Phone size={18} />
              Call Specialist
            </a>
            
            <a 
              href="https://wa.me/923463486925?text=Hi,%20I%20want%20to%20book%20a%20consultation%20with%20TRC%20Aesthetic%20Clinic." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-accent"
              style={styles.whatsappBtn}
            >
              <MessageSquare size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Feature Visual Card - Glowing logo & highlight */}
        <div className="animate-fade-in hero-visual-wrapper" style={styles.visualWrapper}>
          <div style={styles.glowingFrame}>
            <div style={styles.logoCircle}>
              <span style={styles.logoLogo}>TRC</span>
              <span style={styles.logoDivider}></span>
              <span style={styles.logoBrand}>THE RELIABLE</span>
              <span style={styles.logoTagline}>AESTHETIC CLINIC</span>
            </div>
            
            <div style={styles.bannerInfo}>
              <span style={styles.discountBadge}>50% OFF</span>
              <p style={styles.bannerText}>Special discounts on Advanced FUE Hair Transplant and PRP treatments. Book today!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: 'relative',
    padding: '120px 0 80px',
    backgroundColor: '#070708',
    overflow: 'hidden',
    borderBottom: '1px solid #1e1e24',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
  },
  radialGlow: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(0,0,0,0) 70%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '50px',
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  badgeWrapper: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '3.6rem',
    fontWeight: '300',
    color: '#ffffff',
    lineHeight: '1.15',
    marginBottom: '25px',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#a0a0b0',
    marginBottom: '35px',
    maxWidth: '620px',
    lineHeight: '1.7',
  },
  statsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '40px',
    width: '100%',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '15px 20px',
    flex: '1 1 200px',
  },
  statIcon: {
    color: '#d4af37',
  },
  statLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '2px',
  },
  statDesc: {
    fontSize: '0.8rem',
    color: '#7b7b8b',
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  whatsappBtn: {
    borderColor: '#25D366',
    color: '#25D366',
  },
  visualWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowingFrame: {
    background: 'linear-gradient(145deg, #121215, #08080a)',
    border: '1px solid rgba(212, 175, 55, 0.25)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(212, 175, 55, 0.05)',
    borderRadius: '24px',
    padding: '50px 30px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  logoCircle: {
    border: '2px solid #d4af37',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '30px',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 80%)',
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.15)',
  },
  logoLogo: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#d4af37',
    letterSpacing: '3px',
    fontFamily: "'Playfair Display', serif",
  },
  logoDivider: {
    width: '60px',
    height: '1px',
    backgroundColor: '#d4af37',
    margin: '8px 0',
  },
  logoBrand: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#ffffff',
  },
  logoTagline: {
    fontSize: '0.65rem',
    letterSpacing: '1px',
    color: '#d4af37',
    marginTop: '3px',
  },
  bannerInfo: {
    background: 'rgba(212, 175, 55, 0.08)',
    border: '1px dashed rgba(212, 175, 55, 0.3)',
    borderRadius: '12px',
    padding: '15px 20px',
    width: '100%',
  },
  discountBadge: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#d4af37',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '5px',
  },
  bannerText: {
    fontSize: '0.8rem',
    color: '#a0a0b0',
    lineHeight: '1.4',
  },
}
