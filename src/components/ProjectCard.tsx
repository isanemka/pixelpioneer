"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  role: string;
  outcome: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export default function ProjectCard({
  title,
  role,
  outcome,
  tags,
  image,
  imageAlt,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="relative bg-darkGray border-2 border-mediumGray overflow-hidden transition-all duration-300 pixel-shadow-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Pixel overlay on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 bg-accentNeon/10 backdrop-blur-[1px]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124, 244, 166, 0.1) 2px, rgba(124, 244, 166, 0.1) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(124, 244, 166, 0.1) 2px, rgba(124, 244, 166, 0.1) 4px)
              `,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-press-start-2p text-base md:text-lg text-accentNeon mb-3">
          {title}
        </h3>
        <p className="text-textSecondary text-sm mb-2">{role}</p>
        <p className="text-textPrimary mb-4 leading-relaxed">{outcome}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-mediumGray border border-accentNeon/30 text-accentNeon text-xs font-vt323"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Broken pixel corners */}
      <div className="pixel-corner-tl text-accentNeon absolute" />
      <div className="pixel-corner-br text-accentNeon absolute" />
    </article>
  );
}
