import { ArrowRight, Play } from "lucide-react";
import hero from "../assets/hero-image.png"
import heroDesktop from "../assets/hero-desktop.png";
import heroMobile from "../assets/hero-mobile.png";
function Hero() {
  return (
    <section className="hero" id="home">

      {/* Background Image */}
      {/* <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
          alt="Modern residential architecture"
        />
      </div> */}
      {/* <div className="hero-image">
        <img
          src={hero}
          alt="Modern residential architecture"
        />
      </div> */}

      <div className="hero-image">
        <picture>
          <source
            media="(max-width: 850px)"
            srcSet={heroMobile}
          />

          <img
            src={heroDesktop}
            alt="Radha Constructions"
          />
        </picture>
      </div>
      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-container">

        <div className="hero-content">

          <p className="hero-label">
            DESIGN • DEVELOP • DELIVER
          </p>

          <h1>
            Building spaces
            <br />
            <span>that belong.</span>
          </h1>

          <p className="hero-description">
            From thoughtful planning to complete construction,
            Radha Constructions creates homes and spaces designed
            around the way you live.
          </p>

          <div className="hero-buttons">

            <a href="#projects" className="hero-primary-button">
              Explore Projects
              <ArrowRight size={18} />
            </a>

            <a href="#get-quote" className="hero-secondary-button">
              Get a Quote
            </a>

          </div>

        </div>

        {/* Bottom Information */}
        <div className="hero-bottom">

          <div className="hero-scroll">
            <span className="scroll-line"></span>
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="hero-location">
            <span>BASED IN</span>
            <strong>HYDERABAD • TELANGANA</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;