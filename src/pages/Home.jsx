import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopRatedProviders from "../pages/TopRatedProvider";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/skills.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const featuredCategories = categories.slice(0, 20);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">
        Featured Skills ({featuredCategories.length})
      </h1>

      {/* Responsive Grid Container */}
      <div className="cards-grid">
        {featuredCategories.map((category) => (
          <div key={category.skillId} className="skill-card">
            <img
              src={category.image}
              alt={category.skillName}
              className="skill-card-image"
            />
            <div className="skill-card-content">
              <h3 className="skill-card-title">{category.skillName}</h3>
              <p className="skill-card-rating">⭐ {category.rating}</p>
              <p className="skill-card-price">${category.price}</p>
              <Link to={`/skill/${category.skillId}`} className="show-more-btn">
                Show More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <TopRatedProviders />
    </div>
  );
};

export default Home;
