import {
  ArrowUpRight,
  PencilRuler,
  Building2,
  Home,
  Layers3,
} from "lucide-react";

function PackagesSection() {
  const packages = [
    {
      number: "01",
      title: "Design Only",
      subtitle: "For clients who already have a contractor",
      description:
        "A focused design package for clients who need professional planning and architectural support before starting construction.",
      icon: PencilRuler,
      features: [
        "2D Floor Planning",
        "Space Planning",
        "Elevation Design",
        "3D Views",
        "Design Consultation",
      ],
    },
    {
      number: "02",
      title: "Design + Construction",
      subtitle: "A coordinated building experience",
      description:
        "Planning and construction managed together so design decisions and site execution remain properly coordinated.",
      icon: Building2,
      features: [
        "Architectural Planning",
        "Structural Coordination",
        "Construction",
        "Electrical & Plumbing",
        "Finishing Works",
      ],
      featured: true,
    },
    {
      number: "03",
      title: "Complete Turnkey",
      subtitle: "From concept to handover",
      description:
        "An end-to-end solution covering design, construction, interiors and the finishing details required for a complete project.",
      icon: Home,
      features: [
        "Complete Design",
        "Civil Construction",
        "Interiors",
        "Kitchens & Wardrobes",
        "Final Handover",
      ],
    },
    {
      number: "04",
      title: "Renovation & Interiors",
      subtitle: "Transform an existing space",
      description:
        "Upgrade, renovate or completely transform your existing home, office or commercial property.",
      icon: Layers3,
      features: [
        "Renovation",
        "Flooring",
        "Painting",
        "False Ceiling",
        "Custom Interiors",
      ],
    },
  ];

  return (
    <section className="packages-section" id="packages">
      <div className="packages-container">

        {/* Label */}
        <div className="packages-label">
          <span>06</span>
          <span>WAYS WE CAN WORK TOGETHER</span>
        </div>

        {/* Header */}
        <div className="packages-header">
          <div>
            <h2>
              Choose the level
              <br />
              <span>of support you need.</span>
            </h2>
          </div>

          <div className="packages-header-right">
            <p>
              Every project is different. Choose a service model that
              matches your requirements, or speak with us and we'll help
              define the right scope for your project.
            </p>

            <a href="#get-quote" className="packages-header-link">
              Tell Us About Your Project
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Packages */}
        <div className="packages-grid">
          {packages.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className={`package-card ${
                  item.featured ? "package-featured" : ""
                }`}
                key={item.number}
              >
                <div className="package-top">
                  <span className="package-number">
                    {item.number}
                  </span>

                  <div className="package-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="package-main">
                  <h3>{item.title}</h3>

                  <span className="package-subtitle">
                    {item.subtitle}
                  </span>

                  <p>{item.description}</p>
                </div>

                <div className="package-features">
                  {item.features.map((feature) => (
                    <div className="package-feature" key={feature}>
                      <span className="package-dot"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#get-quote"
                  className="package-link"
                >
                  Discuss This Package
                  <ArrowUpRight size={17} />
                </a>
              </article>
            );
          })}
        </div>

        {/* Note */}
        <div className="packages-note">
          <span>PROJECT SPECIFIC PRICING</span>

          <p>
            Final pricing is prepared according to the project's area,
            design, structural requirements, specifications, material
            selections, site conditions and scope of work.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PackagesSection;