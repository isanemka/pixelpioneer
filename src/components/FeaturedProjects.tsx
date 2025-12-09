"use client";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "E-handelsplattform",
    role: "Lead Developer",
    outcome: "Ökade konverteringen med 42% genom optimerat kassaflöde",
    tags: ["Next.js", "TypeScript", "Stripe"],
    image: "/images/rocket_with_stars.png",
    imageAlt: "E-handelsplattform projektvisning",
  },
  {
    title: "Portfolio-sajt",
    role: "Full Stack Developer",
    outcome: "Modern, tillgänglig portfolio med 98+ Lighthouse-poäng",
    tags: ["React", "Tailwind", "Performance"],
    image: "/images/rocket.png",
    imageAlt: "Portfolio-webbplats projekt",
  },
  {
    title: "Bokningssystem",
    role: "Frontend Lead",
    outcome: "Minskade bokningstiden med 60% genom strömlinjeformat UX",
    tags: ["React", "Node.js", "UX"],
    image: "/images/asteroid.png",
    imageAlt: "Bokningssystem gränssnitt",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="spacing-section bg-darkBg">
      <div className="section-container">
        <h2 className="font-press-start-2p text-2xl md:text-4xl text-accentNeon mb-4 glitch-text text-center">
          Utvalda Projekt
        </h2>
        <p className="text-textSecondary text-center mb-12 max-w-2xl mx-auto">
          Moderna webbupplevelser byggda med precision och omsorg
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
            Se Alla Projekt
          </a>
        </div>
      </div>
    </section>
  );
}
