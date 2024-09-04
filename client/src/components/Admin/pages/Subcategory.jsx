import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  fetchCategory,
  createSubCategory,
  deleteSubCategory,
  fetchSingleSubCategory,
  updateSubCategory,
  fetchSubCategory,
  imageUpload,
} from "../../../services/operations/admin";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

function SubCategory() {
  const [openCreate, setCreate] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { token,user } = useSelector((state) => state.auth);

  const [editSubCategory, setEditSubCategory] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesResponse = await fetchCategory();
        setCategories(categoriesResponse?.categories);

        const subCategoriesResponse = await fetchSubCategory();
        // console.log(subCategoriesResponse)
        setSubCategories(subCategoriesResponse);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleCreateSubCategory = async () => {
    try {
      await createSubCategory(newSubCategory, token);
      // setCreate(false);
      setNewSubCategory({ name: "", description: "", category: "" });
      const subCategoriesResponse = await fetchSubCategory();
      setSubCategories(subCategoriesResponse);
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  const handleEditSubCategory = async (id) => {
    try {
      const response = await fetchSingleSubCategory(id);
      setEditSubCategory(response.subCategory);
      setEditModal(true);
    } catch (error) {
      console.error("Error fetching subcategory:", error);
    }
  };

  const handleUpdateSubCategory = async (id) => {
    try {
      await updateSubCategory(id, editSubCategory, token);
      setEditModal(false);
      setEditSubCategory({
        name: "",
        description: "",
        image: "",
        category: "",
      });
      const subCategoriesResponse = await fetchSubCategory();
      setSubCategories(subCategoriesResponse?.subCategories);
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  // const uploadImage = async (acceptedFiles) => {
  //   const response = await imageUpload(acceptedFiles);

  //   if (openEditModal) {
  //     setEditSubCategory((prevState) => ({
  //       ...prevState,
  //       image: response[0]?.url || "",
  //     }));
  //   } else {
  //     setNewSubCategory((prevState) => ({
  //       ...prevState,
  //       image: response[0]?.url || "",
  //     }));
  //   }
  // };

  const handleDeleteSubCategory = async (subCategoryId) => {
    try {
      await deleteSubCategory(subCategoryId, token);
      setSubCategories((prevSubCategories) =>
        prevSubCategories.filter(
          (subCategory) => subCategory._id !== subCategoryId
        )
      );
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>SubCategories</h4>
      </div>

      <div className="flex justify-end mb-4">
    { user?.permissions?.canAdd &&     <button
          onClick={() => setCreate(!openCreate)}
          className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
        >
          <FaPlusCircle /> Create SubCategory
        </button>}
      </div>

      {openCreate && (
        <div className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create SubCategory</h5>
          <input
            type="text"
            placeholder="Name"
            value={newSubCategory.name}
            onChange={(e) =>
              setNewSubCategory({ ...newSubCategory, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Description"
            value={newSubCategory.description}
            onChange={(e) =>
              setNewSubCategory({
                ...newSubCategory,
                description: e.target.value,
              })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <select
            value={newSubCategory.category}
            onChange={(e) =>
              setNewSubCategory({ ...newSubCategory, category: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

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
                          Drag 'n' drop some files here, or click to select files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div> */}

          {/* Display Uploaded Images */}
          {/* <div className="flex gap-4 mt-4">
                <div className="relative">
                  {newSubCategory.image !== "" && (
                    <img
                      src={newSubCategory.image}
                      alt=""
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  )}
                </div>
              </div>
            </div> */}
          {/* </div> */}

          <button
            onClick={handleCreateSubCategory}
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
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories?.map((subCategory) => (
              <tr key={subCategory._id} className="hover:bg-gray-100">
                <td className="py-4 px-6">{subCategory.name}</td>
                <td className="py-4 px-6">{subCategory.description}</td>
                <td className="py-4 px-6">{subCategory.category?.name}</td>

                <td className="py-4 px-6 text-center">
                  {/* <button
                    onClick={() => handleEditSubCategory(subCategory._id)}
                    className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none"
                  >
                    Edit
                  </button> */}
             {  user?.permissions?.canDelete &&    <button
                    onClick={() => handleDeleteSubCategory(subCategory._id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none ml-2"
                  >
                    Delete
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h5 className="text-xl font-semibold mb-2">Edit SubCategory</h5>
            <input
              type="text"
              placeholder="Name"
              value={editSubCategory?.name}
              onChange={(e) =>
                setEditSubCategory({ ...editSubCategory, name: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={editSubCategory?.description}
              onChange={(e) =>
                setEditSubCategory({
                  ...editSubCategory,
                  description: e.target.value,
                })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            />
            <select
              value={editSubCategory.category}
              onChange={(e) =>
                setEditSubCategory({
                  ...editSubCategory,
                  category: e.target.value,
                })
              }
              className="w-full mb-2 p-2 border rounded focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

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
                    {editSubCategory.image !== "" && (
                      <img
                        src={editSubCategory.image}
                        alt=""
                        className="w-40 h-40 object-cover rounded-lg shadow-md"
                      />
                    )}
                  </div>
                </div>
              </div> */}
            {/* </div> */}

            <div className="flex justify-end">
              <button
                onClick={() => handleUpdateSubCategory(editSubCategory?._id)}
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

export default SubCategory;
