import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBox = ({ isOpen, toggleSearch }) => {
  const { allNews } = useSelector((state) => state.news);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNews = allNews.filter((news) => {
    const title = news.title || "";
    const subtitle = news.subtitle || "";
    const description = news.description || "";

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const truncateText = (text, wordLimit = 18) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="search-box"
      unmountOnExit
    >
      <div className="absolute z-50 right-0 lg:right-10 top-12 mt-2 w-full lg:w-[90%] h-[80vh] bg-gray-100 text-black rounded-lg shadow-lg p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded bg-white"
            placeholder="Search news"
          />
          <button
            onClick={toggleSearch}
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            &#10005; {/* Unicode for 'X' */}
          </button>
        </div>

        {filteredNews.length > 0 ? (
          <ul className="mt-4">
            {filteredNews.map((news) => (
              <li key={news._id} className="mb-4">
                <Link
                  to={`/${news.slug}`}
                  className="flex gap-4 flex-col sm:flex-row"
                  onClick={toggleSearch} // Close search box on click
                >
                  <img
                    src={news?.images[0]?.url}
                    alt={news.title}
                    className="w-full sm:w-32 h-auto object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-base sm:text-xl">
                      {truncateText(news.title)}
                    </h3>
                    {news.subtitle && (
                      <p className="text-sm sm:text-base text-gray-600">
                        {truncateText(news.subtitle, 10)}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-bold text-lg">No news found...</p>
        )}
      </div>
    </CSSTransition>
  );
};

export default SearchBox;
