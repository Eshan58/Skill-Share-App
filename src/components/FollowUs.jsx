import React from "react";
import { Link } from "react-router-dom";
import {
  FaSquareFacebook,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaUsers,
  FaRocket,
} from "react-icons/fa6";

const FollowUs = () => {
  return (
    <div className="follow-us-section">
      {/* Background Elements */}
      <div className="bg-animation-1"></div>
      <div className="bg-animation-2"></div>

      <div className="container-max">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="community-badge">
            <FaUsers className="text-pink-300 text-sm" />
            <span className="text-white text-sm font-medium">
              Join 10K+ Community
            </span>
          </div>

          <h2 className="follow-us-title">Connect With Us</h2>

          <p className="follow-us-description">
            Follow our journey and be the first to get updates, exclusive
            content, and community insights. Let's grow together!
            <FaHeart className="inline text-pink-400 mx-2 animate-pulse" />
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="social-grid">
          {/* Facebook Card */}
          <Link
            to="https://www.facebook.com/"
            className="social-card social-card-facebook group"
          >
            <div className="animated-border animated-border-facebook">
              <div className="animated-border-inner"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="social-icon-container">
                <FaSquareFacebook className="social-icon text-2xl sm:text-3xl md:text-4xl" />
              </div>

              <h3 className="social-card-title">Facebook</h3>
              <p className="social-card-description">
                Join our community for discussions and updates
              </p>

              <div className="social-cta">
                <span>Follow Now</span>
                <FaRocket className="social-cta-icon" />
              </div>
            </div>
          </Link>

          {/* Instagram Card */}
          <Link
            to="https://www.instagram.com/"
            className="social-card social-card-instagram group"
          >
            <div className="animated-border animated-border-instagram">
              <div className="animated-border-inner"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="social-icon-container">
                <FaInstagram className="social-icon text-2xl sm:text-3xl md:text-4xl" />
              </div>

              <h3 className="social-card-title">Instagram</h3>
              <p className="social-card-description">
                See behind the scenes and visual stories
              </p>

              <div className="social-cta">
                <span>Follow Now</span>
                <FaRocket className="social-cta-icon" />
              </div>
            </div>
          </Link>

          {/* Twitter Card */}
          <Link
            to="https://x.com/"
            className="social-card social-card-twitter group"
          >
            <div className="animated-border animated-border-twitter">
              <div className="animated-border-inner"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="social-icon-container">
                <FaTwitter className="social-icon text-2xl sm:text-3xl md:text-4xl" />
              </div>

              <h3 className="social-card-title">Twitter</h3>
              <p className="social-card-description">
                Real-time updates and quick interactions
              </p>

              <div className="social-cta">
                <span>Follow Now</span>
                <FaRocket className="social-cta-icon" />
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Active Support</div>
          </div>
          <div className="stat-item stat-item-wide md:stat-item-wide">
            <div className="stat-number">100%</div>
            <div className="stat-label">Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
