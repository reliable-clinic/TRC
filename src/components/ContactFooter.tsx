import React from 'react'
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react'

interface ContactFooterProps {
  onTogglePortal: () => void
  currentView: 'website' | 'dashboard'
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onTogglePortal, currentView }) => {
  return (
    <footer id="contact" style={styles.footer}>
      {/* Upper footer / Contact Info */}
      <div className="container" style={styles.upperGrid}>
        
        {/* Clinic Info Column */}
        <div style={styles.col}>
          <div style={styles.brandContainer}>
            <span style={styles.brandLogo}>TRC</span>
            <div style={styles.brandTexts}>
              <h3 style={styles.brandTitle}>THE RELIABLE</h3>
              <p style={styles.brandTag}>AESTHETIC CLINIC</p>
            </div>
          </div>
          <p style={styles.brandDesc}>
            Karachi's trusted clinic for advanced cosmetic restoration. From hair transplants with Sapphire techniques to radiant carbon skin lasers.
          </p>
          <div style={styles.badges}>
            <span style={styles.badge}>DHA Phase 5 Approved</span>
            <span style={styles.badge}>Sterile FUE Protocols</span>
          </div>
        </div>

        {/* Location & Map info Column */}
        <div style={styles.col}>
          <h4 style={styles.colHeading}>Clinic Address</h4>
          <div style={styles.contactDetails}>
            <div style={styles.contactItem}>
              <MapPin size={22} color="#d4af37" style={{ flexShrink: 0 }} />
              <p style={styles.contactText}>
                Office No: 103, 1st floor,<br />
                27th & 34th Street corner,<br />
                Touheed Commercial, DHA-V, Karachi
              </p>
            </div>
            <div style={styles.contactItem}>
              <Clock size={20} color="#d4af37" style={{ flexShrink: 0 }} />
              <p style={styles.contactText}>
                Mon - Sat: 11:00 AM - 08:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Direct Contacts Column */}
        <div style={styles.col}>
          <h4 style={styles.colHeading}>Direct Booking Hotline</h4>
          <div style={styles.contactDetails}>
            <a href="tel:+923180360483" style={styles.contactLink}>
              <Phone size={18} color="#d4af37" />
              <span>+92 318 0360483 (Booking)</span>
            </a>
            
            <a href="tel:+923463486925" style={styles.contactLink}>
              <Phone size={18} color="#d4af37" />
              <span>+92 346 3486925 (Consultant)</span>
            </a>

            <a href="mailto:info@thereliableclinic.com" style={styles.contactLink}>
              <Mail size={18} color="#d4af37" />
              <span>info@thereliableclinic.com</span>
            </a>
          </div>
        </div>

      </div>

      {/* Google Maps Embed Mock / Location Guide Card */}
      <div className="container" style={{ margin: '40px auto 0' }}>
        <div style={styles.mapCard}>
          <div style={styles.mapHeader}>
            <span style={styles.mapIndicator}></span>
            <span style={styles.mapTitle}>Find Us in DHA Phase 5 Karachi (Touheed Commercial Area)</span>
          </div>
          <div style={styles.mapMock}>
            {/* Visual representation of a dark luxury map */}
            <div style={styles.mapRoad1}>34th Street</div>
            <div style={styles.mapRoad2}>27th Street</div>
            <div style={styles.mapPinPulse}>
              <MapPin size={28} color="#d4af37" />
              <div style={styles.pulseRing}></div>
            </div>
            <div style={styles.mapLabel}>TRC Aesthetic Clinic (1st Floor, Corner 103)</div>
          </div>
        </div>
      </div>

      {/* Lower Footer / Legal & Admin Portal link */}
      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomContainer}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} TRC - The Reliable Aesthetic Clinic. All rights reserved.
          </p>
          
          <div style={styles.adminRow}>
            <span style={styles.devTag}>
              Made with <Heart size={10} color="#d4af37" style={{ display: 'inline', margin: '0 3px' }} /> in Karachi
            </span>
            
            {/* Owner portal toggling trigger */}
            <button 
              onClick={onTogglePortal} 
              style={styles.portalToggleBtn}
              title="Click here to manage clinic dashboard"
            >
              <ShieldCheck size={13} style={{ marginRight: '5px' }} />
              {currentView === 'dashboard' ? 'Back to Website' : 'Owner Portal'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#050506',
    borderTop: '1px solid #1e1e24',
    padding: '80px 0 0',
  },
  upperGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  brandLogo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#d4af37',
    border: '2px solid #d4af37',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Playfair Display', serif",
  },
  brandTexts: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '1px',
    margin: 0,
  },
  brandTag: {
    fontSize: '0.7rem',
    color: '#d4af37',
    letterSpacing: '0.5px',
    margin: 0,
  },
  brandDesc: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  badges: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: '0.7rem',
    color: '#6b6b7b',
    border: '1px solid #2a2a35',
    padding: '4px 10px',
    borderRadius: '4px',
  },
  colHeading: {
    fontSize: '1.1rem',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '25px',
    position: 'relative',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  contactItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  contactText: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    lineHeight: '1.5',
    margin: 0,
  },
  contactLink: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#a0a0b0',
    transition: 'color 0.2s',
  },
  mapCard: {
    background: '#111114',
    border: '1px solid #1e1e24',
    borderRadius: '12px',
    padding: '20px',
    width: '100%',
  },
  mapHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '15px',
  },
  mapIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d4af37',
    display: 'inline-block',
  },
  mapTitle: {
    fontSize: '0.85rem',
    color: '#ffffff',
    fontWeight: '500',
  },
  mapMock: {
    position: 'relative',
    height: '180px',
    backgroundColor: '#09090a',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #2a2a35',
  },
  mapRoad1: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: '24px',
    backgroundColor: '#1b1b21',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    fontSize: '0.7rem',
    color: '#555566',
    fontWeight: 'bold',
  },
  mapRoad2: {
    position: 'absolute',
    left: '40%',
    top: 0,
    bottom: 0,
    width: '28px',
    backgroundColor: '#1b1b21',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'vertical-rl',
    fontSize: '0.7rem',
    color: '#555566',
    fontWeight: 'bold',
  },
  mapPinPulse: {
    position: 'absolute',
    left: '42%',
    top: '30%',
    zIndex: 10,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  pulseRing: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #d4af37',
    animation: 'fadeIn 1.5s infinite ease-out',
    pointerEvents: 'none',
  },
  mapLabel: {
    position: 'absolute',
    left: '46%',
    top: '20%',
    backgroundColor: '#d4af37',
    color: '#000000',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '700',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
  },
  bottomBar: {
    backgroundColor: '#020203',
    borderTop: '1px solid #131318',
    padding: '25px 0',
    marginTop: '60px',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  copyright: {
    fontSize: '0.8rem',
    color: '#6b6b7b',
    margin: 0,
  },
  adminRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  devTag: {
    fontSize: '0.8rem',
    color: '#6b6b7b',
  },
  portalToggleBtn: {
    background: 'none',
    border: 'none',
    color: '#d4af37',
    cursor: 'pointer',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
  },
}

// Add simple hover filter for portal btn
styles.portalToggleBtn = {
  ...styles.portalToggleBtn,
  ':hover': {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  }
} as any
