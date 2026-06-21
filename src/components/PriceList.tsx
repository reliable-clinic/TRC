import React from 'react'
import { Sparkles, Scissors, Syringe, Zap, Award, Star, Gift, ArrowRight } from 'lucide-react'

interface PriceItem {
  name: string
  price: string
  serviceId: string // Maps to the corresponding form option
}

interface PriceCategory {
  title: string
  icon: React.ReactNode
  items: PriceItem[]
}

interface PriceListProps {
  onSelectService: (serviceId: string) => void
}

export const PriceList: React.FC<PriceListProps> = ({ onSelectService }) => {
  const categories: PriceCategory[] = [
    {
      title: 'Facial Treatments',
      icon: <Sparkles size={22} />,
      items: [
        { name: 'Hydra Facial', price: 'RS 3,000', serviceId: 'hydra-facial' },
        { name: 'Glutathione Whitening 12000 mg', price: 'RS 8,000', serviceId: 'whitening-drips' },
        { name: 'BB Glow and Micro Needling', price: 'RS 6,000', serviceId: 'skin-prp' },
        { name: 'PRP Face + Microneedling with Lapudran', price: 'RS 7,000', serviceId: 'skin-prp' },
      ],
    },
    {
      title: 'Hair Treatments',
      icon: <Scissors size={22} />,
      items: [
        { name: 'PRP Hair Platelet Rich Plasma', price: 'RS 4,500', serviceId: 'hair-prp' },
        { name: 'PRP Hair Advance (Mesotherapy)', price: 'RS 7,000', serviceId: 'hair-prp' },
        { name: 'Under Arm Hair Laser & Legs Full', price: 'RS 1,000', serviceId: 'scan-laser' },
        { name: 'Hair Transplant (Clinic)', price: 'RS 80,000', serviceId: 'hair-transplant' },
      ],
    },
    {
      title: 'Injections & Skin Boosters',
      icon: <Syringe size={22} />,
      items: [
        { name: 'PRP Face Platelet Rich Plasma Injectable', price: 'RS 4,000', serviceId: 'skin-prp' },
        { name: 'Lipodrain Injection', price: 'RS 7,000', serviceId: 'skin-prp' },
      ],
    },
    {
      title: 'Laser Treatments',
      icon: <Zap size={22} />,
      items: [
        { name: 'Full Body Laser Male', price: 'RS 25,000', serviceId: 'scan-laser' },
        { name: 'Full Body Laser Female', price: 'RS 20,000', serviceId: 'scan-laser' },
        { name: 'Face Laser', price: 'RS 3,000', serviceId: 'scan-laser' },
        { name: 'Under Arm Hair Laser & Legs Full', price: 'RS 10,000', serviceId: 'scan-laser' },
        { name: 'AC Laser', price: 'RS 3,000', serviceId: 'scan-laser' },
        { name: 'Bikini Laser', price: 'RS 3,000', serviceId: 'scan-laser' },
        { name: 'Under Arm Laser', price: 'RS 6,000', serviceId: 'scan-laser' },
        { name: 'Laser Hair Removal (Shoulder)', price: 'RS 10,000', serviceId: 'scan-laser' },
        { name: 'Laser Hair Removal (Legs - Full)', price: 'RS 10,000', serviceId: 'scan-laser' },
      ],
    },
    {
      title: 'Advanced Treatments',
      icon: <Award size={22} />,
      items: [
        { name: 'PRP Hair Advance (Derma Roller)', price: 'RS 6,000', serviceId: 'hair-prp' },
        { name: 'PRP Hair Advance (Face) with Biotin', price: 'RS 7,000', serviceId: 'hair-prp' },
        { name: 'Advance Hydra Facial 12 in 1 Step', price: 'RS 8,000', serviceId: 'hydra-facial' },
        { name: 'Carbon Peel (FAC Only)', price: 'RS 4,000', serviceId: 'carbon-peel' },
        { name: 'Carbon Peel (Face + Neck)', price: 'RS 5,000', serviceId: 'carbon-peel' },
        { name: 'Hand Foot Whitening', price: 'RS 6,000', serviceId: 'whitening-drips' },
      ],
    },
    {
      title: 'Special Packages',
      icon: <Star size={22} />,
      items: [
        { name: '6 Sessions - Whitening Drip (Miracle White)', price: 'RS 7,000 / sess.', serviceId: 'whitening-drips' },
        { name: '10 Sessions - Whitening Drip (Glutathione 1200 mg)', price: 'RS 8,000 / sess.', serviceId: 'whitening-drips' },
        { name: '6 Sessions - Glutathione Skin Whitening', price: 'RS 6,000 / sess.', serviceId: 'whitening-drips' },
      ],
    },
  ]

  return (
    <section id="pricing" style={styles.section}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Prices & Packages</span>
          <div className="section-title-wrapper">
            <h2 className="section-title">Transparent Price List</h2>
          </div>
          <p style={styles.headerText}>
            Select any treatment below to auto-fill the booking form. No hidden fees. Consultation with our clinical experts is free.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={styles.grid}>
          {categories.map((cat, idx) => (
            <div key={idx} className="luxury-card" style={styles.card}>
              
              {/* Category Title */}
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>
                  {cat.icon}
                </div>
                <h3 style={styles.cardTitle}>{cat.title}</h3>
              </div>

              {/* Items List */}
              <div style={styles.list}>
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={styles.itemRow}
                    onClick={() => onSelectService(item.serviceId)}
                    title={`Click to book ${item.name}`}
                    className="pricing-item-hover"
                  >
                    <div style={styles.itemNameGroup}>
                      <span style={styles.itemDot}></span>
                      <span style={styles.itemName}>{item.name}</span>
                    </div>
                    <span style={styles.itemDots}></span>
                    <span style={styles.itemPrice}>{item.price}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Huge Offer Callout */}
        <div 
          className="luxury-card" 
          style={styles.offerCard}
          onClick={() => onSelectService('hair-transplant')}
        >
          <div style={styles.offerLayout}>
            
            <div style={styles.offerLeft}>
              <div style={styles.giftIconWrapper}>
                <Gift size={28} color="#d4af37" />
              </div>
              <div>
                <span style={styles.offerBadge}>Exclusive Promotion</span>
                <h3 style={styles.offerTitle}>Clinic Hair Transplant</h3>
                <p style={styles.offerDesc}>
                  Avail our premium permanent hair restoration package using sterile sapphire protocols. Fully custom hairline design included.
                </p>
              </div>
            </div>

            <div style={styles.offerRight}>
              <div style={styles.priceContainer}>
                <span style={styles.priceTagLabel}>Special Price</span>
                <span style={styles.priceTagValue}>RS 80,000</span>
              </div>
              <button 
                className="btn btn-primary" 
                style={styles.offerBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectService('hair-transplant')
                }}
              >
                Claim Offer Now
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
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
  },
  headerText: {
    maxWidth: '650px',
    margin: '10px auto 0',
    color: '#a0a0b0',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '30px',
    marginBottom: '40px',
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  iconWrapper: {
    color: '#d4af37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#ffffff',
    margin: 0,
    fontFamily: "'Playfair Display', serif",
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    flexGrow: 1,
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'all 0.2s ease',
  },
  itemNameGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    maxWidth: '75%',
  },
  itemDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#d4af37',
    flexShrink: 0,
  },
  itemName: {
    fontSize: '0.9rem',
    color: '#a0a0b0',
    lineHeight: '1.4',
    transition: 'color 0.2s ease',
  },
  itemDots: {
    flexGrow: 1,
    borderBottom: '1px dotted rgba(255, 255, 255, 0.1)',
    margin: '0 8px',
    height: '1px',
    alignSelf: 'center',
  },
  itemPrice: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease',
  },
  offerCard: {
    marginTop: '40px',
    padding: '30px 40px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    background: 'linear-gradient(135deg, #121215 0%, #171512 100%)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  offerLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '30px',
  },
  offerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flex: '1 1 500px',
  },
  giftIconWrapper: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  offerBadge: {
    display: 'inline-block',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#d4af37',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '6px',
  },
  offerTitle: {
    fontSize: '1.6rem',
    color: '#ffffff',
    margin: '0 0 6px 0',
    fontFamily: "'Playfair Display', serif",
  },
  offerDesc: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    margin: 0,
    lineHeight: '1.5',
  },
  offerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  priceTagLabel: {
    fontSize: '0.75rem',
    color: '#6b6b7b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  priceTagValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#d4af37',
    fontFamily: "'Playfair Display', serif",
  },
  offerBtn: {
    padding: '14px 32px',
  },
}

// Add global styles for pricing item hover states
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
    .pricing-item-hover:hover .itemName {
      color: #ffffff !important;
    }
    .pricing-item-hover:hover .itemPrice {
      color: #d4af37 !important;
    }
    .pricing-item-hover:hover .itemDots {
      border-bottom-color: rgba(212, 175, 55, 0.3) !important;
    }
  `
  document.head.appendChild(styleEl)
}
