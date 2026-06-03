import { useState } from "react";
import "./App.css";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import CreateUser from "./pages/CreateUser";
import Orders from "./pages/Orders";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">☕</span>
          <span>ChaiKafe</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#cart">Cart</a>
          <a href="#customer">Customer</a>
          <a href="#orders">Orders</a>
        </div>

        <div className="cart-pill">
          Cart: {cart.reduce((total, item) => total + item.quantity, 0)}
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-left">
          <p className="small-title">Freshly brewed every day</p>
          <h1>Authentic Indian Chai & Snacks Delivered Hot</h1>
          <p className="hero-text">
            Experience rich masala chai, crispy snacks, and quick café ordering
            through a real-time three-tier cloud-native DevOps application.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="primary-btn">Order Now</a>
            <a href="#customer" className="secondary-btn">Create Account</a>
          </div>
        </div>

        <div className="hero-card">
          <div className="cup">☕</div>
          <h3>Today’s Special</h3>
          <p>Masala Chai + Samosa Combo</p>
          <span>₹45 only</span>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-left">
          <img src="/images/cafe-banner.png" alt="Cafe" />
        </div>

        <div className="featured-right">
          <p className="featured-tag">Our Special Experience</p>
          <h2>Premium Café Experience With Cloud-Native Ordering</h2>

          <p>
            ChaiKafe combines authentic Indian flavors with modern DevOps
            engineering. Built using React, Spring Boot, PostgreSQL, Docker,
            Jenkins, SonarQube, Trivy, and AWS.
          </p>

          <div className="feature-points">
            <div>☕ Freshly Brewed Chai</div>
            <div>🚀 Fresh Sandwiches</div>
            <div>🔒 Freshly Brewed Coffee ☕</div>
            <div>📦 Hot & Crispy Snacks</div>
          </div>

          <a href="#menu" className="primary-btn">Explore More</a>
        </div>
      </section>

      <section className="stats">
        <div>
          <h2>25+</h2>
          <p>Menu Items</p>
        </div>
        <div>
          <h2>99.9%</h2>
          <p>App Availability</p>
        </div>
        <div>
          <h2>3-Tier</h2>
          <p>DevOps Architecture</p>
        </div>
      </section>

      <section id="menu" className="section">
        <div className="section-header">
          <p>Explore our menu</p>
          <h2>Popular Chai & Snacks</h2>
        </div>
        <Menu cart={cart} setCart={setCart} />
      </section>

      <section id="cart" className="section light-section">
        <div className="section-header">
          <p>Your selected items</p>
          <h2>Order Cart</h2>
        </div>
        <Cart cart={cart} setCart={setCart} />
      </section>

      <section id="customer" className="section customer-section">
        <div className="section-header">
          <p>Join ChaiKafe</p>
          <h2>Create Customer Account</h2>
        </div>
        <CreateUser />
      </section>

      <section className="offers-section">
        <div className="section-header">
          <p>Limited Time Deals</p>
          <h2>Today's Special Offers</h2>
        </div>

        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-badge">20% OFF</div>
            <h3>Masala Chai Combo</h3>
            <p>Masala chai + crispy samosa combo with authentic taste.</p>
            <span>₹45</span>
          </div>

          <div className="offer-card">
            <div className="offer-badge">Best Seller</div>
            <h3>Sandwich Delight</h3>
            <p>Fresh sandwich with hot ginger tea.</p>
            <span>₹79</span>
          </div>

          <div className="offer-card">
            <div className="offer-badge">Hot Deal</div>
            <h3>Evening Snack Box</h3>
            <p>Puff + chai + samosa perfect evening combo.</p>
            <span>₹99</span>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2>Why ChaiKafe?</h2>
        <div className="why-grid">
          <div>
            <h3>☕ Fresh Chai</h3>
            <p>Every cup is brewed with authentic Indian flavors.</p>
          </div>
          <div>
            <h3>⚡ Fast Orders</h3>
            <p>Real-time menu and cart experience powered by APIs.</p>
          </div>
          <div>
            <h3>🚀 DevOps Ready</h3>
            <p>Docker, Jenkins, SonarQube, Trivy, and cloud deployment.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section-header">
          <p>Customer Reviews</p>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Best chai experience I had online. Smooth ordering and beautiful UI.”
            </p>

            <div className="review-user">
              <img src="/images/user1.png" alt="User" />
              <div>
                <h4>Rahul Sharma</h4>
                <span>Tea Lover</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Authentic snacks and super fast cart experience powered by DevOps.”
            </p>

            <div className="review-user">
              <img src="/images/user2.png" alt="User" />
              <div>
                <h4>Sneha Reddy</h4>
                <span>Food Blogger</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="review-stars">★★★★★</div>
            <p>
              “Modern café website with real-time deployment and cloud-native setup.”
            </p>

            <div className="review-user">
              <img src="/images/user3.png" alt="User" />
              <div>
                <h4>Arjun Verma</h4>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="orders" className="section light-section">
        <div className="section-header">
          <p>Order Tracking</p>
          <h2>Customer Orders</h2>
        </div>
        <Orders />
      </section>

      <footer className="footer">
        <h3>☕ ChaiKafe</h3>
        <p>End-to-End Three-Tier DevOps Project</p>
        <p>Built with React, Spring Boot, PostgreSQL, Docker, Jenkins and AWS.</p>
      </footer>
    </div>
  );
}

export default App;
