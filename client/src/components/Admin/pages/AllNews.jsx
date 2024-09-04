import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeToggle, deleteNews } from "../../../services/operations/admin";
import { saveNews } from "../../../redux/newsSlice";
import { Link } from "react-router-dom";

const AllNews = () => {
  const { allNews } = useSelector((state) => state?.news);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    console.log(allNews?.[0]?.slug);
  }, [allNews]);

  const handleToggleActive = async (newsId, currentStatus) => {
    const newStatus = !currentStatus;
    const updatedNews = allNews?.map((news) =>
      news?._id === newsId ? { ...news, active: newStatus } : news
    );

    dispatch(saveNews(updatedNews));
    await activeToggle({ newsId, activeStatus: newStatus }, token);
  };

  const handleDelete = async (newsId) => {
    const updatedNews = allNews?.filter((news) => news?._id !== newsId);
    dispatch(saveNews(updatedNews));
    await deleteNews(newsId, token);
  };

  const truncateText = (text, wordLimit = 10) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit) {
      return words?.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNews = allNews?.filter(
    (news) =>
      news?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      news?.slug?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedNews = [...filteredNews]?.sort(
    (a, b) => new Date(b?.publish) - new Date(a?.publish)
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All News</h1>
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subcategory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedNews?.map((news, index) => (
              <tr key={news?._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {news?.images?.length > 0 && (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={news?.images?.[0]?.url}
                      alt={news?.title}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {truncateText(news?.title)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(news?.category?.name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {truncateText(news?.subcategory?.name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news?.language}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news?.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {news?.active ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button
                    onClick={() => handleToggleActive(news?._id, news?.active)}
                    className={`px-4 py-2 font-semibold text-sm ${
                      news?.active
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    } rounded-full shadow-sm`}
                  >
                    {news?.active ? "Deactivate" : "Activate"}
                  </button>
                  {user?.permissions?.canDelete && (
                    <button
                      onClick={() => handleDelete(news?._id)}
                      className="px-4 py-2 font-semibold text-sm bg-gray-500 text-white rounded-full shadow-sm"
                    >
                      Delete
                    </button>
                  )}
                  {user?.permissions?.canEdit && (
                    <Link
                      to={`/admin/addnews/${news?.slug}`}
                      className="px-4 py-2 font-semibold text-sm bg-green-500 text-white rounded-full shadow-sm"
                    >
                      Edit
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNews;
