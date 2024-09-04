import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function NewsActive({ name1, name2 }) {
  const [activIndex, setNewsActive] = useState(0);
  const { allNews } = useSelector((state) => state.news);

  const recentNews = allNews
    .filter((news) => news?.type === "recent-news")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 25);

  const top = allNews
    .filter((news) => news?.type === "top-news")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 25);
  const Interview = allNews
    .filter((news) => news?.type === "Interview")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 25);

  const ground = allNews
    .filter((news) => news?.type === "ground-report")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 25);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return format(date, "MMMM d, yyyy h:mm a");
  };
  return (
    <>
      <div className=" grid grid-cols-2 justify-between mb-4 relative">
        <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
        <button
          onClick={() => setNewsActive(0)}
          className={`flex items-center gap-2 font-bold text-lg ${
            activIndex == 0 ? "bg-[#ed0302] text-white" : "text-black"
          }  p-2 relative wf`}
        >
          {" "}
          {name1}
        </button>

        <button
          onClick={() => setNewsActive(1)}
          className={`flex items-center gap-2 font-bold text-lg ${
            activIndex == 1 ? "bg-[#ed0302] text-white" : "text-black"
          }  p-2 relative wf`}
        >
          {" "}
          {name2}
        </button>
      </div>

      {name1 === "ताज़ा खबरें" && (
        <div className=" max-h-[80vh] overflow-y-scroll min-h-[80vh]">
          {activIndex == 0 && (
            <div className="flex gap-3 grid-cols-1 max-h-[50px] mt-8 p-2 flex-col">
              {recentNews?.map((currElem, index) => (
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
          )}

          {activIndex == 1 && (
            <div className="flex gap-3 grid-cols-1 max-h-[50px] mt-8 p-2 flex-col">
              {top?.map((currElem, index) => (
                <Link to={`/${currElem?.slug}`} key={currElem._id}>
                  <div className="flex gap-3 flex-col">
                    <p className="text-wrap mt-2 text-sm underline text-blue-700  ">
                      {truncateText(currElem.title)}
                    </p>
                    <p>
                      {currElem?.createdAt
                        ? formatDate(currElem.createdAt)
                        : "Date not available"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {name1 === "विशेष इंटरव्यू" && (
        <>
          <div className=" max-h-[80vh] overflow-y-scroll min-h-[80vh]">
            {activIndex == 0 && (
              <div className="flex gap-3 grid-cols-1 max-h-[50px] mt-8 p-2 flex-col">
                {Interview?.map((currElem, index) => (
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
            )}

            {activIndex == 1 && (
              <div className="flex gap-3 grid-cols-1 max-h-[50px] mt-8 p-2 flex-col">
                {ground?.map((currElem, index) => (
                  <Link to={`/${currElem?.slug}`} key={currElem._id}>
                    <div className="flex gap-3 flex-col">
                      <p className="text-wrap mt-2 text-sm underline text-blue-700  ">
                        {truncateText(currElem.title)}
                      </p>
                      <p>
                        {currElem?.createdAt
                          ? formatDate(currElem.createdAt)
                          : "Date not available"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default NewsActive;
