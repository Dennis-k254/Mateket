import '../styles/Pages.css';
import siteData from '../data/site.json';
import SEO from '../components/SEO';

export default function GalleryPage() {
  const images: string[] = (siteData as any).gallery || [
    'https://placehold.co/600x400/8E44AD/FFFFFF?text=School+Grounds',
    'https://placehold.co/600x400/2980B9/FFFFFF?text=Classroom',
    'https://placehold.co/600x400/27AE60/FFFFFF?text=Assembly',
    'https://placehold.co/600x400/F39C12/FFFFFF?text=Sports',
  ];

  return (
    <>
      <SEO
        title="School Gallery"
        description="View photos of our campus, students, and activities at Mateket Senior School."
      />
      <section className="hero-alt">
        <div className="container">
          <h1>Gallery</h1>
          <p>Photos from around Mateket Senior School</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {images.map((src, i) => (
              <div key={i} className="gallery-item">
                <img src={src} alt={`Mateket Gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-overlay">
                  <span>Mateket Senior School</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
