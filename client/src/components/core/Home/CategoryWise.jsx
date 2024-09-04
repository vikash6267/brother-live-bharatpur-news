import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AddSlideBar from "./AddSlideBar";

function CategoryWise() {
  const { allNews } = useSelector((state) => state.news);
  const [newsActive, setNewsActive] = useState(0);

  const all = [...allNews]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3); // Display only 3 news items

  const maharastra = allNews
    .filter((news) => news?.category?._id === "66d7f9cfdeb67bcc49075966")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 3);
  const internation = allNews
    .filter((news) => news?.category?._id === "66d7fa00deb67bcc4907596e")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 4);
  const gunha = allNews
    .filter((news) => news?.category?._id === "66d7fa11deb67bcc49075976")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 4);

  const rajki = allNews
    .filter((news) => news?.category?._id === "66d7fa08deb67bcc49075972")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 4);
  const karmannu = allNews
    .filter((news) => news?.category?._id === "66d7fa18deb67bcc4907597a")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 4);
  const khel = allNews
    .filter((news) => news?.category?._id === "66d7fa20deb67bcc4907597e")
    .sort((a, b) => new Date(b.publish) - new Date(a.publish))
    .slice(0, 4);

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
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Maharashtra Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">महाराष्ट्र</h2>
          <div className="grid gap-4">
            {/* Top news with larger image */}
            {maharastra[0] && (
              <Link to={`/${maharastra[0]?.slug}`} className="relative">
                <img
                  src={maharastra[0]?.images[0]?.url}
                  alt=""
                  className="h-[250px] lg:h-[300px] w-full object-cover"
                />
                <p className="font-semibold text-lg mt-2">
                  {truncateText(maharastra[0]?.title, 10)}
                </p>
                <p className="text-gray-400 text-sm">
                  {formatDate(maharastra[0]?.createdAt)}
                </p>
              </Link>
            )}

            {/* Smaller news items */}
            <div className="grid grid-cols-1 gap-4">
              {maharastra.slice(1).map((news) => (
                <Link
                  to={`/${news?.slug}`}
                  key={news._id}
                  className="flex gap-3"
                >
                  <img
                    src={news?.images[0]?.url}
                    alt=""
                    className="h-[65px] min-w-[110px]"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {truncateText(news?.title, 20)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(news?.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bharat Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">भारत</h2>
          <div className="grid gap-4">
            {/* Top news with larger image */}
            {all[0] && (
              <Link to={`/${all[0]?.slug}`} className="relative">
                <img
                  src={all[0]?.images[0]?.url}
                  alt=""
                  className="h-[250px] lg:h-[300px] w-full object-cover"
                />
                <p className="font-semibold text-lg mt-2">
                  {truncateText(all[0]?.title, 10)}
                </p>
                <p className="text-gray-400 text-sm">
                  {formatDate(all[0]?.createdAt)}
                </p>
              </Link>
            )}

            <div className="grid grid-cols-1 gap-4">
              {all.slice(1).map((news) => (
                <Link
                  to={`/${news?.slug}`}
                  key={news._id}
                  className="flex gap-3"
                >
                  <img
                    src={news?.images[0]?.url}
                    alt=""
                    className="h-[65px] min-w-[110px]"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {truncateText(news?.title, 20)}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(news?.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <AddSlideBar />
      <br />
      <br />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Maharashtra Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">आंतरराष्ट्रीय</h2>

          {/* Smaller news items */}
          <div className="grid lg:grid-cols-2 gap-4">
            {internation.map((news) => (
              <Link to={`/${news?.slug}`} key={news._id} className="grid ">
                <img src={news?.images[0]?.url} alt="" className="" />
                <div>
                  <p className="font-semibold text-sm">
                    {truncateText(news?.title, 20)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(news?.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bharat Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">गुन्हा</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {gunha.map((news) => (
              <Link to={`/${news?.slug}`} key={news._id} className="grid ">
                <img src={news?.images[0]?.url} alt="" className="" />
                <div>
                  <p className="font-semibold text-sm">
                    {truncateText(news?.title, 20)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(news?.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="bg-black">
        <p className="text-center font-bold text-red-600 text-3xl p-5">
          राजकीय
        </p>
        <hr />
        <div className="grid lg:grid-cols-3 p-5 gap-3">
          {rajki.map((news) => (
            <Link to={`/${news?.slug}`} key={news._id} className="grid ">
              <img src={news?.images[0]?.url} alt="" className="" />
              <div>
                <p className=" text-white font-semibold text-sm">
                  {truncateText(news?.title, 20)}
                </p>
                <p className="text-gray-400 text-xs">
                  {formatDate(news?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <br />
      <br />
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Maharashtra Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">करमणूक</h2>

          {/* Smaller news items */}
          <div className="grid lg:grid-cols-2 gap-4">
            {karmannu.map((news) => (
              <Link to={`/${news?.slug}`} key={news._id} className="grid ">
                <img src={news?.images[0]?.url} alt="" className="" />
                <div>
                  <p className="font-semibold text-sm">
                    {truncateText(news?.title, 20)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(news?.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bharat Section */}
        <div className="lg:col-span-1">
          <h2 className="font-bold text-2xl mb-4">खेल</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {khel.map((news) => (
              <Link to={`/${news?.slug}`} key={news._id} className="grid ">
                <img src={news?.images[0]?.url} alt="" className="" />
                <div>
                  <p className="font-semibold text-sm">
                    {truncateText(news?.title, 20)}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(news?.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 p-6 bg-black">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-red-700">
            हाल के पोस्ट
          </h2>
          {all.map((news) => {
            if (news?.type === "top-news") {
              return (
                <Link
                  to={`/${news?.slug}`}
                  key={news._id}
                  className="flex mb-4 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition"
                >
                  <img
                    src={news?.images[0]?.url}
                    alt={news?.title || "News Image"}
                    className="h-[65px] w-[110px] object-cover rounded-lg"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-sm text-red-800">
                      {truncateText(news?.title, 20)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(news?.createdAt)}
                    </p>
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-red-700">
            महाराष्ट्र
          </h2>
          {maharastra.map((news) => (
            <Link
              to={`/${news?.slug}`}
              key={news._id}
              className="flex mb-4 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition"
            >
              <img
                src={news?.images[0]?.url}
                alt={news?.title || "News Image"}
                className="h-[65px] w-[110px] object-cover rounded-lg"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-sm text-red-700">
                  {truncateText(news?.title, 20)}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatDate(news?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-red-700">खेल</h2>
          {khel.map((news) => (
            <Link
              to={`/${news?.slug}`}
              key={news._id}
              className="flex mb-4 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition"
            >
              <img
                src={news?.images[0]?.url}
                alt={news?.title || "News Image"}
                className="h-[65px] w-[110px] object-cover rounded-lg"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-sm text-red-700">
                  {truncateText(news?.title, 20)}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatDate(news?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-red-700">
            अंतर्राष्ट्रीय
          </h2>
          {internation.map((news) => (
            <Link
              to={`/${news?.slug}`}
              key={news._id}
              className="flex mb-4 p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition"
            >
              <img
                src={news?.images[0]?.url}
                alt={news?.title || "News Image"}
                className="h-[65px] w-[110px] object-cover rounded-lg"
              />
              <div className="ml-3 flex-1">
                <p className="font-semibold text-sm text-red-700">
                  {truncateText(news?.title, 20)}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatDate(news?.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryWise;
