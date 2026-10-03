"use client";

import { useId, useRef, type ReactNode } from "react";

export default function VideoCarousel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const carouselId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>(".video-card");
    const gap = Number.parseFloat(getComputedStyle(scroller.firstElementChild ?? scroller).columnGap) || 0;
    const distance = firstCard ? firstCard.offsetWidth + gap : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="recent-carousel">
      <div className="recent-carousel-controls" role="group" aria-label={`${label} carousel navigation`}>
        <button
          type="button"
          className="carousel-arrow"
          aria-label={`Scroll ${label} videos left`}
          aria-controls={carouselId}
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="carousel-arrow"
          aria-label={`Scroll ${label} videos right`}
          aria-controls={carouselId}
          onClick={() => move(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div
        id={carouselId}
        ref={scrollerRef}
        className="recent-video-scroller"
        aria-label={`Latest videos from ${label}`}
        tabIndex={0}
      >
        <div className="recent-video-track">{children}</div>
      </div>
    </div>
  );
}
