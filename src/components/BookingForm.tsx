import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Phone, Mail, Award, CheckCircle } from 'lucide-react'

interface BookingFormProps {
  selectedServiceId: string
  onAddBooking: (booking: {
    id: string
    name: string
    phone: string
    email: string
    service: string
    price: number
    date: string
    time: string
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  }) => void
}

const AVAILABLE_SERVICES = [
  { id: 'hair-transplant', name: 'Hair Transplant', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'carbon-peel', name: 'Carbon Peel Laser', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'hair-prp', name: 'Hair PRP', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'skin-prp', name: 'Skin PRP (Scan PRP)', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'whitening-drips', name: 'Whitening Drips', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'hydra-facial', name: 'Hydra Facial', price: 0, displayPrice: 'Price on Consultation' },
  { id: 'scan-laser', name: 'Scan Laser Treatment', price: 0, displayPrice: 'Price on Consultation' },
]

const TIME_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
]

export const BookingForm: React.FC<BookingFormProps> = ({ selectedServiceId, onAddBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceId: 'hair-transplant',
    date: '',
    time: TIME_SLOTS[0],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [lastBooking, setLastBooking] = useState<{
    id: string
    name: string
    phone: string
    service: string
    price: number
    date: string
    time: string
  } | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Sync selected service from parent components
  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: selectedServiceId }))
    }
  }, [selectedServiceId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const parseDateTime = (dateStr: string, timeSlotStr: string): string => {
    try {
      const timePart = timeSlotStr.split(' - ')[0];
      const [time, modifier] = timePart.split(' ');
      let [hoursStr, minutesStr] = time.split(':');
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }

      const hoursFormatted = String(hours).padStart(2, '0');
      const minutesFormatted = String(minutes).padStart(2, '0');
      return `${dateStr}T${hoursFormatted}:${minutesFormatted}:00`;
    } catch (e) {
      return `${dateStr}T12:00:00`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid phone number (e.g. +92 3XX XXXXXXX).')
      return
    }
    if (!formData.date) {
      setErrorMsg('Please select a preferred date.')
      return
    }

    setErrorMsg('')
    
    // Find service price
    const serviceInfo = AVAILABLE_SERVICES.find(s => s.id === formData.serviceId)
    const serviceName = serviceInfo ? serviceInfo.name : 'Aesthetic Consultation'
    const servicePrice = serviceInfo ? serviceInfo.price : 0
    let bookingId = 'TRC-' + Math.floor(1000 + Math.random() * 9000)

    const bookingData = {
      id: bookingId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'no-email@example.com',
      service: serviceName,
      price: servicePrice,
      date: formData.date,
      time: formData.time,
      status: 'Pending' as const
    }

    // Try to sync to the local uvicorn server in the background
    try {
      console.log('Connecting to local server to register online booking...');
      const patSearchRes = await fetch(`http://localhost:5000/api/patients?search=${encodeURIComponent(formData.phone)}`);
      let patientId: number | null = null;
      if (patSearchRes.ok) {
        const matches = await patSearchRes.json();
        if (matches && matches.length > 0) {
          patientId = matches[0].PatientID;
          console.log(`Found existing patient: TRC-${patientId}`);
        }
      }

      if (!patientId) {
        const newPatRes = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            PatientName: formData.name,
            FatherName: 'Online Website Registration',
            Gender: 'Male',
            Age: 25,
            Mobile: formData.phone,
            Address: 'Website Booking Form',
            TreatmentType: serviceName,
            Notes: `Registered online for ${serviceName}. Email: ${formData.email || 'None'}`,
            FollowUpDate: formData.date
          })
        });
        if (newPatRes.ok) {
          const patData = await newPatRes.json();
          patientId = patData.PatientID;
          console.log(`Registered new patient: TRC-${patientId}`);
        }
      }

      if (patientId) {
        const isoDateTime = parseDateTime(formData.date, formData.time);
        const appRes = await fetch('http://localhost:5000/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            PatientID: patientId,
            AppointmentDate: isoDateTime,
            Doctor: 'Dr. Ahsan',
            Status: 'Scheduled'
          })
        });
        if (appRes.ok) {
          const appData = await appRes.json();
          bookingId = `TRC-${appData.AppointmentID || Math.floor(1000 + Math.random() * 9000)}`;
          bookingData.id = bookingId;
          console.log(`Appointment scheduled with ID: ${bookingId}`);
        }
      }
    } catch (netErr) {
      console.warn('Dashboard server offline. Proceeding with offline receipt mode.', netErr);
    }

    // Add booking to global state
    onAddBooking(bookingData)
    setLastBooking(bookingData)
    setIsSubmitted(true)
    
    // Reset form data (except service)
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceId: formData.serviceId,
      date: '',
      time: TIME_SLOTS[0]
    })
  }  // Get current date formatted for min date selector
  const getMinDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Generate WhatsApp Message API URL
  const getWhatsAppReceiptUrl = () => {
    if (!lastBooking) return '#'
    
    const formattedPrice = 'Price on Consultation'
    const textMessage = 
`✨ *TRC AESTHETIC CLINIC* ✨
----------------------------------
*APPOINTMENT INVOICE RECEIPT*

*Receipt ID:* ${lastBooking.id}
*Patient Name:* ${lastBooking.name}
*Phone Number:* ${lastBooking.phone}
*Treatment:* ${lastBooking.service}
*Date:* ${lastBooking.date}
*Time Slot:* ${lastBooking.time}
*Consultation Fee:* ${formattedPrice}

*Location:* Office 103, 1st floor, Touheed Commercial DHA-V, Karachi.
*Hotline:* +92 318 0360483
----------------------------------
_Please show this digital receipt at the clinic desk._`

    return `https://wa.me/923463486925?text=${encodeURIComponent(textMessage)}`
  }

  return (
    <section id="book" style={styles.section}>
      <div className="container booking-container" style={styles.container}>
        
        {/* Left Side: Text and trust seals */}
        <div className="booking-left-col" style={styles.leftCol}>
          <span className="badge-gold">Book Appointment</span>
          <h2 style={styles.heading}>Schedule Your <br /><span className="gold-shine-text">Free Consultation</span></h2>
          <p style={styles.desc}>
            Ready to start your aesthetic journey? Book your session online. Our clinical consultants will contact you within 2 hours to confirm your time slot and walk you through preparation details.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <div style={styles.featureCheck}>✓</div>
              <div>
                <h4 style={styles.featureTitle}>Zero Consultation Charges</h4>
                <p style={styles.featureDesc}>First checkup and skin-laser evaluation are absolutely free.</p>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureCheck}>✓</div>
              <div>
                <h4 style={styles.featureTitle}>Clinical Sanitation Standards</h4>
                <p style={styles.featureDesc}>Fully sanitized operation theaters for FUE and sterile PRP protocols.</p>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureCheck}>✓</div>
              <div>
                <h4 style={styles.featureTitle}>Direct Phone Reservations</h4>
                <p style={styles.featureDesc}>Speak directly with us: +92 318 0360483 or +92 346 3486925.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form card */}
        <div style={styles.rightCol}>
          <div className="luxury-card booking-form-card" style={styles.formCard}>
            
            {isSubmitted && lastBooking ? (
              <div className="animate-fade-in" style={styles.successWrapper}>
                <CheckCircle size={54} color="#d4af37" style={styles.successIcon} />
                <h3 style={styles.successHeading}>Booking Registered!</h3>
                <p style={styles.successText}>
                  Your appointment request is saved. Please save/export your digital invoice receipt:
                </p>
                
                {/* Visual Invoice Receipt Card */}
                <div style={styles.invoiceReceiptCard}>
                  <div style={styles.invoiceHeader}>
                    <span style={styles.invoiceLogo}>TRC</span>
                    <div>
                      <h4 style={styles.invoiceClinicName}>THE RELIABLE</h4>
                      <p style={styles.invoiceClinicTag}>Aesthetic Clinic</p>
                    </div>
                  </div>
                  
                  <div style={styles.invoiceDivider}></div>
                  
                  <div style={styles.invoiceBody}>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Receipt ID:</span><span style={styles.invoiceVal}>{lastBooking.id}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Patient:</span><span style={styles.invoiceVal}>{lastBooking.name}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Phone:</span><span style={styles.invoiceVal}>{lastBooking.phone}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Treatment:</span><span style={styles.invoiceVal}>{lastBooking.service}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Scheduled:</span><span style={styles.invoiceVal}>{lastBooking.date}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Time Slot:</span><span style={styles.invoiceVal}>{lastBooking.time}</span></div>
                    <div style={styles.invoiceRow}><span style={styles.invoiceLabel}>Price:</span><span style={{...styles.invoiceVal, color: '#d4af37', fontWeight: 'bold'}}>Price on Consultation</span></div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '25px', width: '100%' }}>
                  <a 
                    href={getWhatsAppReceiptUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ flex: 1, backgroundColor: '#25D366', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)', color: '#ffffff' }}
                  >
                    Send Receipt to WhatsApp
                  </a>
                  
                  <button 
                    className="btn btn-accent" 
                    style={{ flex: 1 }}
                    onClick={() => setIsSubmitted(false)}
                  >
                    New Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <h3 style={styles.formHeading}>Appointment Details</h3>
                
                {errorMsg && (
                  <div style={styles.errorBanner}>
                    {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    <User size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    <Phone size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="e.g. +923180360483"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="serviceId">
                    <Award size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Select Treatment *
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    className="form-select"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
                  >
                    {AVAILABLE_SERVICES.map((service) => (
                      <option key={service.id} value={service.id} style={{ background: '#1b1b21' }}>
                        {service.name} ({service.displayPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={styles.row}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="date">
                      <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-input"
                      min={getMinDate()}
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="time">
                      <Clock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      Preferred Time Slot *
                    </label>
                    <select
                      id="time"
                      name="time"
                      className="form-select"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      {TIME_SLOTS.map((slot, idx) => (
                        <option key={idx} value={slot} style={{ background: '#1b1b21' }}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
                  Confirm Request
                </button>
              </form>
            )}

          </div>
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
  container: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '60px',
    alignItems: 'center',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '400',
    lineHeight: '1.2',
    marginTop: '15px',
    marginBottom: '20px',
  },
  desc: {
    fontSize: '0.95rem',
    color: '#a0a0b0',
    lineHeight: '1.6',
    marginBottom: '35px',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  featureItem: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start',
  },
  featureCheck: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    border: '1px solid #d4af37',
    color: '#d4af37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '3px',
  },
  featureTitle: {
    fontSize: '1rem',
    color: '#ffffff',
    marginBottom: '4px',
    fontWeight: '600',
  },
  featureDesc: {
    fontSize: '0.85rem',
    color: '#7b7b8b',
  },
  rightCol: {
    width: '100%',
  },
  formCard: {
    padding: '40px',
    background: '#111114',
  },
  formHeading: {
    fontSize: '1.5rem',
    marginBottom: '25px',
    color: '#ffffff',
    fontFamily: "'Playfair Display', serif",
    borderBottom: '1px solid #2a2a35',
    paddingBottom: '15px',
  },
  row: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  submitBtn: {
    width: '100%',
    padding: '15px',
    marginTop: '15px',
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    color: '#ef4444',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    marginBottom: '20px',
  },
  successWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '30px 10px',
  },
  successIcon: {
    marginBottom: '20px',
  },
  successHeading: {
    fontSize: '1.8rem',
    color: '#ffffff',
    marginBottom: '15px',
    fontFamily: "'Playfair Display', serif",
  },
  successText: {
    fontSize: '0.95rem',
    color: '#a0a0b0',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  successSummary: {
    background: 'rgba(212, 175, 55, 0.05)',
    border: '1px solid rgba(212, 175, 55, 0.2)',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#d4af37',
    maxWidth: '320px',
    lineHeight: '1.4',
  },
  invoiceReceiptCard: {
    width: '100%',
    background: '#070708',
    border: '1px dashed rgba(212, 175, 55, 0.4)',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '20px',
    textAlign: 'left',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
  },
  invoiceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px'
  },
  invoiceLogo: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#d4af37',
    border: '1.5px solid #d4af37',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Playfair Display', serif"
  },
  invoiceClinicName: {
    fontSize: '0.9rem',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '1px'
  },
  invoiceClinicTag: {
    fontSize: '0.6rem',
    color: '#d4af37',
    margin: 0,
    textTransform: 'uppercase'
  },
  invoiceDivider: {
    height: '1px',
    backgroundColor: '#2a2a35',
    margin: '15px 0'
  },
  invoiceBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  invoiceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem'
  },
  invoiceLabel: {
    color: '#6b6b7b'
  },
  invoiceVal: {
    color: '#ffffff',
    fontWeight: '500'
  }
}
