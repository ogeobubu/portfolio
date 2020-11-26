import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import IntoSection from "./components/IntroSection/IntroSection";
import About from "./components/About/About";

import "./App.css";
import Cards from "./components/Cards/Cards";
import Contact from "./components/Contact/Contact";
import ReachMe from "./components/ReachMe/ReachMe";
import Footer from "./components/Footer/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <IntoSection />
      <About />
      <Contact />
      <Cards />
      <ReachMe />
      <Footer />
    </>
  );
};

export default App;
