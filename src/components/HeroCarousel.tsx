import { useState, useEffect, useRef } from 'react';
import '../styles/Carousel.css';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused || slides.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, slides.length]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  if (!slides.length) return null;

  return (
    <section className="hero">
      <div
        className="carousel"
        id="heroCarousel"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={handleKeyDown}
        role="region"
        tabIndex={0}
      >
        <div
          className="carousel__track"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {slides.map((slide, i) => (
            <section
              key={i}
              className="carousel__slide"
              style={{ backgroundImage: `url('${slide.image}')` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <div className="carousel__overlay"></div>
              <div className="carousel__content container">
                <h1>{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <p className="hero-desc">{slide.description}</p>
                <div className="cta-group">
                  <a href={slide.ctaPrimary.href} className="btn btn-primary">
                    {slide.ctaPrimary.label}
                  </a>
                  <a href={slide.ctaSecondary.href} className="btn btn-secondary">
                    {slide.ctaSecondary.label}
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>

        <button
          className="carousel__control prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ◀
        </button>
        <button
          className="carousel__control next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ▶
        </button>

        <div className="carousel__indicators" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel__indicator ${i === current ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
