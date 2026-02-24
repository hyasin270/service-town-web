import { useEffect, useRef } from 'react';

export default function Section({ id, title, subtitle, image, paragraphs, children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = contentRef.current?.querySelectorAll('.fade-in');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="scroll-mt-0">
      {/* Hero image — full width, not cropped */}
      {image && (
        <div className="section-hero">
          <img src={image} alt={title} />
          <div className="section-hero-overlay" />
          <div className="section-hero-content">
            <h2 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/80 text-lg md:text-xl font-light">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Content area */}
      <div ref={contentRef} className="max-w-[720px] mx-auto px-6 py-12 md:py-16">
        {paragraphs?.map((p, i) => (
          <p
            key={i}
            className="fade-in text-navy/85 text-[1.05rem] leading-relaxed mb-6"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {p}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}
