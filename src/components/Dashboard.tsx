import React, { useState } from 'react'
import { 
  Users, DollarSign, Calendar, TrendingUp, PlusCircle, 
  LogOut, Lock, ShieldAlert 
} from 'lucide-react'

export interface Booking {
  id: string
  name: string
  phone: string
  email: string
  service: string
  price: number
  date: string
  time: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
}

interface DashboardProps {
  bookings: Booking[]
  onUpdateStatus: (id: string, status: Booking['status']) => void
  onDeleteBooking: (id: string) => void
  onAddManualWalkin: (walkin: {
    name: string
    phone: string
    service: string
    price: number
    date: string
  }) => void
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  bookings, onAddManualWalkin 
}) => {
  // Passcode Protection state
  const [passcode, setPasscode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authError, setAuthError] = useState('')



  // Manual Walk-in form state
  const [walkinName, setWalkinName] = useState('')
  const [walkinPhone, setWalkinPhone] = useState('')
  const [walkinService, setWalkinService] = useState('Whitening Drips')
  const [walkinPrice, setWalkinPrice] = useState(4000)
  const [walkinSuccessMsg, setWalkinSuccessMsg] = useState('')

  // Handle Passcode verification
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '1234' || passcode.toLowerCase() === 'admin') {
      setIsAuthorized(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect passcode. Try "1234" or "admin".')
    }
  }

  // Calculate Metrics
  const totalBookingsCount = bookings.length
  const completedBookings = bookings.filter(b => b.status === 'Completed')
  
  // Total Revenue (Only completed count towards revenue)
  const totalRevenue = completedBookings.reduce((sum, b) => sum + b.price, 0)
    
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length
  const confirmedBookingsCount = bookings.filter(b => b.status === 'Confirmed').length
  
  // Get Today's date string in format YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0]
  
  const todayBookings = bookings.filter(b => b.date === todayStr)
  const todayRevenue = todayBookings
    .filter(b => b.status === 'Completed')
    .reduce((sum, b) => sum + b.price, 0)



  // Handle manual walk-in submit
  const handleWalkinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!walkinName.trim() || !walkinPhone.trim()) {
      alert('Please fill out Name and Phone number.')
      return
    }
    
    onAddManualWalkin({
      name: walkinName + ' (Walk-in)',
      phone: walkinPhone,
      service: walkinService,
      price: walkinPrice,
      date: todayStr
    })

    setWalkinName('')
    setWalkinPhone('')
    setWalkinSuccessMsg('Walk-in logged & transaction completed!')
    setTimeout(() => setWalkinSuccessMsg(''), 4000)
  }



  // Pre-configured services list for dropdown
  const servicesCatalog = [
    { name: 'Hair Transplant', price: 80000 },
    { name: 'Carbon Peel Laser', price: 4500 },
    { name: 'Hair PRP', price: 5000 },
    { name: 'Skin PRP (Scan PRP)', price: 5000 },
    { name: 'Whitening Drips', price: 4000 },
    { name: 'Hydra Facial', price: 3500 },
    { name: 'Scan Laser Treatment', price: 6000 }
  ]

  // Handle service selection change to update price automatically
  const handleWalkinServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setWalkinService(selected)
    const match = servicesCatalog.find(s => s.name === selected)
    if (match) {
      setWalkinPrice(match.price)
    }
  }

  // If not authorized, display Lock Screen
  if (!isAuthorized) {
    return (
      <section style={styles.lockScreenSection}>
        <div className="luxury-card" style={styles.lockCard}>
          <div style={styles.lockHeader}>
            <div style={styles.lockIconCircle}>
              <Lock size={32} color="#d4af37" />
            </div>
            <h2 style={styles.lockTitle}>TRC Portal Security</h2>
            <p style={styles.lockSubtitle}>Enter owner passcode to access booking details and financial ledgers.</p>
          </div>

          <form onSubmit={handleAuth} style={styles.lockForm}>
            {authError && (
              <div style={styles.errorText}>
                <ShieldAlert size={14} style={{ marginRight: '6px' }} />
                {authError}
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="passcode">Owner Passcode</label>
              <input 
                type="password" 
                id="passcode"
                className="form-input" 
                placeholder="••••"
                style={styles.passcodeInput}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Verify & Unlock
            </button>
          </form>
          <div style={styles.hint}>
            <span>Hint: Use passcode <strong>1234</strong> or <strong>admin</strong></span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.dashboardSection}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={styles.dashHeader}>
          <div>
            <span className="badge-gold">Owner Portal</span>
            <h1 style={styles.dashTitle}>Clinic Management Dashboard</h1>
            <p style={styles.dashSubtitle}>Real-time customer metrics, appointment queues, and service revenue ledger.</p>
          </div>
          <button className="btn btn-accent" onClick={() => setIsAuthorized(false)} style={styles.logoutBtn}>
            <LogOut size={16} />
            Lock Portal
          </button>
        </div>

        {/* METRICS ROW */}
        <div style={styles.metricsGrid}>
          <div className="luxury-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Today's Earnings</span>
              <DollarSign size={20} color="#d4af37" />
            </div>
            <div style={styles.metricValue}>Rs. {todayRevenue.toLocaleString()}</div>
            <div style={styles.metricSubtext}>Completed today</div>
          </div>

          <div className="luxury-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Today's Bookings</span>
              <Calendar size={20} color="#3b82f6" />
            </div>
            <div style={styles.metricValue}>{todayBookings.length}</div>
            <div style={styles.metricSubtext}>{todayBookings.filter(b=>b.status==='Pending').length} Pending review</div>
          </div>

          <div className="luxury-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Total Earnings</span>
              <TrendingUp size={20} color="#10b981" />
            </div>
            <div style={styles.metricValue}>Rs. {totalRevenue.toLocaleString()}</div>
            <div style={styles.metricSubtext}>All completed services</div>
          </div>

          <div className="luxury-card" style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Total Appointments</span>
              <Users size={20} color="#a0a0b0" />
            </div>
            <div style={styles.metricValue}>{totalBookingsCount}</div>
            <div style={styles.metricSubtext}>
              {pendingBookingsCount} Pending | {confirmedBookingsCount} Confirmed
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LEDGER AND CHARTS */}
        <div style={styles.middleSection}>
          
          {/* Daily Ledger - Walk-ins logger */}
          <div className="luxury-card" style={styles.ledgerCard}>
            <h3 style={styles.cardHeading}>Log Walk-in Transaction</h3>
            <p style={styles.cardSubheading}>Instantly add cash bookings and direct clinic walk-ins to update revenue counts.</p>
            
            {walkinSuccessMsg && (
              <div style={styles.successBanner}>
                {walkinSuccessMsg}
              </div>
            )}

            <form onSubmit={handleWalkinSubmit} style={styles.ledgerForm}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Customer name"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="e.g. +92 3XX XXXXXXX"
                  value={walkinPhone}
                  onChange={(e) => setWalkinPhone(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Service Rendered</label>
                  <select 
                    className="form-select"
                    value={walkinService}
                    onChange={handleWalkinServiceChange}
                  >
                    {servicesCatalog.map((s, idx) => (
                      <option key={idx} value={s.name} style={{ background: '#1b1b21' }}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Fee Charged (Rs.)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={walkinPrice}
                    onChange={(e) => setWalkinPrice(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                <PlusCircle size={16} style={{ marginRight: '6px' }} />
                Complete Transaction
              </button>
            </form>
          </div>

          {/* SVG Analytical Charts */}
          <div className="luxury-card" style={styles.chartCard}>
            <h3 style={styles.cardHeading}>Aesthetic Revenue Trends</h3>
            <p style={styles.cardSubheading}>Visual representation of service collections by therapy sector (completed items).</p>

            {/* Custom SVG Bar Chart */}
            <div style={styles.chartContainer}>
              <svg viewBox="0 0 400 200" style={styles.svgChart}>
                {/* Horizontal Guide Lines */}
                <line x1="40" y1="30" x2="380" y2="30" stroke="#2a2a35" strokeDasharray="4 4" />
                <line x1="40" y1="80" x2="380" y2="80" stroke="#2a2a35" strokeDasharray="4 4" />
                <line x1="40" y1="130" x2="380" y2="130" stroke="#2a2a35" strokeDasharray="4 4" />
                <line x1="40" y1="180" x2="380" y2="180" stroke="#555566" />

                {/* Y Axis text Labels */}
                <text x="32" y="35" fill="#6b6b7b" fontSize="9" textAnchor="end">80K</text>
                <text x="32" y="85" fill="#6b6b7b" fontSize="9" textAnchor="end">40K</text>
                <text x="32" y="135" fill="#6b6b7b" fontSize="9" textAnchor="end">10K</text>
                <text x="32" y="183" fill="#6b6b7b" fontSize="9" textAnchor="end">0</text>

                {/* Columns: Hair Transplant, Carbon Peel, PRP, Whitening Drips, Facials */}
                {/* Hair Transplant Bar (80k) */}
                <rect x="70" y="30" width="30" height="150" fill="url(#goldGrad)" rx="3" />
                <text x="85" y="195" fill="#a0a0b0" fontSize="9" textAnchor="middle">Transplant</text>

                {/* Carbon Peel (4.5k) scale up visually for view */}
                <rect x="140" y="160" width="30" height="20" fill="#d4af37" rx="3" />
                <text x="155" y="195" fill="#a0a0b0" fontSize="9" textAnchor="middle">Laser</text>

                {/* PRP (5k) */}
                <rect x="210" y="157" width="30" height="23" fill="url(#goldGrad)" rx="3" />
                <text x="225" y="195" fill="#a0a0b0" fontSize="9" textAnchor="middle">PRP</text>

                {/* Whitening Drips (4k) */}
                <rect x="280" y="162" width="30" height="18" fill="#d4af37" rx="3" />
                <text x="295" y="195" fill="#a0a0b0" fontSize="9" textAnchor="middle">Drips</text>

                {/* Hydra Facial (3.5k) */}
                <rect x="340" y="165" width="30" height="15" fill="rgba(212,175,55,0.4)" rx="3" />
                <text x="355" y="195" fill="#a0a0b0" fontSize="9" textAnchor="middle">Facial</text>

                {/* Definitions for Gradients */}
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f3e5ab" />
                    <stop offset="100%" stopColor="#aa7c11" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div style={styles.chartLegend}>
              <span style={styles.legendItem}><span style={{...styles.legendDot, backgroundColor: '#d4af37'}}></span>Premium Laser/Drips</span>
              <span style={styles.legendItem}><span style={{...styles.legendDot, backgroundColor: '#f3e5ab'}}></span>Hair Restorations</span>
            </div>
          </div>
          </div>

      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  lockScreenSection: {
    padding: '120px 20px',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070708',
  },
  lockCard: {
    maxWidth: '450px',
    width: '100%',
    padding: '40px',
    textAlign: 'center',
    background: '#111114',
  },
  lockHeader: {
    marginBottom: '30px',
  },
  lockIconCircle: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  lockTitle: {
    fontSize: '1.6rem',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '8px',
  },
  lockSubtitle: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    lineHeight: '1.4',
  },
  lockForm: {
    textAlign: 'left',
  },
  errorText: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    marginBottom: '20px',
  },
  passcodeInput: {
    fontSize: '1.4rem',
    letterSpacing: '8px',
    textAlign: 'center',
  },
  hint: {
    marginTop: '25px',
    fontSize: '0.75rem',
    color: '#6b6b7b',
  },
  dashboardSection: {
    padding: '120px 0 80px',
    backgroundColor: '#070708',
    minHeight: '90vh',
  },
  dashHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #1e1e24',
    paddingBottom: '30px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  dashTitle: {
    fontSize: '2.5rem',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '5px',
  },
  dashSubtitle: {
    fontSize: '0.95rem',
    color: '#a0a0b0',
  },
  logoutBtn: {
    fontSize: '0.8rem',
    padding: '10px 18px',
    gap: '6px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  metricCard: {
    padding: '24px',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  metricTitle: {
    fontSize: '0.85rem',
    color: '#a0a0b0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '4px',
  },
  metricSubtext: {
    fontSize: '0.75rem',
    color: '#6b6b7b',
  },
  middleSection: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr',
    gap: '30px',
    marginBottom: '40px',
  },
  ledgerCard: {
    background: '#111114',
  },
  cardHeading: {
    fontSize: '1.3rem',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    marginBottom: '4px',
  },
  cardSubheading: {
    fontSize: '0.8rem',
    color: '#6b6b7b',
    marginBottom: '20px',
  },
  ledgerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formRow: {
    display: 'flex',
    gap: '15px',
  },
  successBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid #10b981',
    color: '#10b981',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    textAlign: 'center',
    marginBottom: '15px',
  },
  chartCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  chartContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  },
  svgChart: {
    width: '100%',
    maxHeight: '220px',
  },
  chartLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    borderTop: '1px solid #1e1e24',
    paddingTop: '15px',
    marginTop: '10px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: '#a0a0b0',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  tableToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  toolbarActions: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    minWidth: '240px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b6b7b',
  },
  searchInput: {
    backgroundColor: '#1b1b21',
    border: '1px solid #2a2a35',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '10px 12px 10px 36px',
    fontSize: '0.85rem',
    width: '100%',
    outline: 'none',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterLabel: {
    fontSize: '0.8rem',
    color: '#a0a0b0',
  },
  filterSelect: {
    backgroundColor: '#1b1b21',
    border: '1px solid #2a2a35',
    color: '#ffffff',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '0.85rem',
    outline: 'none',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.8rem',
    padding: '2px 4px',
    textTransform: 'uppercase',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b6b7b',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.2s',
  },
  reminderBtn: {
    backgroundColor: '#25D366',
    border: 'none',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.75rem',
    transition: 'all 0.2s',
  },
}
/* Hover styles using inline js helper */
styles.deleteBtn = {
  ...styles.deleteBtn,
  ':hover': {
    color: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  }
} as any

styles.reminderBtn = {
  ...styles.reminderBtn,
  ':hover': {
    opacity: 0.9,
    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.4)'
  }
} as any
