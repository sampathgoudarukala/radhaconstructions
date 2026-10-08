import { ArrowUpRight } from "lucide-react";

function AboutSection() {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* Section Label */}
        <div className="about-label">
          <span>01</span>
          <span>ABOUT RADHA CONSTRUCTIONS</span>
        </div>

        {/* Main Introduction */}
        <div className="about-intro">

          <h2>
            We don't just construct buildings.
            <span> We create spaces designed around you.</span>
          </h2>

          <div className="about-intro-right">

            <p>
              Radha Constructions brings together thoughtful planning,
              architectural design and quality construction to create
              spaces that are functional, comfortable and built to last.
            </p>

            <a href="#contact" className="about-link">
              Know More About Us
              <ArrowUpRight size={17} />
            </a>

          </div>

        </div>

        {/* Bottom Grid */}
        <div className="about-grid">

          {/* Image */}
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
              alt="Modern residential interior"
            />
          </div>

          {/* Information */}
          <div className="about-info">

            <div className="about-info-block">
              <span className="about-number">01</span>

              <div>
                <h3>Thoughtful Design</h3>

                <p>
                  Every project begins with understanding the site,
                  lifestyle and requirements of the people who will
                  use the space.
                </p>
              </div>
            </div>


            <div className="about-info-block">
              <span className="about-number">02</span>

              <div>
                <h3>Quality Construction</h3>

                <p>
                  We focus on proper execution, suitable materials
                  and attention to detail throughout the construction
                  process.
                </p>
              </div>
            </div>


            <div className="about-info-block">
              <span className="about-number">03</span>

              <div>
                <h3>Complete Execution</h3>

                <p>
                  From planning and structural works to finishing and
                  interiors, we help bring the complete project together.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Stats */}
        <div className="about-stats">

          <div className="about-stat">
            <strong>01</strong>
            <span>Design</span>
          </div>

          <div className="about-stat">
            <strong>02</strong>
            <span>Develop</span>
          </div>

          <div className="about-stat">
            <strong>03</strong>
            <span>Deliver</span>
          </div>

          <div className="about-stat about-stat-last">
            <strong>∞</strong>
            <span>Possibilities</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;