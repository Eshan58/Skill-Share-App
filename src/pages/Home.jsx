import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  const featuredCategories = categories.slice(0, 8);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Featured Skills ({featuredCategories.length})</h1>
      <div className="cards-container">
        {featuredCategories.map((category) => (
          <div key={category.skillId} className="card">
            <img src={category.image} alt={category.skillName} />
            <h3>{category.skillName}</h3>
            <p>Rating: {category.rating}</p>
            <p>Price: ${category.price}</p>
            {/* <p>Slots: {category.slotsAvailable}</p> */}
            <Link to={`/skill/${category.skillId}`} className="show-more-btn">
              Show More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
