import siteData from '../data/site.json';
import SEO from '../components/SEO';
import '../styles/Pages.css';

export default function PerformancePage() {
  return (
    <>
      <SEO
        title="School Performance"
        description="Explore the academic achievements and measurable progress of Mateket Secondary School, the most improved school in the district."
      />
      <section className="hero-alt">
        <div className="container">
          <h1>Our Performance</h1>
          <p>Transparent results and measurable growth.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Key Achievements</h2>
          <div className="stats-grid">
            {siteData.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2>Resources</h2>
          <p>Download our latest reports and documents.</p>
          <div className="download-links">
            {siteData.downloads.map((dl, i) => (
              <a key={i} href={dl.href} className="download-btn">
                <span className="icon">{dl.icon}</span> {dl.title}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
