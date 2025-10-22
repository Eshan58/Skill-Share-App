import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SkillDetail = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("/skills.json");

        if (!response.ok) {
          throw new Error("Failed to fetch skills data");
        }

        const skills = await response.json();
        const foundSkill = skills.find((s) => s.skillId === parseInt(skillId));

        if (!foundSkill) {
          throw new Error("Skill not found");
        }

        setSkill(foundSkill);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching skill:", err);
      } finally {
        setLoading(false);
      }
    };

    if (skillId) {
      fetchSkillDetails();
    }
  }, [skillId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading skill details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="error-container">
        <h2>Skill Not Found</h2>
        <p>The skill you're looking for doesn't exist.</p>
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="skill-detail-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>

      <div className="skill-detail-card">
        <div className="skill-image-section">
          <img src={skill.image} alt={skill.skillName} />
        </div>

        <div className="skill-info-section">
          <h1>{skill.skillName}</h1>
          <p className="skill-category">{skill.category}</p>

          <div className="skill-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Provider:</span>
              <span className="meta-value">{skill.providerName}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating:</span>
              <span className="meta-value">⭐ {skill.rating}/5</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Price:</span>
              <span className="meta-value price-tag">${skill.price}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Slots Available:</span>
              <span className="meta-value slots-tag">
                {skill.slotsAvailable}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Contact:</span>
              <span className="meta-value contact-email">
                {skill.providerEmail}
              </span>
            </div>
          </div>

          <div className="skill-description">
            <h3>About This Skill</h3>
            <p>{skill.description}</p>
          </div>

          <div className="action-buttons">
            <Link to="/Book">
              <button className="book-now-btn">Book This Session</button>
            </Link>
            <button className="contact-btn">Contact Provider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
