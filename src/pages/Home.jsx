import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import TopRatedProviders from "../pages/TopRatedProvider";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Home component is rendering");

  useEffect(() => {
    console.log("Home useEffect running");
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...")
        const response = await fetch("/skills.json");
        console.log("Response:", response); 
        const data = await response.json();
        console.log("Categories data:", data);
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
    return <div>Loading...</div>;
  }

  console.log("Rendering categories:", featuredCategories.length); 

  return (
    <div>
      <h1>Featured Skills ({featuredCategories.length})</h1>
      <div className="cards-container">
        {featuredCategories.map((category) => (
          <div key={category.skillId} className="card">
            <img src={category.image} alt={category.skillName} />
            <h3>{category.skillName}</h3>
            <p>⭐Rating: {category.rating}</p>
            <p>Price: ${category.price}</p>
            <Link
              to={`/skill/${category.skillId}`}
              className="show-more-btn text-blue-500"
            >
              Show More
            </Link>
          </div>
        ))}
      </div>

      <TopRatedProviders />
    </div>
  );
};

export default Home;
