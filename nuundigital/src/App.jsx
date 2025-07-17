import { useState, useEffect } from "react";
import Pre from './components/Pre';
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Booking from "./components/book/booking";
import AdminLogin from "./admin/login";
import AdminDashboard from "./admin/dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./components/Contact/Contact";
import "./UI/style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FeedbackButton from "./components/FeedbackButton";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Pre load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <div className="app-wrapper">
          <Navbar />
          <ScrollToTop />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
          </main>
          <FeedbackButton />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;