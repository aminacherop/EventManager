import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Event Manager</h1>
        <p>
          Event Manager is your all-in-one solution for planning, managing, and experiencing unforgettable events. Whether it's a tech conference or a music festival, we make it simple to stay organized and connect with your guests.
        </p>
      </section>

      <section className="about-features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Seamless event creation and updates</li>
          <li>✅ Real-time guest management</li>
          <li>✅ Elegant and user-friendly interface</li>
          <li>✅ Searchable guest lists and attendance tracking</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} Event Manager. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default About;
