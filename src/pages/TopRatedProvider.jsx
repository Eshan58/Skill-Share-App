import { useState, useEffect } from "react";


const TopRatedProvider = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/skills.json");
        if (!response.ok) {
          throw new Error("Failed to fetch providers data");
        }
        const skills = await response.json();

        // Process data to get unique providers with their stats
        const providerMap = new Map();

        skills.forEach((skill) => {
          if (!providerMap.has(skill.providerName)) {
            providerMap.set(skill.providerName, {
              name: skill.providerName,
              email: skill.providerEmail,
              image: skill.providerImage || "/images/default-avatar.jpg",
              rating: skill.providerRating || skill.rating, // Fallback to skill rating
              skillsCount: 0,
              studentsTaught: skill.studentsTaught || 0,
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

        // Sort by rating (highest first) and get top 6
        const topProviders = providersList
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 6);

        setProviders(topProviders);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setError("Failed to load top providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container py-12">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-center text-gray-600">Loading top providers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container py-12 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="top-providers-section py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Top Rated Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from the best instructors in our community
          </p>
        </div>

        <div className="providers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {providers.map((provider, index) => (
            <div
              key={provider.name}
              className="provider-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative border border-gray-100"
            >
              <div className="provider-badge absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                #{index + 1}
              </div>

              <div className="provider-info">
                <div className="flex items-center mb-4">
                  <div className=" mx-auto">
                    <h3 className="provider-name text-xl font-semibold text-gray-800">
                      {provider.name}
                    </h3>
                    <div className="provider-rating flex items-center gap-2">
                      <span className="stars text-yellow-400">
                        {"⭐".repeat(Math.floor(provider.averageRating))}
                      </span>
                      <span className="rating-text text-gray-600 font-medium">
                        {provider.averageRating}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="provider-skills mb-4">
                  <span className="skills-label block text-sm font-medium text-gray-700 mb-2">
                    Teaches:
                  </span>
                  <div className="skills-list flex flex-wrap gap-2">
                    {provider.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {provider.skills.length > 2 && (
                      <span className="skill-tag more bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        +{provider.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="view-profile-btn flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedProvider;
