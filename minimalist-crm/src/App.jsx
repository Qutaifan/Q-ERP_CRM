import logo from './assets/logo.png'

const Header = () => (
  <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <img src={logo} alt="Qutaifan CRM Logo" style={{ height: '48px', width: '48px', objectFit: 'contain', marginBottom: '0.5rem' }} />
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '600' }}>Executive Overview</h1>
        <p style={{ color: 'var(--text-dim)', marginTop: '0.25rem' }}>Good morning, Qutaifan. Here's your business at a glance.</p>
      </div>
    </div>
    <div className="glass" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%' }}></div>
      <span style={{ fontSize: '0.9rem' }}>AI Assistant Active</span>
    </div>
  </header>
)

const StatCard = ({ label, value, trend, trendUp }) => (
  <div className="glass animate-fade" style={{ padding: '1.5rem' }}>
    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</h2>
      <span style={{ fontSize: '0.85rem', color: trendUp ? '#10B981' : '#EF4444' }}>
        {trendUp ? '↑' : '↓'} {trend}
      </span>
    </div>
  </div>
)

const AIInsights = () => (
  <div className="glass animate-fade" style={{ marginTop: '2.5rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ fontSize: '1.2rem' }}>✨</span>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>AI-Driven Personalization</h3>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <div style={{ padding: '1rem', borderLeft: '3px solid var(--primary)', background: 'rgba(255,255,255,0.02)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Behavior-based Alert</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>3 prospects from Jordan showed high interest in the HR module today.</p>
      </div>
      <div style={{ padding: '1rem', borderLeft: '3px solid #F59E0B', background: 'rgba(255,255,255,0.02)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Predictive Card</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>Deal probability for Project Alpha increased to 85% based on recent interaction.</p>
      </div>
    </div>
  </div>
)

function App() {
  return (
    <div className="container">
      <Header />
      <div className="grid-3">
        <StatCard label="Total Revenue" value="$124,500" trend="12%" trendUp={true} />
        <StatCard label="Active Leads" value="48" trend="4%" trendUp={true} />
        <StatCard label="Conversion" value="3.2%" trend="0.5%" trendUp={false} />
      </div>
      <AIInsights />

      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Recent Growth</h3>
        <div className="glass" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
          {/* Placeholder for future graph implementation */}
          Chart Visualisation Placeholder
        </div>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="glass" style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
        height: '64px',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 1rem',
        zIndex: 1000,
        display: window.innerWidth < 768 ? 'flex' : 'none'
      }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '1.5rem' }}>🏠</button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1.5rem' }}>👥</button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1.5rem' }}>📈</button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1.5rem' }}>⚙️</button>
      </nav>
    </div>
  )
}

export default App
