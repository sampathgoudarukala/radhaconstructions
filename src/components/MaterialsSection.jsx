import {
  ArrowUpRight,
  Building2,
  Layers3,
  Zap,
  Droplets,
  Square,
  Paintbrush,
  Sofa,
  ShieldCheck,
} from "lucide-react";

function MaterialsSection() {
  const materialCategories = [
    {
      number: "01",
      title: "Structure",
      description:
        "Core structural materials selected according to project design, structural requirements and site conditions.",
      materials: ["RCC", "TMT Steel", "M-Sand", "Aggregates"],
      icon: Building2,
    },
    {
      number: "02",
      title: "Cement & Blocks",
      description:
        "Reliable masonry and cement systems suitable for residential and commercial construction.",
      materials: ["OPC / PPC Cement", "AAC Blocks", "Fly Ash Bricks", "Concrete Blocks"],
      icon: Layers3,
    },
    {
      number: "03",
      title: "Flooring",
      description:
        "Flooring options selected according to design, usage, maintenance requirements and budget.",
      materials: ["Vitrified Tiles", "Granite", "Marble", "Outdoor Tiles"],
      icon: Square,
    },
    {
      number: "04",
      title: "Electrical",
      description:
        "Electrical systems planned for safety, functionality and future requirements.",
      materials: ["Wires & Cables", "Switches", "MCB / DB", "Lighting"],
      icon: Zap,
    },
    {
      number: "05",
      title: "Plumbing",
      description:
        "Water supply, drainage and sanitary systems designed for reliable long-term performance.",
      materials: ["CPVC", "UPVC", "SW Pipes", "Sanitary Ware"],
      icon: Droplets,
    },
    {
      number: "06",
      title: "Paint & Finishes",
      description:
        "Interior and exterior finishes selected to achieve the desired appearance and durability.",
      materials: ["Interior Paint", "Exterior Paint", "Putty", "Textures"],
      icon: Paintbrush,
    },
    {
      number: "07",
      title: "Doors & Windows",
      description:
        "Door and window systems balancing appearance, ventilation, security and performance.",
      materials: ["Aluminium", "UPVC", "MS", "Wood / Engineered Wood"],
      icon: ShieldCheck,
    },
    {
      number: "08",
      title: "Interiors",
      description:
        "Materials for kitchens, wardrobes, ceilings and custom interior elements.",
      materials: ["Plywood", "Laminates", "Acrylic", "Hardware"],
      icon: Sofa,
    },
  ];

  return (
    <section className="materials-section" id="materials">
      <div className="materials-container">

        {/* Section Label */}
        <div className="materials-label">
          <span>04</span>
          <span>MATERIALS & SPECIFICATIONS</span>
        </div>

        {/* Header */}
        <div className="materials-header">
          <div>
            <h2>
              Good construction
              <br />
              <span>starts with good choices.</span>
            </h2>
          </div>

          <div className="materials-header-right">
            <p>
              We help you choose materials based on quality, application,
              durability, appearance and budget. Final specifications can
              be customised for every project.
            </p>

            <a href="#get-quote" className="materials-link">
              Discuss Material Options
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Material Grid */}
        <div className="materials-grid">
          {materialCategories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                className="material-card"
                key={category.number}
              >
                <div className="material-card-top">
                  <span className="material-number">
                    {category.number}
                  </span>

                  <div className="material-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="material-content">
                  <h3>{category.title}</h3>

                  <p>{category.description}</p>
                </div>

                <div className="material-list">
                  {category.materials.map((material) => (
                    <span key={material}>{material}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Brand Philosophy */}
        <div className="materials-note">
          <div className="materials-note-icon">
            <ShieldCheck size={25} strokeWidth={1.5} />
          </div>

          <div>
            <span>OUR APPROACH</span>

            <h3>
              Material selection should fit
              <span> your project.</span>
            </h3>

            <p>
              We don't believe in using the same specification for every
              project. Materials and brands can be selected according to
              structural requirements, design intent, availability,
              budget and client preference.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default MaterialsSection;