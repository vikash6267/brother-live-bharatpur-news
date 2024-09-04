import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { fetchSingleSubCategory } from "../services/operations/admin";
import CricketLive from "../components/core/Home/RightSide/CricketLive";
import NewsActive from "../components/core/Home/RightSide/NewsActive";
import Contact from "../components/core/singleNews/Contact";
import { useSelector } from "react-redux";

const SubCategoryPage = () => {
  const [category, setCategory] = useState(null);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const { id } = useParams();

  const fetchCategoryData = async (id, currentPage, itemsPerPage) => {
    try {
      const response = await fetchSingleSubCategory(
        id,
        currentPage,
        itemsPerPage
      );
      setCategory(response.response.subCategories);
      setNews(response.response.news);
      setTotalPages(Math.ceil(response.pagination.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData(id, currentPage, itemsPerPage);
  }, [id, currentPage]);


  const { allNews } = useSelector((state) => state.news);

  const dharm = allNews
  .filter((news) => news?.category?._id === "66bdc954433ab78f130e4a0b")
  .sort((a, b) => new Date(b.publish) - new Date(a.publish))
  .slice(0, 9);
const vyapar = allNews
  .filter((news) => news?.category?._id === "66bdc944433ab78f130e4a02")
  .sort((a, b) => new Date(b.publish) - new Date(a.publish))
  .slice(0, 9);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid date"
      : format(date, "MMMM d, yyyy h:mm a");
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 10) {
      // Show all pages if total pages are 10 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 mx-1 border ${
              i === currentPage
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // First 3 pages
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 mx-1 border ${
              i === currentPage
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {i}
          </button>
        );
      }

      // Ellipsis in between
      if (currentPage > 5) {
        pageNumbers.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }

      // Last 3 pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 mx-1 border ${
              i === currentPage
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* News Details */}
        <div className="lg:w-[75%] w-full flex flex-col">
          <div>
            <div className="flex justify-between mb-4 relative">
              <p className="min-w-full min-h-[1px] bg-[#ed0302] absolute bottom-0"></p>
              <p className="flex items-center gap-2 font-bold text-lg text-black p-2 ">
                {category?.name}
              </p>
            </div>

            <div>
              {/* News */}
              <div>
                <div className="flex gap-3 grid-cols-1 mt-8 p-2 flex-col">
                  {news.length > 0 ? (
                    news?.map((currElem) => {
                      const strippedDescription = stripHtmlTags(
                        currElem.description
                      );
                      const truncatedDescription = truncateText(
                        strippedDescription,
                        25
                      );

                      return (
                        <Link to={`/${currElem?.slug}`} key={currElem._id}>
                          <div className="flex gap-3">
                            <img
                              src={currElem?.images[0]?.url}
                              alt={currElem.title}
                              className="w-[125px]"
                            />
                            <div>
                              <p className="text-wrap mt-2 text-[20px]">
                                {truncateText(currElem.title, 10)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(currElem.createdAt)}
                              </p>
                              <p className="text-wrap mt-2 text-[16px] leading-8 lg:block hidden">
                                {truncatedDescription}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-center font-bold text-xl">
                      No news found...
                    </p>
                  )}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-4">
                {renderPageNumbers()}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 mx-1 border ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-white text-black"
                  }`}
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 mx-1 border ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-white text-black"
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Contact />
          </div>
        </div>

        {/* New News */}
        <div className="lg:w-[30%]">
          <NewsActive />
          <div className="mt-[50px]">
            <div className="flex justify-between mb-4 relative">
              <p className="min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0"></p>
              <p className="flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative">
                Cricket Score
              </p>
            </div>
            <div>
              <CricketLive />
            </div>
          </div>






          
             {/* <div>
        <div className="mt-[50px]">
        <div className=" flex justify-between mb-4 relative">
                <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
                <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                  {" "}
                  व्यापार
                </p>
            
              </div>

          <div>
          

          <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
          {vyapar?.map((currElem, index) => (
            <Link to={`/${currElem?.slug}`} key={currElem._id}>
              <div className="flex gap-3">
                <img
                  src={currElem?.images[0]?.url}
                  alt=""
                  className="w-[105px]"
                />
                <p className="text-wrap mt-2 text-sm">
                  {truncateText(currElem.title, 10)}
                </p>
              </div>
            </Link>
          ))}
        </div>
          </div>
        </div>
        </div> */}
        {/* Dharm And JYotishi */}

        <div>
        <div className="mt-[50px]">
        <div className=" flex justify-between mb-4 relative">
                <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
                <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                  {" "}
                  धर्म एवं ज्योतिष
                </p>
            
              </div>

          <div>
          

          <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
          {dharm?.map((currElem, index) => (
            <Link to={`/${currElem?.slug}`} key={currElem._id}>
              <div className="flex gap-3">
                <img
                  src={currElem?.images[0]?.url}
                  alt=""
                  className="w-[105px]"
                />
                <p className="text-wrap mt-2 text-sm">
                  {truncateText(currElem.title, 10)}
                </p>
              </div>
            </Link>
          ))}
        </div>
          </div>
        </div>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;
