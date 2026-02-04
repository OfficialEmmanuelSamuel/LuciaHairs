import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "../sections/Hero";
import Shop from "../sections/Shop";
import SalesOffersSection from "../sections/SalesOffer";
import PreOrderSection from "../sections/PreOrder";
import CustomersReview from "../sections/Reviews";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import WhatsappButton from "../component/Whatsapp";
import ContactSection from "../component/ContactSection"

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -50; //Nabvar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      scrollToSection(location.state.id);
    }
  }, [location.state, scrollToSection]);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="">
      <Navbar scrollToSection={scrollToSection} setMenuOpen={setMenuOpen} />

      <section id="hero">
        <Home />
      </section>

      <section id="shop">
        <Shop />
      </section>

      <section id="preorder">
        <PreOrderSection />
      </section>
      
      <section id="sale">
        <SalesOffersSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <section id="reviews">
        <CustomersReview />
      </section>

      <WhatsappButton />

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default LandingPage;
