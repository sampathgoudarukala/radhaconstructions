import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Materials", href: "#materials" },
    { name: "Process", href: "#process" },
    { name: "Packages", href: "#packages" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a href="#home" className="navbar-logo">
          <div className="logo-mark">
            RC
          </div>

          <div className="logo-text">
            <span className="logo-name">RADHA</span>
            <span className="logo-subtitle">CONSTRUCTIONS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Get Quote Button */}
        <a href="#get-quote" className="quote-button">
          Get Quote
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#get-quote"
            className="mobile-quote-button"
            onClick={() => setIsMenuOpen(false)}
          >
            Get a Quote
            <ArrowUpRight size={18} />
          </a>

        </div>
      )}
    </header>
  );
}

export default Navbar;