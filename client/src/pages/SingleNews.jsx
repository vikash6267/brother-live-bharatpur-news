import React, { useEffect, useState } from "react";
import { getSingleNews } from "../services/operations/admin";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { FaClock } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Contact from "../components/core/singleNews/Contact";
import NewsActive from "../components/core/Home/RightSide/NewsActive";
import { useSelector } from "react-redux";
import CricketLive from "../components/core/Home/RightSide/CricketLive";

function SingleNews() {
  const { allNews } = useSelector((state) => state.news);

  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const maharastra = allNews
    .filter((news) => news?.category?._id === "66d7f9cfdeb67bcc49075966")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);
  const internation = allNews
    .filter((news) => news?.category?._id === "66d7fa00deb67bcc4907596e")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);
  const gunha = allNews
    .filter((news) => news?.category?._id === "66d7fa11deb67bcc49075976")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);

  const rajki = allNews
    .filter((news) => news?.category?._id === "66d7fa08deb67bcc49075972")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);
  const karmannu = allNews
    .filter((news) => news?.category?._id === "66d7fa18deb67bcc4907597a")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);
  const khel = allNews
    .filter((news) => news?.category?._id === "66d7fa20deb67bcc4907597e")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 2);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getSingleNews(id);
        setNews(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return format(date, "MMMM d, yyyy h:mm a");
  };

  return (
    <div className=" max-w-7xl mx-auto p-4">
      <div className=" flex flex-col lg:flex-row gap-5 ">
        {/* News Details */}
        <div className=" lg:w-[75%]  w-full ">
          <div>
            <div>
              <p className=" font-semibold text-2xl font-sans">{news?.title}</p>
              <p>
                {news?.createdAt
                  ? formatDate(news.createdAt)
                  : "Date not available"}
              </p>
            </div>

            <div className="flex space-x-4 mt-4">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" p-2 bg-blue-800 rounded-lg"
              >
                <FaFacebookF className="  text-white" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500 rounded-lg"
              >
                <FaTwitter className="text-white" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-400 rounded-lg"
              >
                <FaLinkedinIn className="text-blue-700" />
              </a>
              <a
                href={`https://wa.me/?text=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-600 rounded-lg"
              >
                <FaWhatsapp className="text-white" />
              </a>
              <a
                href={`mailto:?subject=Check this out&body=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-600 rounded-lg"
              >
                <FaEnvelope className="text-gray-100" />
              </a>
            </div>
          </div>
          {/* Main Image and Description */}
          <div className="my-8">
            {/* First Image */}
            <div className="float-left md:w-1/3 w-full md:mr-6 mb-4">
              {news?.images?.[0] && (
                <img
                  src={news.images[0].url}
                  alt=""
                  className="w-full h-auto object-cover rounded-md"
                />
              )}
            </div>

            <div className="leading-7">
              <span className="font-bold ">
                {news?.location} {" ।"}
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: news?.description }}
              ></span>
            </div>
          </div>
          Additional Images
          {news?.images?.slice(1).length > 0 && (
            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.images.slice(1).map((imge, index) => (
                <img
                  src={imge.url}
                  alt=""
                  key={index}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
            </div>
          )}
          <Contact />
        </div>

        {/* Sidebar */}
        <div className=" lg:w-[30%]">
          <div className="mt-[50px]">
            <div className=" flex justify-between mb-4 relative">
              <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
              <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                Cricket Score
              </p>
            </div>

            <div>
              <CricketLive />
            </div>
          </div>

          {/* Dharm And Jyotishi */}
          <div>
            <div className="mt-[50px]">
              <div className=" flex justify-between mb-4 relative">
                <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
                <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                  महाराष्ट्र
                </p>
              </div>

              <div>
                <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
                  {maharastra?.map((currElem, index) => (
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
          <div>
            <div className="mt-[50px]">
              <div className=" flex justify-between mb-4 relative">
                <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
                <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                  आंतरराष्ट्रीय
                </p>
              </div>

              <div>
                <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
                  {internation?.map((currElem, index) => (
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
          <div>
            <div className="mt-[50px]">
              <div className=" flex justify-between mb-4 relative">
                <p className=" min-w-full min-h-[2px] bg-[#ed0302] absolute bottom-0 "></p>
                <p className=" flex items-center gap-2 font-bold text-lg bg-[#ed0302] text-white p-2 relative wf">
                  गुन्हा
                </p>
              </div>

              <div>
                <div className="flex gap-3 grid-cols-1  mt-8 p-2 flex-col">
                  {gunha?.map((currElem, index) => (
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
}

export default SingleNews;
