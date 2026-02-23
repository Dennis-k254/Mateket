import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import SEO from '../components/SEO';
import siteData from '../data/site.json';
import '../styles/Pages.css';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export default function HomePage() {
  const [heroSlides, setHeroSlides] = useState<Slide[]>([]);
  const school = (siteData as any).schoolInfo;

  useEffect(() => {
    if (siteData.heroSlides) {
      setHeroSlides(siteData.heroSlides);
    }
  }, []);

  return (
    <>
      <SEO
        title="Growth, Faith, Excellence"
        description="Mateket Secondary School in Kitale Cherengany is the most improved school in the district, offering CBC pathways in a nurturing Christian environment."
      />
      <HeroCarousel slides={heroSlides} />

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2>A Foundation for Success</h2>
            <p>{school?.description || 'Mateket is committed to student success and community partnership.'}</p>
          </div>
          <div className="grid-2">
            <div className="about-text">
              <h3>Overview</h3>
              <p>{school?.seniorSchool?.summary || 'A caring school focused on learning and character.'}</p>

              <h4 className="mt-2">Pathways</h4>
              <div className="pill-list">
                {(school?.pathways || []).map((p: string) => (
                  <span key={p} className="pill">{p}</span>
                ))}
              </div>

              <p className="mt-2">Learn more about admissions, subject combinations, and school life on the About page.</p>
            </div>
            <div className="about-image">
              <img
                src="/images/hero/students hero.jpeg"
                alt="Mateket students"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CBC Pathways Banner */}
      <section className="cbc-banner">
        <div className="container">
          <h3>Competency Based Curriculum (CBC) Pathways</h3>
          <p>Our students specialize in one of three dynamic pathways from Grade 10 onwards.</p>
          <div className="cbc-pathways">
            <div className="cbc-pathway-card">
              <h4>STEM</h4>
              <p>Science, Technology, Engineering & Mathematics</p>
            </div>
            <div className="cbc-pathway-card">
              <h4>Social Sciences</h4>
              <p>Humanities, Business & Social Studies</p>
            </div>
            <div className="cbc-pathway-card">
              <h4>Arts & Sports</h4>
              <p>Creative & Athletic Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Measured Progress</h2>
            <p>Transparency and results are at the core of what we do.</p>
          </div>
          <div className="stats-grid">
            {siteData.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="downloads-area">
            <h3>Downloads & Resources</h3>
            <div className="download-links">
              {siteData.downloads.map((dl, i) => (
                <a key={i} href={dl.href} className="download-btn">
                  <span className="icon">{dl.icon}</span> {dl.title}
                </a>
              ))}
              <Link to="/gallery" className="download-btn secondary-resource">
                <span className="icon">📸</span> View School Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
