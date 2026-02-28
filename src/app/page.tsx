import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TwitterFeed from "@/components/TwitterFeed";
import Cases from "@/components/Cases";
import MediaRoom from "@/components/MediaRoom";
import Expertise from "@/components/Expertise";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TwitterFeed />
      <div className="section-divider" />
      <Cases />
      <div className="section-divider" />
      <MediaRoom />
      <div className="section-divider" />
      <Expertise />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </>
  );
}
