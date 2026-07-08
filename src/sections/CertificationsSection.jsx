import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { certifications } from "../constants/certifications.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";

// Fullscreen modal with zoom, pan, keyboard nav
const CertModal = memo(function CertModal({ certs, currentIndex, isOpen, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const cert = certs[currentIndex] || null;

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") { setZoom(1); setPosition({ x: 0, y: 0 }); onClose(); }
      if (e.key === "ArrowLeft" && currentIndex > 0) { setZoom(1); setPosition({ x: 0, y: 0 }); /* handled by parent */ }
      if (e.key === "ArrowRight" && currentIndex < certs.length - 1) { setZoom(1); setPosition({ x: 0, y: 0 }); /* handled by parent */ }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, certs.length, onClose]);

  const handleWheel = useCallback((e) => {
    if (e.deltaY < 0) setZoom(z => Math.min(z + 0.1, 3));
    else setZoom(z => Math.max(z - 0.1, 0.5));
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isOpen || !cert) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[9999] select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); onClose(); }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-lg"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="min-w-0">
              <h2 id="cert-modal-title" className="text-sm md:text-base font-semibold text-white truncate">
                {cert.name}
              </h2>
              <p className="text-xs text-white/60 truncate">{cert.issuer} {cert.year && `· ${cert.year}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50 font-mono">{zoom >= 2 ? "Zoom: 200%" : zoom >= 1.5 ? "Zoom: 150%" : zoom >= 1 ? "Zoom: 100%" : `Zoom: ${Math.round(zoom * 100)}%`}</span>
            <button onClick={() => window.open(cert.imagePath, "_blank")} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-all">
              Open
            </button>
          </div>
        </div>

        {/* Image area */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
        >
          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); /* parent handles */ }}
              className="absolute left-2 md:left-6 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white text-xl md:text-2xl transition-all shadow-lg"
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          {currentIndex < certs.length - 1 && (
            <button
              onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); /* parent handles */ }}
              className="absolute right-2 md:right-6 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white text-xl md:text-2xl transition-all shadow-lg"
              aria-label="Next"
            >
              ›
            </button>
          )}

          <img
            ref={imgRef}
            src={cert.imagePath}
            alt={cert.name}
            className="max-w-[90%] max-h-[80vh] object-contain transition-transform duration-200"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            draggable={false}
          />
        </div>

        {/* Bottom description bar */}
        <div className="px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md">
          <p className="text-xs md:text-sm text-white/70 text-center max-w-2xl mx-auto leading-relaxed">
            {cert.description}
          </p>
          <p className="text-[10px] text-white/40 text-center mt-1">
            Scroll to zoom · Drag to pan · ← → to navigate · Esc to close
          </p>
        </div>
      </div>
    </div>
  );
});

// Individual certificate card — supports both images and PDFs
const CertCard = memo(function CertCard({ cert, isActive, onClick }) {
  return (
    <div
      className={`flex-none w-[260px] sm:w-[300px] md:w-[340px] group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
        isActive ? "scale-[1.02]" : ""
      }`}
      onClick={() => cert.isPdf ? window.open(cert.pdfPath, '_blank') : onClick()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cert.isPdf ? window.open(cert.pdfPath, '_blank') : onClick(); } }}
      tabIndex={0}
      role="button"
      aria-label={`${cert.isPdf ? 'Open' : 'View'} ${cert.name}`}
    >
      <div
        className="rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-accent/20"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-card) 70%, transparent)",
          border: "1px solid var(--border-primary)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Thumbnail area */}
        <div className="aspect-[4/3] overflow-hidden relative flex items-center justify-center">
          {cert.isPdf ? (
            // PDF card — show file icon
            <>
              <div className="flex flex-col items-center justify-center gap-3 p-6">
                <svg className="w-16 h-16" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 20%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  PDF
                </span>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "color-mix(in srgb, var(--bg-card) 70%, transparent)" }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                    color: "var(--accent)",
                    border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Open PDF
                </span>
              </div>
            </>
          ) : (
            // Image certificate
            <>
              <img
                src={cert.imagePath}
                alt={cert.name}
                className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg-card) 90%, transparent) 100%)",
                }}
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                    color: "var(--accent)",
                    border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Preview
                </span>
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-4 relative">
          <div
            className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
          />
          <h3 className="font-semibold text-sm md:text-base leading-tight line-clamp-2" style={{ color: "var(--text-primary)" }}>
            {cert.name}
          </h3>
          <p className="mt-1.5 text-xs font-mono" style={{ color: "var(--accent)" }}>
            {cert.issuer}
          </p>
          {cert.year && (
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              {cert.year}
            </p>
          )}
          {cert.isPdf && (
            <p className="mt-1 text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              PDF Document
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

const CertificationsSection = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState({ left: false, right: false });

  // Check scroll position for arrows
  const checkArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowArrows({
      left: el.scrollLeft > 20,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 20,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkArrows();
    el.addEventListener("scroll", checkArrows);
    return () => el.removeEventListener("scroll", checkArrows);
  }, [checkArrows]);

  // Scroll handlers
  const scrollTo = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 360;
    const gap = 20;
    const scrollAmount = cardWidth + gap;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  // Drag to scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStartX;
    scrollRef.current.scrollLeft = dragScrollLeft - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const touchStartX = useRef(0);
  const touchStartScroll = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartScroll.current = scrollRef.current?.scrollLeft || 0;
  };
  const handleTouchMove = (e) => {
    if (!scrollRef.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    scrollRef.current.scrollLeft = touchStartScroll.current - dx;
  };

  // Wheel scroll
  const handleWheel = useCallback((e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      scrollRef.current.scrollLeft += e.deltaX;
    } else {
      scrollRef.current.scrollLeft += e.deltaY;
    }
    e.preventDefault();
  }, []);

  // Track visible index
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!isNaN(idx)) setCurrentIndex(idx);
          }
        });
      },
      { root: el, threshold: 0.6 }
    );
    const cards = el.querySelectorAll("[data-index]");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goModal = (dir) => {
    const next = modalIndex + dir;
    if (next >= 0 && next < certifications.length) {
      setModalIndex(next);
    }
  };

  // Handle keyboard for modal navigation from parent
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") goModal(-1);
      if (e.key === "ArrowRight") goModal(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, modalIndex]);

  return (
    <section
      id="certifications"
      className="w-full section-padding overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="// sertifikat"
          title="Certifications & Achievements"
          description="Sertifikat dan penghargaan yang mendukung kompetensi di bidang teknologi, pendidikan, dan pengembangan profesional."
        />

        {/* Carousel */}
        <div className="relative mt-12 md:mt-16">
          {/* Gradient edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--bg-primary), transparent)",
              opacity: showArrows.left ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--bg-primary), transparent)",
              opacity: showArrows.right ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />

          {/* Navigation arrows */}
          {showArrows.left && (
            <button
              onClick={() => scrollTo("left")}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "color-mix(in srgb, var(--bg-card) 85%, transparent)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
              }}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {showArrows.right && (
            <button
              onClick={() => scrollTo("right")}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "color-mix(in srgb, var(--bg-card) 85%, transparent)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-primary)",
              }}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-4 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
              scrollBehavior: isDragging ? "auto" : "smooth",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onWheel={handleWheel}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            {certifications.map((cert, idx) => (
              <div key={cert.id} data-index={idx} className="flex-none">
                <CertCard
                  cert={cert}
                  isActive={false}
                  onClick={() => openModal(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Counter dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {certifications.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const card = el.querySelector(`[data-index="${idx}"]`);
                if (card) card.scrollIntoView({ behavior: "smooth", inline: "center" });
              }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: idx === currentIndex ? "24px" : "8px",
                height: "8px",
                backgroundColor: idx === currentIndex ? "var(--accent)" : "var(--border-primary)",
              }}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertModal
        certs={certifications}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default CertificationsSection;
