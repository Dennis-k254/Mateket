import '../styles/Pages.css';
import siteData from '../data/site.json';
import SEO from '../components/SEO';

const school = (siteData as any).schoolInfo;

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Our School"
        description={`Learn about ${school?.officialName}, our history, and the CBC pathways we offer in STEM, Social Sciences, and Arts.`}
      />
      <section className="hero-alt">
        <div className="container">
          <h1>About {school?.officialName || 'Mateket'}</h1>
          <p>{school?.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Our Story</h2>
          <p>
            {school?.institutionalBackground || 'Mateket has a proud history of educating learners in the region.'}
          </p>

          {/* Quick facts removed per request */}
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2>Senior School & CBC Pathways</h2>
          <p>{school?.seniorSchool?.summary}</p>
          <p>{school?.seniorSchool?.cbcFramework}</p>

          <h3>Available Pathways</h3>
          <div className="pill-list">
            {(school?.pathways || []).map((p: string) => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>

          <h3 className="mt-2">Selected Subject Combinations</h3>
          <div className="combinations-grid">
            {(school?.subjectCombinations || []).slice(0, 8).map((c: any) => (
              <div key={c.code} className="combo-card">
                <h4>{c.code} — {c.group}</h4>
                <ul>
                  {c.subjects.map((s: string) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
