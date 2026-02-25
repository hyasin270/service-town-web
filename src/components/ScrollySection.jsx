import { useState, useEffect, useRef } from 'react';

/**
 * ScrollySection — pudding.cool style scrollytelling
 *
 * An image stays pinned (sticky) on the left/top while text "steps"
 * scroll past on the right/bottom. As each step enters the viewport,
 * the pinned image/content changes.
 *
 * Props:
 *   steps: [{ image, title, text, icon, color }]
 */
export default function ScrollySection({ steps, id }) {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.step);
            setActiveStep(idx);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );

    stepRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  const current = steps[activeStep] || steps[0];

  return (
    <div id={id} ref={containerRef} className="scrolly-container">
      {/* Sticky image panel */}
      <div className="scrolly-sticky">
        <div className="scrolly-image-wrap">
          {steps.map((step, i) => (
            <img
              key={i}
              src={step.image}
              alt={step.title}
              className={`scrolly-image ${i === activeStep ? 'scrolly-image-active' : ''}`}
            />
          ))}
          {/* Step indicator dots */}
          <div className="scrolly-dots">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`scrolly-dot ${i === activeStep ? 'scrolly-dot-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling text steps */}
      <div className="scrolly-steps">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={el => stepRefs.current[i] = el}
            data-step={i}
            className={`scrolly-step ${i === activeStep ? 'scrolly-step-active' : ''}`}
          >
            <div className="scrolly-step-inner">
              {step.icon && <span className="text-2xl mb-2 block">{step.icon}</span>}
              <h4 className="font-display text-xl text-navy tracking-wide mb-2">
                {step.title}
              </h4>
              <p className="text-navy/75 text-[0.92rem] leading-relaxed">
                {step.text}
              </p>
              {step.detail && (
                <p className="text-navy/50 text-xs mt-3 italic leading-relaxed">
                  {step.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
