import {
  ArrowUpRight,
  Ruler,
  Building2,
  HardHat,
  Layers3,
  Paintbrush,
  Home,
} from "lucide-react";

function ServicesSection() {
  const services = [
    {
      number: "01",
      title: "Architecture & Planning",
      description:
        "Thoughtful floor plans, space planning and architectural design developed around your site, lifestyle and requirements.",
      icon: Ruler,
    },
    {
      number: "02",
      title: "Construction",
      description:
        "Complete residential and commercial construction with proper execution, coordination and attention to every stage of the build.",
      icon: Building2,
    },
    {
      number: "03",
      title: "Structural Works",
      description:
        "Structural planning and execution covering foundations, columns, beams, slabs and other essential structural elements.",
      icon: HardHat,
    },
    {
      number: "04",
      title: "Interiors",
      description:
        "Complete interior solutions including kitchens, wardrobes, TV units, false ceilings, flooring and custom finishes.",
      icon: Layers3,
    },
    {
      number: "05",
      title: "Renovation & Finishing",
      description:
        "Renovation, repairs, waterproofing, painting, flooring, doors, windows and finishing works for existing properties.",
      icon: Paintbrush,
    },
    {
      number: "06",
      title: "Turnkey Projects",
      description:
        "A complete end-to-end solution from initial planning and design to construction, interiors and final handover.",
      icon: Home,
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">

        {/* Section Header */}
        <div className="services-label">
          <span>02</span>
          <span>WHAT WE DO</span>
        </div>

        <div className="services-header">
          <div>
            <h2>
              From the first line
              <br />
              <span>to the final detail.</span>
            </h2>
          </div>

          <div className="services-header-right">
            <p>
              From architectural planning to complete construction and
              interiors, we bring the different parts of your project
              together under one roof.
            </p>

            <a href="#get-quote" className="services-header-link">
              Discuss Your Project
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-number">
                    {service.number}
                  </span>

                  <div className="service-icon">
                    <Icon size={25} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="service-card-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>

                <div className="service-card-bottom">
                  <span>EXPLORE SERVICE</span>

                  <ArrowUpRight
                    className="service-arrow"
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="services-bottom">
          <div>
            <span className="services-bottom-label">
              HAVE A PROJECT IN MIND?
            </span>

            <h3>
              Let's build something
              <span> meaningful.</span>
            </h3>
          </div>

          <a href="#get-quote" className="services-cta">
            Start Your Project
            <ArrowUpRight size={19} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;