import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchCategory,
  imageUpload,
  fetchSubCategory,
  createNews,
  getSingleNews,
  editNews,
} from "../../../services/operations/admin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function AddNews() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // States
  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const maxWords = 3000; // Maximum allowed words
  const [newsID, setNewsID] = useState("");

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput && !formik.values.tag.includes(tagInput)) {
      formik.setFieldValue("tag", [...formik.values.tag, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    formik.setFieldValue(
      "tag",
      formik.values.tag.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleChange = (html) => {
    // Count words
    const text = html.replace(/<[^>]*>?/gm, ""); // Strip HTML tags
    const wordCount = text.split(/\s+/).length;

    // Check if word count exceeds limit
    if (wordCount <= maxWords) {
      setEditorHtml(html);
    } else {
      // Display message or handle exceeding word limit
      alert(`You cannot exceed ${maxWords} words.`);
    }
  };

  // Network Call
  useEffect(() => {
    const fetchCategoryMain = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategoryMain = async () => {
      try {
        const response = await fetchSubCategory();
        setSubCategories(response);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    const fetchNews = async (id) => {
      try {
        const response = await getSingleNews(id);
        setProduct(response);
        setTags(response?.tag);
        console.log(response);
        console.log(response.type);
        setImages(response?.images);
        setEditorHtml(response?.description);
        setNewsID(response?._id);
        formik.setFieldValue("title", response?.title);
        formik.setFieldValue("subtitle", response?.subtitle);
        formik.setFieldValue("location", response?.location);
        formik.setFieldValue("slug", response?.slug);
        formik.setFieldValue("tag", response?.tag);
        formik.setFieldValue("language", response?.language);
        formik.setFieldValue("youtubeurl", response?.youtubeurl);
        formik.setFieldValue("category", response?.category?._id);
        formik.setFieldValue("subcategory", response?.subcategory?._id);
        formik.setFieldValue("type", response?.type);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    if (id) {
      fetchNews(id);
    }
    fetchSubCategoryMain();
    fetchCategoryMain();
  }, [id, location]);

  // Functions
  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    const uploadedImages = response?.map((image) => ({
      public_id: image.asset_id,
      url: image.url,
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const removeImage = (publicId) => {
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );
    setImages(updatedImages);
  };

  // Formik Form Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    // subtitle: Yup.string().required("Sub Title is required"),
    location: Yup.string().required("Location is required"),
    language: Yup.string().required("Language is required"),
    category: Yup.string().required("Category is required"),
    // subcategory: Yup.string().required("Subcategory is required"),
    type: Yup.string().required("Type is required"),
    slug: Yup.string()
      .matches(
        /^[a-zA-Z0-9-_]+$/,
        "Slug can only contain letters, numbers, hyphens, and underscores, and no spaces"
      )
      .required("Custom Url is required"),
    tag: Yup.array()
      .of(Yup.string().required("Tag is required"))
      .required("Tags are required")
      .min(1, "At least one tag is required"),
  });

  // Formik Form Initial Values
  const initialValues = {
    title: product?.title || "",
    subtitle: product?.subtitle || "",
    description: product?.description || "",
    location: product?.location || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    // expire: product?.expire || "",
    images: product?.images || [],
    youtubeurl: product?.youtubeurl || "",
    type: product?.type || "",
    notificationSend: false,
    slug: product?.slug || "",
    tag: product?.tag || [],
  };

  // Formik Form Submission
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", editorHtml);
    formData.append("slug", values.slug);
    formData.append("tag", JSON.stringify(values.tag));
    formData.append("subtitle", values.subtitle);
    formData.append("category", values.category);
    formData.append("language", values.language);
    formData.append("subcategory", values.subcategory);
    formData.append("location", values.location);
    // formData.append("expire", values.expire);
    formData.append("youtubeurl", values.youtubeurl);
    formData.append("images", JSON.stringify(images));
    formData.append("type", values.type);
    formData.append("notificationSend", values.notificationSend); // Add notificationSend

    // Assuming formData is already defined and populated with form data

    if (id) {
      // If id exists, append it to formData
      formData.append("id", newsID);

      // Perform edit operation
      await editNews(formData, token);
    } else {
      // Perform create operation
      await createNews(formData, token);
    }

    // resetForm();
    // setEditorHtml(""); // Clear the ReactQuill editor
    setImages([]); // Clear uploaded images
  };

  // Formik Hook
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // Update subcategories based on selected category
  useEffect(() => {
    const filteredCategory = categories.find(
      (cat) => cat._id === formik.values.category
    );
    setSubCategories(filteredCategory?.subCategories || []);
  }, [formik.values.category, categories]);

  if (!user?.permissions?.canAdd) {
    return (
      <div className="max-w-3xl mx-auto p-4 h-full flex items-center justify-center">
        <FiAlertCircle className="text-red-500 mr-2" size={24} />{" "}
        {/* Adjust size and color as needed */}
        <div>Access denied</div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-4 mb-[100px]">
      <h3 className="text-xl font-bold mb-4">
        {id ? "Edit News" : "Add News"}
      </h3>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Form fields */}
        {/* Title and Subtitle */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="form-input"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subtitle"
              className="block font-medium text-gray-700"
            >
              Sub Title <span className=" text-[11px]">(Optional)</span>
            </label>
            <input
              id="subtitle"
              name="subtitle"
              type="text"
              placeholder="Enter Subtitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subtitle}
              className="form-input"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description *
          </label>
          <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={handleChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["clean"],
              ],
            }}
            className="quill-editor"
          />
        </div>

        {/* Language, Type, Category, Subcategory */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label
              htmlFor="language"
              className="block font-medium text-gray-700"
            >
              Language *
            </label>
            <select
              id="language"
              name="language"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.language}
              className="form-input"
            >
              <option value="">Select Language</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
            </select>
            {formik.touched.language && formik.errors.language && (
              <div className="text-red-500">{formik.errors.language}</div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block font-medium text-gray-700">
              Type *
            </label>
            <select
              id="type"
              name="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              className="form-input"
            >
              <option value="">Select Type</option>
              <option value="all">All</option>
              <option value="top-news">Top News</option>
              <option value="recent-news">Recent News</option>
              <option value="big-news">Big News</option>
              <option value="Interview">Interview</option>
              <option value="ground-report">Ground Report</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500">{formik.errors.type}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block font-medium text-gray-700"
            >
              Category *
            </label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="form-input"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subcategory"
              className="block font-medium text-gray-700"
            >
              Sub Category *
            </label>
            <select
              id="subcategory"
              name="subcategory"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              className="form-input"
            >
              <option value="">Select Sub Category</option>
              {subCategories?.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {formik.touched.subcategory && formik.errors.subcategory && (
              <div className="text-red-500">{formik.errors.subcategory}</div>
            )}
          </div>
        </div>

        {/* Location and Expire Date */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block font-medium text-gray-700"
            >
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter Location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="form-input"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500">{formik.errors.location}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="youtubeurl"
              className="block font-medium text-gray-700"
            >
              YouTube URL <span className=" text-[11px]">(Optional)</span>
            </label>
            <input
              id="youtubeurl"
              name="youtubeurl"
              type="text"
              placeholder="Enter YouTube URL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.youtubeurl}
              className="form-input"
            />
            {formik.touched.youtubeurl && formik.errors.youtubeurl && (
              <div className="text-red-500">{formik.errors.youtubeurl}</div>
            )}
          </div>
          {/* <div className="space-y-2">
            <label htmlFor="expire" className="block font-medium text-gray-700">
              Expire
            </label>
            <input
              id="expire"
              name="expire"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.expire}
              className="form-input"
            />
            {formik.touched.expire && formik.errors.expire && (
              <div className="text-red-500">{formik.errors.expire}</div>
            )}
          </div> */}
        </div>

        {/* YouTube URL */}
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">
              Send Notification <span className=" text-[11px]">(Optional)</span>
            </label>
            <input
              id="notificationSend"
              name="notificationSend"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.notificationSend}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            {formik.touched.notificationSend &&
              formik.errors.notificationSend && (
                <div className="text-red-500">
                  {formik.errors.notificationSend}
                </div>
              )}
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Tag *
              </button>
            </div>
            {formik.touched.tag && formik.errors.tag && (
              <div className="text-red-500">{formik.errors.tag}</div>
            )}
            <div className="mt-2">
              {formik.values.tag.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag, formik)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2">
            <label htmlFor="slug" className="block font-medium text-gray-700">
              Custome URL *
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="Enter Custom URL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug}
              className="form-input"
            />
            {formik.touched.slug && formik.errors.slug && (
              <div className="text-red-500">{formik.errors.slug}</div>
            )}
          </div>
        </div>

        {/* Upload Image */}
        <div className="space-y-2">
          <label htmlFor="images" className="block font-medium text-gray-700">
            Upload Image *
          </label>
          <Dropzone onDrop={uploadImage}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-4 text-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside className="mt-4">
                  <h4>Uploaded Images</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {images?.map((image) => (
                      <div key={image.public_id} className="relative">
                        <img
                          src={image.url}
                          alt="Uploaded"
                          className="h-24 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.public_id)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            {id ? "Update News" : "Add News"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNews;
