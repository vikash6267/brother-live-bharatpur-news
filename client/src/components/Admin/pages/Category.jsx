import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  fetchCategory,
  createCategory,
  deleteCategory,
  fetchSingleCategory,
  updateCategory,
  imageUpload,
} from "../../../services/operations/admin";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

function Category() {
  const [openCreate, setCreate] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  // const[displayCate,setCat] = useState([])
  const [editCategory, setEditCategory] = useState({
    name: "",
    description: "",
    // image: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    // image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      await createCategory(newCategory);
      // setCreate(false);
      setNewCategory({ name: "", description: "" });
      const response = await fetchCategory();
      setCategories(response?.categories);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditCategory = async (id) => {
    try {
      const response = await fetchSingleCategory(id);
      setEditCategory(response.category);
      setEditModal(true);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleUpdateCategory = async (id) => {
    try {
      await updateCategory(id, editCategory);
      setEditModal(false);
      setEditCategory({ name: "", description: "" });
      const response = await fetchCategory();
      setCategories(response?.categories);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId, token);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error);
      // Optionally handle error display to the user
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Categories</h4>
      </div>

      <div className="flex justify-end mb-4">
        {user?.permissions?.canAdd && (
          <button
            onClick={() => setCreate(!openCreate)}
            className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            <FaPlusCircle /> Create Category
          </button>
        )}
      </div>

      {openCreate && (
        <div className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create Category</h5>
          <input
            type="text"
            placeholder="Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />

          {/* <div> */}
          {/* Image Upload */}
          {/* <div className="space-y-2">
              <label className="block font-medium text-gray-700">
                Upload Images
              </label>
              <div className="bg-white border-2 border-blue-600 p-4">
                <Dropzone
                  onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="text-center">
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div> */}

          {/* Display Uploaded Images */}
          {/* <div className="flex gap-4 mt-4">
                <div className="relative">
                  {newCategory.image !== "" && (
                    <img
                      src={newCategory.image}
                      alt=""
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div> */}

          <button
            onClick={handleCreateCategory}
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
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-100">
                <td className="py-4 px-6">{category.name}</td>
                <td className="py-4 px-6">{category.description}</td>

                <td className="py-4 px-6 text-center">
                  {user?.permissions?.canEdit && (
                    <button
                      onClick={() => handleEditCategory(category._id)}
                      className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none"
                    >
                      Edit
                    </button>
                  )}
                  {user?.permissions?.canDelete && (
                    <button
                      onClick={() => handleDelete(category._id)}
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

      {openEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h5 className="text-xl font-semibold mb-2">Edit Category</h5>
            <input
              type="text"
              placeholder="Name"
              value={editCategory?.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={editCategory?.description}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  description: e.target.value,
                })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />

            <div className="flex justify-end">
              <button
                onClick={() => handleUpdateCategory(editCategory?._id)}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => setEditModal(false)}
                className="p-2 bg-gray-600 text-white rounded-lg ml-2 hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
