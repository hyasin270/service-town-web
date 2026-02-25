import { useEffect, useRef } from 'react';

export default function Section({ id, title, subtitle, image, paragraphs, children }) {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = contentRef.current?.querySelectorAll('.fade-in');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Zoom-in effect on section images when they enter viewport
  useEffect(() => {
    if (!imageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-image-visible');
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [image]);

  return (
    <section id={id} className="scroll-mt-0">
      {/* Title bar — sits above the image */}
      {image && (
        <>
          <div className="section-hero-title">
            <h2 className="text-4xl md:text-5xl tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl font-light">
                {subtitle}
              </p>
            )}
          </div>

          {/* Full image with entrance animation */}
          <div ref={imageRef} className="section-image-container">
            <img
              src={image}
              alt={title}
              className="w-full h-auto block"
            />
          </div>
        </>
      )}

      {/* Content area */}
      <div ref={contentRef} className="max-w-[720px] mx-auto px-6 py-12 md:py-16">
        {paragraphs?.map((p, i) => (
          <p
            key={i}
            className="fade-in text-navy/85 text-[1.05rem] leading-relaxed mb-6"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {p}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}
