import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { Reviews } from "./components/Reviews";
import { Visit } from "./components/Visit";
import { UiProvider } from "./components/UiProvider";

export default function App() {
  return (
    <UiProvider>
      <div className="min-h-screen bg-ink text-cream bar-pattern">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <Reviews />
          <Visit />
        </main>
        <Footer />
      </div>
    </UiProvider>
  );
}
