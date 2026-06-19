import React, { useState, useEffect } from 'react'
import { Hero } from './components/Hero.tsx'
import { Services } from './components/Services.tsx'
import { BeforeAfter } from './components/BeforeAfter.tsx'
import { ResultsCarousel } from './components/ResultsCarousel.tsx'
import { BookingForm } from './components/BookingForm.tsx'
import { Dashboard, Booking } from './components/Dashboard.tsx'
import { ContactFooter } from './components/ContactFooter.tsx'
import { Calendar, Phone, ShieldCheck, Landmark } from 'lucide-react'

// Pre-populate with realistic mock database records
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'TRC-9421',
    name: 'Ahmad Khan',
    phone: '+923001234567',
    email: 'ahmad.khan@example.com',
    service: 'Hair Transplant',
    price: 80000,
    date: new Date().toISOString().split('T')[0], // Today
    time: '11:00 AM - 12:00 PM',
    status: 'Completed'
  },
  {
    id: 'TRC-7634',
    name: 'Sania Malik',
    phone: '+923339876543',
    email: 'sania.malik@example.com',
    service: 'Whitening Drips',
    price: 4000,
    date: new Date().toISOString().split('T')[0], // Today
    time: '03:00 PM - 04:00 PM',
    status: 'Completed'
  },
  {
    id: 'TRC-5581',
    name: 'Bilal Siddiqui',
    phone: '+923124567890',
    email: 'bilal.s@example.com',
    service: 'Carbon Peel Laser',
    price: 4500,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    time: '04:00 PM - 05:00 PM',
    status: 'Completed'
  },
  {
    id: 'TRC-1092',
    name: 'Zainab Bibi',
    phone: '+923215551234',
    email: 'zainab.b@example.com',
    service: 'Hair PRP',
    price: 5000,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '12:00 PM - 01:00 PM',
    status: 'Confirmed'
  },
  {
    id: 'TRC-3021',
    name: 'Yasir Ali',
    phone: '+923456781290',
    email: 'yasir.ali@example.com',
    service: 'Hydra Facial',
    price: 3500,
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    time: '02:00 PM - 03:00 PM',
    status: 'Pending'
  },
  {
    id: 'TRC-8812',
    name: 'Hamza Mughal',
    phone: '+923156677889',
    email: 'hamza.m@example.com',
    service: 'Scan Laser Treatment',
    price: 6000,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    time: '05:00 PM - 06:00 PM',
    status: 'Cancelled'
  }
]

// Load initial bookings from localStorage if present, otherwise use defaults
const getSavedBookings = (): Booking[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('trc_bookings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing trc_bookings from localStorage:', e)
      }
    }
  }
  return INITIAL_BOOKINGS
}

export default function App() {
  const [view, setView] = useState<'website' | 'dashboard'>('website')
  const [bookings, setBookings] = useState<Booking[]>(getSavedBookings)
  const [selectedServiceId, setSelectedServiceId] = useState<string>('hair-transplant')

  // Sync bookings to localStorage when modified
  useEffect(() => {
    localStorage.setItem('trc_bookings', JSON.stringify(bookings))
  }, [bookings])

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setView('website')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Handle selected service change and scroll
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId)
    scrollToSection('book')
  }

  // Add booking submission to live state
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev])
  }

  // Update status (e.g., Confirm, Complete, Cancel)
  const handleUpdateStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) => 
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  // Delete booking record from DB
  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }

  // Add manual off-platform walk-in
  const handleAddManualWalkin = (walkin: {
    name: string
    phone: string
    service: string
    price: number
    date: string
  }) => {
    const newRecord: Booking = {
      id: 'TRC-W' + Math.floor(100 + Math.random() * 900),
      name: walkin.name,
      phone: walkin.phone,
      email: 'walkin@thereliableclinic.com',
      service: walkin.service,
      price: walkin.price,
      date: walkin.date,
      time: 'Instant Walk-in',
      status: 'Completed' // Walk-in collections are marked completed instantly
    }
    setBookings((prev) => [newRecord, ...prev])
  }

  // Toggle view between owner dashboard and public website
  const toggleView = () => {
    setView((prev) => (prev === 'website' ? 'dashboard' : 'website'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={styles.appWrapper}>
      
      {/* FIXED PREMIUM NAVIGATION HEADER */}
      <header style={styles.header}>
        <div className="container" style={styles.navContainer}>
          
          {/* Logo brand */}
          <div style={styles.brand} onClick={() => scrollToSection('top')}>
            <span style={styles.brandSymbol}>TRC</span>
            <div style={styles.brandTextGroup}>
              <span style={styles.brandMain}>THE RELIABLE</span>
              <span style={styles.brandSub}>Aesthetic Clinic</span>
            </div>
          </div>

          {/* Navigation Links */}
          {view === 'website' ? (
            <nav style={styles.navLinks}>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} style={styles.link}>Services</a>
              <a href="#results" onClick={(e) => { e.preventDefault(); scrollToSection('results'); }} style={styles.link}>Results</a>
              <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }} style={styles.link}>Gallery</a>
              <a href="#book" onClick={(e) => { e.preventDefault(); scrollToSection('book'); }} style={styles.link}>Book Online</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} style={styles.link}>Contact</a>
            </nav>
          ) : (
            <nav style={styles.navLinks}>
              <span style={styles.adminTitleBadge}>
                <Landmark size={14} style={{ marginRight: '6px' }} />
                Administrative Session Active
              </span>
            </nav>
          )}

          {/* CTA Buttons */}
          <div style={styles.headerActions}>
            {view === 'website' ? (
              <>
                <a href="tel:+923180360483" style={styles.phoneLink}>
                  <Phone size={14} />
                  <span>+92 318 0360483</span>
                </a>
                <button 
                  className="btn btn-primary" 
                  onClick={() => scrollToSection('book')}
                  style={styles.headerBtn}
                >
                  <Calendar size={14} />
                  Book Now
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={toggleView} style={styles.headerBtn}>
                Back to Website
              </button>
            )}

            {/* Quick dashboard access toggle for presentation */}
            <button 
              onClick={toggleView}
              style={styles.adminToggleIcon}
              title={view === 'dashboard' ? 'Go to Website' : 'Go to Admin Dashboard'}
            >
              <ShieldCheck size={20} color={view === 'dashboard' ? '#d4af37' : '#a0a0b0'} />
            </button>
          </div>

        </div>
      </header>

      {/* RENDER ACTIVE VIEW */}
      {view === 'website' ? (
        <main id="top">
          <Hero onBookNowClick={() => scrollToSection('book')} />
          <Services onSelectService={handleSelectService} />
          <BeforeAfter />
          <ResultsCarousel />
          <BookingForm 
            selectedServiceId={selectedServiceId} 
            onAddBooking={handleAddBooking} 
          />
        </main>
      ) : (
        <main>
          <Dashboard 
            bookings={bookings}
            onUpdateStatus={handleUpdateStatus}
            onDeleteBooking={handleDeleteBooking}
            onAddManualWalkin={handleAddManualWalkin}
          />
        </main>
      )}

      {/* GLOBAL FOOTER */}
      <ContactFooter onTogglePortal={toggleView} currentView={view} />

    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  appWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#070708',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(7, 7, 8, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  brandSymbol: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#d4af37',
    border: '1px solid #d4af37',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(0,0,0,0) 85%)',
  },
  brandTextGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandMain: {
    fontSize: '0.95rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#ffffff',
  },
  brandSub: {
    fontSize: '0.65rem',
    color: '#d4af37',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  link: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#a0a0b0',
    letterSpacing: '0.5px',
    transition: 'color 0.2s',
  },
  adminTitleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(212, 175, 55, 0.1)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    color: '#d4af37',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  phoneLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: '#d4af37',
    fontWeight: '600',
  },
  headerBtn: {
    fontSize: '0.75rem',
    padding: '8px 18px',
    gap: '6px',
  },
  adminToggleIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
}

// Hover effects
if (typeof window !== 'undefined') {
  styles.link = {
    ...styles.link,
    ':hover': {
      color: '#d4af37'
    }
  } as any
  styles.adminToggleIcon = {
    ...styles.adminToggleIcon,
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  } as any
}
