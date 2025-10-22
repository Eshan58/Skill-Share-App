import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const TopRatedProvider = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/skills.json");
        const skills = await response.json();

        // Process data to get unique providers with their stats
        const providerMap = new Map();

        skills.forEach((skill) => {
          if (!providerMap.has(skill.providerName)) {
            providerMap.set(skill.providerName, {
              name: skill.providerName,
              email: skill.providerEmail,
              image: skill.providerImage,
              rating: skill.providerRating,
              skillsCount: 0,
              studentsTaught: skill.studentsTaught,
              skills: [],
              totalRating: 0,
              skillCount: 0,
            });
          }

          const provider = providerMap.get(skill.providerName);
          provider.skillsCount++;
          provider.skills.push(skill.skillName);
          provider.totalRating += skill.rating;
          provider.skillCount++;
        });

        // Calculate average rating and sort providers
        const providersList = Array.from(providerMap.values()).map(
          (provider) => ({
            ...provider,
            averageRating: (provider.totalRating / provider.skillCount).toFixed(
              1
            ),
          })
        );

        // Sort by rating (highest first) and get top 5
        const topProviders = providersList
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 6);

        setProviders(topProviders);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading top providers...</p>
      </div>
    );
  }

  return (
    <div className="top-providers-section">
      <div className="section-header">
        <h2>Top Rated Providers</h2>
        <p>Learn from the best instructors in our community</p>
      </div>

      <div className="providers-grid">
        {providers.map((provider, index) => (
          <div key={provider.name} className="provider-card">
            <div className="provider-badge">#{index + 1}</div>

            <div className="provider-info">
              <h3 className="provider-name">{provider.name}</h3>
              <div className="provider-rating">
                <span className="stars">
                  {"⭐".repeat(Math.floor(provider.averageRating))}
                </span>
                <span className="rating-text">{provider.averageRating}/5</span>
              </div>

              {/* <div className="provider-stats">
                <div className="stat">
                  <span className="stat-value">{provider.skillsCount}</span>
                  <span className="stat-label">Skills</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{provider.studentsTaught}+</span>
                  <span className="stat-label">Students</span>
                </div>
              </div> */}

              <div className="provider-skills">
                <span className="skills-label">Teaches:</span>
                <div className="skills-list">
                  {provider.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {provider.skills.length > 2 && (
                    <span className="skill-tag more">
                      +{provider.skills.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <button className="view-profile-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <div className="social-section">
        <h3>Follow Us</h3>
        <div className="flex justify-center items-center gap-3">
          <a href="#" className="social-link flex items-center gap-1">
            <FaSquareFacebook />
            Facebook
          </a>
          <a href="#" className="social-link flex items-center gap-1">
            <FaInstagram /> Instagram
          </a>
          <a href="#" className="social-link flex items-center gap-1">
            <FaTwitter /> Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProvider;
