import React from 'react'
import { Sparkles, Scissors, Flame, Droplet, Star, Zap, Activity } from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  price: string
  priceValue: number
  offer?: string
  icon: React.ReactNode
  description: string
  benefits: string[]
  details?: string[]
}

interface ServicesProps {
  onSelectService: (serviceId: string) => void
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const servicesList: ServiceItem[] = [
    {
      id: 'hair-transplant',
      title: 'Hair Transplant',
      subtitle: 'Restore Your Confidence',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: '50% OFF',
      icon: <Scissors size={28} />,
      description: 'Advanced surgical procedures to move healthy hair follicles to balding areas of the head, designed for both men and women.',
      benefits: [
        'Natural looking hairline & permanent results',
        'Safe and effective with minimal downtime',
        'Performed by clinical transplant experts'
      ],
      details: [
        'FUE Hair Transplant: Advanced technique for natural looking results',
        'FUE Sapphire Method: Sapphire blade ensures precision & faster recovery',
        'FUE Chinez Method: Specialized technique for higher graft survival'
      ]
    },
    {
      id: 'carbon-peel',
      title: 'Carbon Peel Laser',
      subtitle: 'The Hollywood Peel',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: 'Popular',
      icon: <Flame size={28} />,
      description: 'A state-of-the-art laser skin treatment that purifies and rejuvenates. It draws out impurities and firms the skin.',
      benefits: [
        'Carbon Purification (draws out deep impurities)',
        'Pore Tightening (reduces large pore sizes)',
        'Collagen Boost (firming & anti-aging benefits)',
        'Deep Rejuvenation (evens skin tone and texture)'
      ],
      details: [
        'Phase 1: Medical-grade Carbon Paste Application',
        'Phase 2: Laser Activated Exfoliation',
        'Phase 3: Final Flawless Glowing Result'
      ]
    },
    {
      id: 'hair-prp',
      title: 'Hair PRP',
      subtitle: 'Platelets Rich Plasma',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: '50% OFF',
      icon: <Activity size={28} />,
      description: 'Advanced hair growth stimulation treatment that triggers follicular regeneration using your own plasma.',
      benefits: [
        'Advanced PRP enriched with Biotin',
        'Suitable for both male and female patients',
        'Limited offer with guaranteed higher density'
      ]
    },
    {
      id: 'skin-prp',
      title: 'Skin PRP (Scan PRP)',
      subtitle: 'Cellular Skin Rejuvenation',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: '50% OFF',
      icon: <Sparkles size={28} />,
      description: 'Advanced facial skin regeneration using concentrated growth factor plasma, often called the Vampire Facial.',
      benefits: [
        'Accelerates collagen and elastin production',
        'Smoothes fine lines, wrinkles and acne scars',
        'Restores a natural glowing and youthful complexion'
      ]
    },
    {
      id: 'whitening-drips',
      title: 'Whitening Drips',
      subtitle: 'Intravenous Glutathione',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: 'Best Price',
      icon: <Droplet size={28} />,
      description: 'Premium intravenous glutathione and vitamin cocktail for absolute body brightening and rejuvenation.',
      benefits: [
        'Provides sun protection and anti-aging benefits',
        'Ensures even skin tone and total brightening',
        'Provides deep body detoxification'
      ]
    },
    {
      id: 'hydra-facial',
      title: 'Hydra Facial',
      subtitle: 'Deep Hydration & Glow',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: 'Essentails',
      icon: <Star size={28} />,
      description: 'A multi-step treatment that cleanses, exfoliates, extracts, and hydrates the skin using specialized vacuum technology.',
      benefits: [
        'Instant skin hydration and glow',
        'Removes blackheads and extracts sebum safely',
        'Perfect pre-event skin pick-me-up'
      ]
    },
    {
      id: 'scan-laser',
      title: 'Scan Laser Treatment',
      subtitle: 'Skin Resurfacing & Hair Removal',
      price: 'Price on Consultation',
      priceValue: 0,
      offer: 'Premium',
      icon: <Zap size={28} />,
      description: 'Advanced fractional laser skin scanning for targeting pigmentation, hair removal, and resurfacing.',
      benefits: [
        'Highly targeted treatment with pinpoint accuracy',
        'Stimulates deep dermal repair processes',
        'Safe and effective on various skin types'
      ]
    }
  ]

  return (
    <section id="services" style={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Premium Treatments</span>
          <div className="section-title-wrapper">
            <h2 className="section-title">Our Specialized Services</h2>
          </div>
          <p style={styles.headerText}>
            We combine medical expertise with cutting-edge aesthetic technology to provide you with safe, professional, and lasting results.
          </p>
        </div>

        <div className="services-grid" style={styles.servicesGrid}>
          {servicesList.map((service) => (
            <div key={service.id} className="luxury-card" style={styles.serviceCard}>
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>
                  {service.icon}
                </div>
                {service.offer && (
                  <span style={styles.offerBadge}>{service.offer}</span>
                )}
              </div>

              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardSubtitle}>{service.subtitle}</p>
              
              <div style={styles.priceRow}>
                <span style={styles.priceLabel}>Price:</span>
                <span style={styles.priceValue}>{service.price}</span>
              </div>

              <p style={styles.cardDesc}>{service.description}</p>

              {/* Benefits list */}
              <div style={styles.listSection}>
                <h4 style={styles.listTitle}>Key Benefits:</h4>
                <ul style={styles.list}>
                  {service.benefits.map((benefit, index) => (
                    <li key={index} style={styles.listItem}>
                      <span style={styles.bullet}>✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Special Techniques/Methods for advanced services */}
              {service.details && (
                <div style={styles.detailsSection}>
                  <h4 style={styles.listTitle}>Procedure Details:</h4>
                  <ul style={styles.list}>
                    {service.details.map((detail, index) => (
                      <li key={index} style={styles.detailItem}>
                        <span style={styles.detailDot}></span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                className="btn btn-primary" 
                style={styles.bookBtn} 
                onClick={() => onSelectService(service.id)}
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0',
    backgroundColor: '#0a0a0c',
    borderBottom: '1px solid #1e1e24',
  },
  headerText: {
    maxWidth: '650px',
    margin: '10px auto 0',
    color: '#a0a0b0',
    fontSize: '1rem',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
  },
  serviceCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '30px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  iconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    background: 'rgba(212, 175, 55, 0.08)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d4af37',
  },
  offerBadge: {
    background: 'linear-gradient(135deg, #aa7c11 0%, #d4af37 100%)',
    color: '#000000',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '1.6rem',
    color: '#ffffff',
    marginBottom: '4px',
    fontFamily: "'Playfair Display', serif",
  },
  cardSubtitle: {
    fontSize: '0.85rem',
    color: '#d4af37',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '15px',
    fontWeight: '500',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '10px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    borderLeft: '3px solid #d4af37',
  },
  priceLabel: {
    fontSize: '0.8rem',
    color: '#a0a0b0',
  },
  priceValue: {
    fontSize: '1.05rem',
    color: '#ffffff',
    fontWeight: '600',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: '#a0a0b0',
    marginBottom: '20px',
    lineHeight: '1.5',
    flexGrow: 1,
  },
  listSection: {
    borderTop: '1px solid #1e1e24',
    paddingTop: '20px',
    marginBottom: '20px',
  },
  detailsSection: {
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid rgba(212, 175, 55, 0.1)',
  },
  listTitle: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#ffffff',
    marginBottom: '12px',
    fontWeight: '600',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  bullet: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
  detailItem: {
    fontSize: '0.8rem',
    color: '#d4af37',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    lineHeight: '1.4',
  },
  detailDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#d4af37',
    marginTop: '6px',
    flexShrink: 0,
  },
  bookBtn: {
    width: '100%',
    marginTop: 'auto',
  },
}
