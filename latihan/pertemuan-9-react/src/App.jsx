import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Abriel.dev</h2>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Project</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <p>Junior Full-Stack Developer</p>
      <h1>Belajar React untuk membangun website modern.</h1>
      <button>Lihat Project</button>
    </section>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;