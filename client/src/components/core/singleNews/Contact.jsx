import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { contact } from "../../../services/operations/user";
import { toast } from "react-toastify";

const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, result: num1 + num2 };
};

const Contact = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());

  useEffect(() => {
    setCaptcha(generateCaptcha()); // Generate new captcha on component mount
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      location: "",
      message: "",
      captchaAnswer: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      location: Yup.string().required("Location is required"),
      message: Yup.string().required("Message is required"),
      captchaAnswer: Yup.number()
        .required("Please solve the captcha")
        .equals([captcha.result], "Captcha is incorrect"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await contact(values);
        if (result) {
          setCaptcha(generateCaptcha());
          resetForm();
        }
      } catch (error) {
        toast.error("Failed to submit contact form");
      }
    },
  });

  return (
    <div className="">
      <h2 className="text-lg font-semibold  bg-red-600  w-fit text-white px-3 py-1">
        आपकी राय
      </h2>
      <hr className="bg-red-600 h-[2px] -mt-[2px]" />
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="font-bold">
            कमेंट
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-2 py-3 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-600"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.errors.message ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.message}
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="font-bold">
              नाम
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 py-3 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-600"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="font-bold">
              ई-मेल
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ई-मेल"
              className="w-full p-2 py-3 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-600"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="font-bold">
            शहर
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="शहर"
            className="w-full p-2 py-3 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-600"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
          {formik.errors.location ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </div>
          ) : null}
        </div>

        <div className="mb-4 relative">
          <span className="absolute bg-gray-200 px-3 py-3 mt-[1px] left-0 top-5 transform -translate-y-1/2 text-sm text-gray-700">
            {captcha.num1} + {captcha.num2} =
          </span>
          <input
            id="captchaAnswer"
            name="captchaAnswer"
            type="text"
            placeholder=""
            className="w-full p-2 pl-20 border py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600"
            onChange={formik.handleChange}
            value={formik.values.captchaAnswer}
          />
          <div className="h-5">
            {formik.errors.captchaAnswer ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.captchaAnswer}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white   focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
