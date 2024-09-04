import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  createBreakingNews,
  fetchBreakingNews,
  deleteBreakingNews,
} from "../../../services/operations/admin";
import { useSelector } from "react-redux";
import axios from "axios";

function Breaking() {
  const [openCreate, setCreate] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [breakingNewsList, setBreakingNewsList] = useState([]);
  const [breakingNews, setBreakingNews] = useState({
    name: "",
    active: true,
    url: "",
  });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBreakingNewsList = async () => {
      try {
        const response = await fetchBreakingNews();
        setBreakingNewsList(response || []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchBreakingNewsList();
  }, []);

  const handleCreateBreakingNews = async () => {
    try {
      await createBreakingNews(breakingNews, token);
      const response = await fetchBreakingNews();
      setBreakingNewsList(response || []);
      setCreate(false);
      setBreakingNews({ name: "", active: true, url: "" });
    } catch (error) {
      console.error("Error creating breaking news:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBreakingNews(id, token);
      setBreakingNewsList((prevNews) =>
        prevNews.filter((news) => news._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete breaking news:", error);
    }
  };

  const handleActive = async (id, currentActiveStatus) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/breakingNews/update/${id}`,
        { active: !currentActiveStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.success) {
        setBreakingNewsList((prevNews) =>
          prevNews.map((item) =>
            item._id === id ? { ...item, active: !currentActiveStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update news:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Breaking News</h4>
      </div>

      <div className="flex justify-end mb-4">
        {user?.permissions?.canAdd && (
          <button
            onClick={() => setCreate(!openCreate)}
            className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            <FaPlusCircle /> Create Breaking News
          </button>
        )}
      </div>

      {openCreate && (
        <div className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create Breaking News</h5>
          <input
            type="text"
            placeholder="Name"
            value={breakingNews.name}
            onChange={(e) =>
              setBreakingNews({ ...breakingNews, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          {/* <input
            type="text"
            placeholder="URL"
            value={breakingNews.url}
            onChange={(e) =>
              setBreakingNews({ ...breakingNews, url: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          /> */}
          <button
            onClick={handleCreateBreakingNews}
            className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Create
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              {/* <th className="py-3 px-6 text-left">URL</th> */}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {breakingNewsList.map((news) => (
              <tr key={news._id} className="hover:bg-gray-100">
                <td className="py-4 px-6">{news?.name || "N/A"}</td>
                {/* <td className="py-4 px-6">{news?.url || "N/A"}</td> */}
                <td className="py-2 px-6 flex items-center justify-center">
                  <button
                    onClick={() => handleActive(news._id, news.active)}
                    className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none"
                  >
                    {news.active ? "Deactivate" : "Activate"}
                  </button>
                  {user?.permissions?.canDelete && (
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none ml-2"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Breaking;
