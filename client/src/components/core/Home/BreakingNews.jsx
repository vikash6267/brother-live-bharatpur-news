import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { fetchBreakingNews } from "../../../services/operations/admin";

const BreakingNews = () => {
  const [visible, setVisible] = useState(true);
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchBreakingNewsList = async () => {
      try {
        const response = await fetchBreakingNews();
        setBreakingNews(response || []);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchBreakingNewsList();
  }, []);

  return (
    <>
      {visible && (
        <div className="max-w-7xl mx-auto relative bg-yellow-500  overflow-hidden">
          <div className="max-w-7xl mx-auto relative flex items-center">
            <p className="text-[16px] bg-white py-3 sm:text-[20px] lg:text-2xl font-bold text-red-600 px-2 uppercase">
              Breaking News
            </p>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 1500 }}
              loop={true}
              className="flex-1"
            >
              {breakingNews.map(
                (currElem, index) =>
                  currElem.active && (
                    <SwiperSlide key={index}>
                      <div className="bg-yellow-500 text-white px-4 py-1">
                        <p className="text-[14px] sm:text-[18px] lg:text-xl font-semibold text-white">
                          {currElem.name}
                        </p>
                      </div>
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakingNews;
