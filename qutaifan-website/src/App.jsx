import React from 'react'
import logo from './assets/logo.png'
import './index.css'

function App() {
  return (
    <>
      <nav className="glass-nav">
        <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src={logo} alt="Qutaifan Logo" style={{ height: '40px', width: '40px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.05em' }}>Qutaifan</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Solutions</a>
            <a href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</a>
            <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</a>
          </div>
          <div>
            <a href="https://erp.Qutaifan.com" className="btn btn-primary">Login to CRM</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '10rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#60A5FA',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              ✨ The Future of ERP is Here
            </span>
            <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem' }} className="hero-text">
              Run Your Entire Business.<br />With One Simple Tool.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Qutaifan integrates CRM, HR, and Finance into a single, beautiful interface powered by AI. Experience the clarity of minimalism.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started Free</button>
              <button className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Demo</button>
            </div>
          </div>

          {/* Dashboard Preview / Abstract Visual */}
          <div className="glass" style={{
            marginTop: '5rem',
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0) 100%)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Preview UI</p>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '300px',
              background: '#3B82F6',
              filter: 'blur(150px)',
              opacity: '0.2',
              zIndex: '-1'
            }}></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ background: '#0B1120' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Everything You Need</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Powerful modules designed to work together seamlessly.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <FeatureCard
              icon="📊"
              title="Advanced Analytics"
              desc="Real-time insights into your sales, expenses, and growth metrics."
            />
            <FeatureCard
              icon="🤖"
              title="AI Automation"
              desc="Let AI handle repetitive tasks, lead scoring, and customer follow-ups."
            />
            <FeatureCard
              icon="🔒"
              title="Enterprise Security"
              desc="Bank-grade encryption and secure Cloudflare Tunnel deployment."
            />
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '8rem 0', background: '#0F172A' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Get Started Today</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Leave your details and we'll reach out to discuss your business needs.</p>
          </div>
          <form className="glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            try {
              // This will be connected once the API key is provided
              console.log('Lead data:', data);
              alert('Thank you! We have received your request.');
              e.target.reset();
            } catch (err) {
              alert('Something went wrong. Please try again.');
            }
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Company Name</label>
              <input name="name" type="text" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '8px', color: 'white' }} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
              <input name="email" type="email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '8px', color: 'white' }} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message (Optional)</label>
              <textarea name="message" rows="4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '8px', color: 'white', resize: 'none' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>Send Inquiry</button>
          </form>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <img src={logo} alt="Qutaifan Logo" style={{ height: '32px', marginBottom: '1rem', opacity: '0.8' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>© 2025 Qutaifan Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass" style={{ padding: '2rem', transition: 'transform 0.3s' }}>
    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{desc}</p>
  </div>
)

export default App
