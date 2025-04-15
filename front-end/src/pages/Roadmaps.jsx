import { useState } from "react";
import { useGetRoadmaps } from "../hooks/courses/useGetRoadmaps";
import { Link } from "react-router-dom";
function Roadmaps() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    roadmaps: { categories, roadmaps } = {},
    isLoading,
    error,
  } = useGetRoadmaps();
  console.log(roadmaps);
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  const filteredRoadmaps =
    selectedCategory === "all"
      ? roadmaps
      : roadmaps.filter((roadmap) => roadmap.category === selectedCategory);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-screen">
      <div className="container mx-auto flex h-full gap-8 p-8">
        <aside className="w-64 rounded-3xl bg-white/10 p-4 text-center text-white">
          <nav aria-label="Roadmap Categories">
            <ul className="flex flex-col gap-4">
              <li>
                <button
                  className={`to-primary-600 from-primary-800 w-full cursor-pointer rounded-full px-4 py-2 capitalize transition-colors duration-200 hover:bg-gradient-to-r ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r"
                      : "bg-blue-500/80"
                  }`}
                  onClick={() => handleCategoryClick("all")}
                >
                  All categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`to-primary-600 from-primary-800 w-full cursor-pointer rounded-full px-4 py-2 capitalize transition-colors duration-200 hover:bg-gradient-to-r ${
                      selectedCategory === category
                        ? "bg-gradient-to-r"
                        : "bg-blue-500/80"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="flex-1 rounded-3xl bg-white/10">
          <div className="grid h-[calc(100vh-8rem)] grid-cols-1 justify-items-center gap-4 overflow-y-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoadmaps.map((roadmap) => (
              <Link to={`/roadmaps/${roadmap._id}`} key={roadmap._id}>
                <div
                  key={roadmap._id}
                  className="bg-footer-900/80 max-w-80 space-y-4 rounded-lg p-4"
                >
                  <img
                    src={roadmap.image}
                    alt={roadmap.name}
                    className="h-48 w-full object-cover"
                  />
                  <h3 className="text-center text-lg font-bold text-white">
                    {roadmap.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmaps;
