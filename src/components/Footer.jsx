function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-name">
              RADHA CONSTRUCTIONS
            </div>

            <div className="footer-tagline">
              DESIGN <span>•</span> DEVELOP <span>•</span> DELIVER
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="footer-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 Radha Constructions
          </span>

          <button
            type="button"
            onClick={scrollToTop}
          >
            BACK TO TOP <span>↑</span>
          </button>

        </div>

      </div>
    </footer>
  );
}

export default Footer;