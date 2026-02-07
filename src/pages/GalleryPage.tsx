import '../styles/Pages.css';
import siteData from '../data/site.json';

export default function GalleryPage() {
  const images: string[] = (siteData as any).gallery || [
    'https://placehold.co/600x400/8E44AD/FFFFFF?text=School+Grounds',
    'https://placehold.co/600x400/2980B9/FFFFFF?text=Classroom',
    'https://placehold.co/600x400/27AE60/FFFFFF?text=Assembly',
    'https://placehold.co/600x400/F39C12/FFFFFF?text=Sports',
  ];

  return (
    <>
      <section className="hero-alt">
        <div className="container">
          <h1>Gallery</h1>
          <p>Photos from around Mateket Senior School. Add your images to the gallery data to update.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="combinations-grid">
            {images.map((src, i) => (
              <div key={i} className="combo-card">
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" style={{ width: '100%', borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
