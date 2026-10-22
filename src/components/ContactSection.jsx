
function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* TOP LABEL */}
        <div className="contact-top">
          <span>08</span>
          <span>CONTACT</span>
        </div>

        {/* MAIN CONTENT */}
        <div className="contact-main">

          <div className="contact-heading">
            <p className="contact-small-title">
              HAVE A PROJECT IN MIND?
            </p>

            <h2>
              Let's build
              <br />
              <em>something meaningful.</em>
            </h2>
          </div>

          <div className="contact-action">
            <p>
              From the first sketch to the final finish,
              we bring design, construction and interiors
              together under one roof.
            </p>

            <a href="#get-quote" className="contact-cta">
              Start Your Project
              <span>↗</span>
            </a>
          </div>

        </div>

        {/* CONTACT INFORMATION */}
        <div className="contact-info">

          <a href="tel:+919848851443" className="contact-info-item">
            <span className="contact-label">CALL</span>
            <strong>+91 9848851443</strong>
          </a>

          <a
            href="mailto:info@radhaconstructions.com"
            className="contact-info-item"
          >
            <span className="contact-label">EMAIL</span>
            <strong>sampathgoudarukala@gmail.com</strong>
          </a>

          <div className="contact-info-item">
            <span className="contact-label">LOCATION</span>
            <strong>Hyderabad, Telangana</strong>
          </div>

          <a
            href="https://instagram.com/radha.constructions"
            target="_blank"
            rel="noreferrer"
            className="contact-info-item"
          >
            <span className="contact-label">INSTAGRAM</span>
            <strong>radha.constructions</strong>
          </a>
 <a
    href="https://wa.me/919848851443"
    target="_blank"
    rel="noreferrer"
    className="contact-info-item"
  >
    <span className="contact-label">WHATSAPP</span>
    <strong>+91 9848851443</strong>
  </a>
        </div>

        {/* BOTTOM BRAND */}
        <div className="contact-bottom">

          <div className="contact-brand">
            RADHA CONSTRUCTIONS
          </div>

          <div className="contact-tagline">
            DESIGN <span>•</span> DEVELOP <span>•</span> DELIVER
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;

