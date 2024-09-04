import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { DiCodeigniter } from "react-icons/di";

function LatestNews() {
  const { allNews } = useSelector((state) => state.news);

  const latestNews = allNews
    .filter((news) => news.type === "big-news")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 10); // Increase the slice as needed to have more news items

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const newsChunks = [];
  for (let i = 0; i < latestNews.length; i += 5) {
    newsChunks.push(latestNews.slice(i, i + 5));
  }

  return (
    <div className="my-10 p-1">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {newsChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
              <div className="col-span-2">
                <Link to={`/${chunk[0]?.slug}`} className="relative">
                  <img
                    src={chunk[0]?.images[0]?.url}
                    alt=""
                    className="max-h-[340px] w-full object-cover"
                  />
                  <p className="font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-5">
                    {truncateText(chunk[0]?.title, 10)}
                    <p>{chunk[0]?.createAt}</p>
                  </p>
                </Link>
              </div>
              <div className="col-span-2 hidden lg:grid grid-cols-2 gap-5 max-h-[200px] lg:max-w-[1200px]">
                {chunk.slice(1, 5).map((news) => (
                  <Link
                    to={`/${news?.slug}`}
                    key={news._id}
                    className="mb-4 flex gap-2 relative"
                  >
                    <img
                      src={news?.images[0]?.url}
                      alt=""
                      className="max-h-[160px] min-[150px] w-full object-cover"
                    />
                    <p className="text-[10px] font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-2">
                      {truncateText(news?.title, 10)}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="flex gap-4 overflow-x-auto max-h-[190px] whitespace-nowrap lg:hidden">
                {chunk.slice(1).map((news) => (
                  <Link
                    to={`/${news?.slug}`}
                    key={news._id}
                    className="mb-4 gap-2 relative inline-block"
                  >
                    <img
                      src={news?.images[0]?.url}
                      alt=""
                      className="min-w-[150px] w-full object-cover"
                    />
                    <p className="text-[10px] font-semibold absolute bottom-0 text-white text-center bg-black bg-opacity-60 w-full py-2 px-2">
                      {truncateText(news?.title, 5)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LatestNews;
