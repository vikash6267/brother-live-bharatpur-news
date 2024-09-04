import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createAds, setAds, removeAd } from "../../../redux/newsSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function CreateAdd() {
  const [openCreate, setCreate] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    url: "",
    type: "",
  });
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const ads = useSelector((state) => state.news.ads);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getAllAds = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ads/getAll`);
      if (!response?.data?.success) {
        throw new Error(toast.error(response.data.message));
      }
      dispatch(setAds(response?.data?.ads));
      // console.log(response?.data?.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Loading",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        html: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
      });

      const formDataToSend = new FormData();
      formDataToSend.append("url", formData.url);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        `${BASE_URL}/ads/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.close();

      if (response?.data?.success) {
        Swal.fire({
          title: `Ads created successfully!`,
          text: `Have a nice day!`,
          icon: "success",
        });
        dispatch(createAds(response.data.ad));
        setFormData({
          url: "",
          type: "",
          image: "",
        });
      }
    } catch (error) {
      Swal.close();
      toast.error("Oops, something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/ads/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success) {
        dispatch(removeAd(id));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Ads</h4>
      </div>

      <div className="flex justify-end mb-4">
        {user?.permissions?.canAdd && (
          <button
            onClick={() => setCreate(!openCreate)}
            className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            <FaPlusCircle /> Create Ads
          </button>
        )}
      </div>

      {openCreate && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create Ads</h5>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              Url : <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mb-2 p-2 border rounded focus:outline-none"
              name="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Add Type: <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mb-2 p-2 border rounded focus:outline-none"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Add position
              </option>
              <option value="top-add">Top Add</option>
              <option value="right-add">Right Add</option>
              {/* <option value="left-add">Left Add</option> */}
              <option value="buttom-add">Buttom Add</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image:
            </label>
            <input
              className="w-full mb-2 p-2 border rounded focus:outline-none"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Create
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Url</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr
                key={ad._id}
                className="hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                <td className="py-4 px-6">
                  <img
                    src={ad.image}
                    alt=""
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6">
                  <span className="block text-gray-700 font-medium">
                    {ad.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <a
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {ad.url}
                  </a>
                </td>
                <td className="py-4 px-6 text-center">
                  {user?.permissions?.canDelete && (
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none ml-2 transition duration-200 ease-in-out"
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

export default CreateAdd;
