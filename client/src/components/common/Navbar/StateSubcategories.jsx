import React, { useEffect, useState } from "react";
import { fetchCategory } from "../../../services/operations/admin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StateSubcategories = () => {
  const { category } = useSelector((state) => state.news);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const categoriesData = await fetchCategory();
        console.log("Fetched categories data:", categoriesData);

        // Find the "राज्य" category
        const stateCategory = categoriesData?.categories.find(
          (cat) => cat.name.trim() === "राज्य"
        );

        if (stateCategory) {
          setSubCategories(stateCategory.subCategories || []);
        } else {
          setSubCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    if (category.length !== 0) {
      // Find the "राज्य" category from existing data
      const stateCategory = category.find((cat) => cat.name.trim() === "राज्य");

      if (stateCategory) {
        setSubCategories(stateCategory.subCategories || []);
      } else {
        setSubCategories([]);
      }
      setLoading(false); // No need to fetch data if `category` is not empty
    } else {
      fetchCategories();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="relative p-4 text-center text-gray-600">Loading...</div>
    );
  }

  if (error) {
    return <div className="relative p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="relative bg-gray-200 p-4 rounded-md shadow-md">
      {subCategories.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-w-7xl mx-auto">
          {subCategories.map((sublink, subIndex) => (
            <Link
              key={subIndex}
              to={`/subcategory/${sublink?._id}`}
              className="block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              {sublink?.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No subcategories available
        </div>
      )}
    </div>
  );
};

export default StateSubcategories;
