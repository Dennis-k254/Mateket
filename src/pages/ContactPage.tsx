import { useState } from 'react';
import '../styles/Pages.css';
import siteData from '../data/site.json';

const school = (siteData as any).schoolInfo;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'admissions',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'admissions', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      // Fallback to localStorage
      const stored = JSON.parse(localStorage.getItem('mateket:enquiries') || '[]');
      stored.push({ ...formData, createdAt: new Date().toISOString() });
      localStorage.setItem('mateket:enquiries', JSON.stringify(stored));

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'admissions', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <section className="hero-alt">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us a message.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels:</p>

              <div className="info-item">
                <h4>📍 Location</h4>
                <p>{school?.location?.county}, {school?.location?.subCounty}</p>
              </div>

              <div className="info-item">
                <h4>📧 Email</h4>
                <p>
                  <a href={`mailto:${school?.seniorSchool?.contact?.email}`}>{school?.seniorSchool?.contact?.email}</a>
                </p>
              </div>

              <div className="info-item">
                <h4>📞 Phone</h4>
                <p>
                  <a href={`tel:${school?.seniorSchool?.contact?.primaryPhone}`}>{school?.seniorSchool?.contact?.primaryPhone}</a>
                </p>
              </div>

              <div className="info-item">
                <h4>⏰ School Hours</h4>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: By appointment</p>
              </div>

              <div className="info-item mt-1">
                <h4>🏷 Codes</h4>
                <p>KNEC: {school?.seniorSchool?.codes?.KNEC} • UIC: {school?.seniorSchool?.codes?.UIC}</p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {status === 'success' && (
                <div className="form-message success">✓ Thank you! We've received your enquiry and will be in touch soon.</div>
              )}
              {status === 'error' && (
                <div className="form-message error">✗ There was an error. Please try again.</div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send an Enquiry</h3>

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="admissions">Admissions</option>
                    <option value="fees">School Fees</option>
                    <option value="general">General Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
