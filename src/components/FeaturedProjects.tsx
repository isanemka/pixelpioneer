"use client";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "E-commerce Platform",
    role: "Lead Developer",
    outcome: "Increased conversion by 42% with optimized checkout flow",
    tags: ["Next.js", "TypeScript", "Stripe"],
    image: "/images/rocket_with_stars.png",
    imageAlt: "E-commerce platform project showcase",
  },
  {
    title: "Portfolio Site",
    role: "Full Stack Developer",
    outcome: "Modern, accessible portfolio with 98+ Lighthouse score",
    tags: ["React", "Tailwind", "Performance"],
    image: "/images/rocket.png",
    imageAlt: "Portfolio website project",
  },
  {
    title: "Booking System",
    role: "Frontend Lead",
    outcome: "Reduced booking time by 60% with streamlined UX",
    tags: ["React", "Node.js", "UX"],
    image: "/images/asteroid.png",
    imageAlt: "Booking system interface",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="spacing-section bg-darkBg">
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentNeon mb-4 glitch-text text-center">
          Featured Projects
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          Modern web experiences built with precision and care
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-accentNeon text-darkBg font-press-start-2p text-sm hover:bg-accentMagenta transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-accentNeon/50"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
