import { ArrowUpRight } from "lucide-react";

function ProjectsSection() {
  const projects = [
    {
      number: "01",
      title: "Contemporary Residence",
      category: "Residential Architecture",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
      size: "large",
    },
    {
      number: "02",
      title: "Modern Villa",
      category: "Design & Construction",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90",
      size: "small",
    },
    {
      number: "03",
      title: "Minimal Interior",
      category: "Interior Design",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
      size: "small",
    },
    {
      number: "04",
      title: "Luxury Residence",
      category: "Turnkey Construction",
      location: "Telangana",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
      size: "large",
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Section Header */}
        <div className="projects-label">
          <span>03</span>
          <span>SELECTED PROJECTS</span>
        </div>

        <div className="projects-header">
          <div>
            <h2>
              Spaces we've
              <br />
              <span>brought to life.</span>
            </h2>
          </div>

          <div className="projects-header-right">
            <p>
              Every project is an opportunity to turn an idea into a
              space that feels personal, purposeful and built to last.
            </p>

            <a href="#get-quote" className="projects-header-link">
              Start Your Project
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className={`project-card project-${project.size}`}
              key={project.number}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />

                <div className="project-overlay"></div>

                <div className="project-number">
                  {project.number}
                </div>

                <div className="project-view">
                  <ArrowUpRight size={23} strokeWidth={1.5} />
                </div>
              </div>

              <div className="project-details">
                <div>
                  <h3>{project.title}</h3>

                  <p>{project.category}</p>
                </div>

                <span>{project.location}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="projects-bottom">
          <p>
            More projects are being added to our portfolio.
          </p>

          <a href="#get-quote" className="projects-cta">
            Discuss Your Project
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;