import {
  ArrowDownRight,
  ClipboardList,
  Ruler,
  Calculator,
  HardHat,
  Sparkles,
  KeyRound,
} from "lucide-react";

function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We understand your requirements, lifestyle, site conditions, expectations and overall project goals.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Planning & Design",
      description:
        "Our planning process develops the floor plan, space requirements, elevations and design direction.",
      icon: Ruler,
    },
    {
      number: "03",
      title: "Estimate & Scope",
      description:
        "The project scope, specifications, material requirements and estimated investment are discussed clearly.",
      icon: Calculator,
    },
    {
      number: "04",
      title: "Construction",
      description:
        "Once approved, execution begins with proper coordination of civil, structural and associated works.",
      icon: HardHat,
    },
    {
      number: "05",
      title: "Finishing & Interiors",
      description:
        "Flooring, painting, electrical, plumbing, kitchens, wardrobes, ceilings and other finishing works are completed.",
      icon: Sparkles,
    },
    {
      number: "06",
      title: "Inspection & Handover",
      description:
        "The completed project is reviewed with you before final handover and completion.",
      icon: KeyRound,
    },
  ];

  return (
    <section className="process-section" id="process">
      <div className="process-container">

        {/* Section Label */}
        <div className="process-label">
          <span>05</span>
          <span>OUR PROCESS</span>
        </div>

        {/* Header */}
        <div className="process-header">
          <div>
            <h2>
              A clear process.
              <br />
              <span>A better experience.</span>
            </h2>
          </div>

          <div className="process-header-right">
            <p>
              Building a home or commercial space is a major decision.
              Our process is designed to keep every important stage
              organised, transparent and easy to understand.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="process-list">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="process-step" key={step.number}>

                <div className="process-step-number">
                  {step.number}
                </div>

                <div className="process-step-icon">
                  <Icon size={25} strokeWidth={1.5} />
                </div>

                <div className="process-step-content">
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="process-arrow">
                    <ArrowDownRight
                      size={23}
                      strokeWidth={1.3}
                    />
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="process-bottom">
          <div className="process-bottom-number">
            06
          </div>

          <div className="process-bottom-content">
            <span>FROM IDEA TO COMPLETION</span>

            <h3>
              One team.
              <br />
              <span>One coordinated journey.</span>
            </h3>
          </div>

          <a href="#get-quote" className="process-button">
            Start Your Project
            <ArrowDownRight size={19} />
          </a>
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;