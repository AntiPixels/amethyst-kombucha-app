'use client';

import Home from "@/components/Home";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function LandingPage() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Benefits />
      <Products />
      <Testimonials />
      <Footer />
    </>
  );
}
