import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import MaterialsSection from "./components/MaterialsSection";
import ProcessSection from "./components/ProcessSection";
import PackagesSection from "./components/PackagesSection";
import QuoteSection from "./components/QuoteSection";
import ContactSection from "./components/ContactSection";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
function App() {
   const isAdminPage = window.location.pathname === "/admin";

  if (isAdminPage) {
    return <AdminDashboard />;
  }
  return (
    <>
      <Navbar />

       <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <MaterialsSection />
        <ProcessSection />
        <PackagesSection />
        <QuoteSection />
        <ContactSection />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}

export default App;