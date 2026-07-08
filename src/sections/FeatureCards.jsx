import React, { useRef } from "react";
import { abilities } from "../constants/index.js";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { FiCode, FiAward, FiLayers } from "react-icons/fi";

// Map modern icons to each feature card
const FEATURE_ICONS = [FiCode, FiAward, FiLayers];

const FeatureCards = () => (
  <section
    id="why"
    className="w-full section-padding"
    style={{ backgroundColor: "var(--bg-secondary)" }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// mengapa tim memilih saya"
        title="Mengapa Tim Mempekerjakan Saya"
        description="Tiga alasan utama mengapa perekrut dan tim memilih saya — bukti nyata pengiriman proyek, validasi prestasi, dan jangkauan teknis end-to-end."
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} ability={ability} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = ({ ability, index }) => {
  const cardRef = useRef(null);
  const { title, desc } = ability;
  const Icon = FEATURE_ICONS[index] || FiCode;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 6;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gradient-frame p-7 md:p-8 flex flex-col gap-4 transition-all duration-300 will-change-transform group hover:shadow-xl"
      role="article"
      aria-labelledby={`feature-title-${index}`}
      tabIndex={0}
    >
      {/* Icon with modern styling */}
      <div
        className="size-14 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ backgroundColor: "var(--accent-soft)" }}
      >
        <Icon
          className="w-7 h-7 transition-all duration-300 group-hover:scale-110"
          style={{ color: "var(--accent)" }}
        />
      </div>

      <h3
        id={`feature-title-${index}`}
        className="text-xl md:text-2xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>

      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
};

export default FeatureCards;
