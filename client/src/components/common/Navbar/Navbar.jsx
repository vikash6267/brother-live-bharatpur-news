import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaSearch } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { fetchCategory } from "../../../services/operations/admin";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { category } = useSelector((state) => state.news);
  const [categories, setCategories] = useState([]);

  const handleDropdownToggle = (index, hasSublinks) => {
    if (hasSublinks) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchCategory();

        // Filter out the "राज्य" category
        const filteredCategories =
          categoriesData?.categories.filter(
            (cat) => cat.name.trim() !== "राज्य"
          ) || [];

        reorderCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (category.length !== 0) {
      // Filter out the "राज्य" category from existing data
      const filteredCategories = category.filter(
        (cat) => cat.name.trim() !== "राज्य"
      );

      reorderCategories(filteredCategories);
    } else {
      fetchCategories();
    }
  }, [category]);

  const reorderCategories = (categoriesList) => {
    const fixedOrder = ["विदेश", "देश", "मनोरंजन", "खेल"];
    const orderedCategories = fixedOrder
      .map((fixedCat) =>
        categoriesList.find((cat) => cat.name.trim() === fixedCat)
      )
      .filter(Boolean);

    const remainingCategories = categoriesList.filter(
      (cat) => !fixedOrder.includes(cat.name.trim())
    );

    setCategories([...orderedCategories, ...remainingCategories]);
  };

  return (
    <nav className="bg-black lg:bg-[#AE1416]">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex">
          <Link to="/" className="text-white lg:mr-3">
            <FaHome size={22} />
          </Link>
          <div className="hidden lg:flex lg:mt-[2px]">
            {categories.map((link, index) => (
              <div key={index} className="group relative z-50">
                <Link
                  to={`/category/${link?._id}`}
                  className="text-white hover:bg-gray-100 text-[16px] font-bold hover:text-black px-3 py-4"
                  onClick={handleLinkClick}
                >
                  {link?.name}
                </Link>
                {link?.subCategories && link?.subCategories?.length > 0 && (
                  <div className="absolute left-0 top-8 text-[16px] font-bold bg-white text-black py-2 w-32 hidden group-hover:block text-start">
                    {link?.subCategories.map((sublink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`/subcategory/${sublink?._id}`}
                        className="block text-black hover:bg-red-100 hover:text-black px-3 py-2"
                        onClick={handleLinkClick}
                      >
                        {sublink?.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="text-white bg-gray-200 rounded-md p-2"
          >
            <FaSearch className="text-black" />
          </button>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <FaBars size={24} />
            </button>
          </div>

          <SearchBox isOpen={isSearchOpen} toggleSearch={toggleSearch} />
        </div>
      </div>

      {/* Sidebar for Small Devices */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 bg-black">
          <div className="text-white text-2xl font-bold">दिव्य निर्भर</div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4 space-y-2">
          {categories.map((link, index) => (
            <div key={index} className="border-b border-gray-200">
              <div
                className="flex justify-between items-center text-black cursor-pointer"
                onClick={() => handleDropdownToggle(index, link.subCategories)}
              >
                <Link
                  to={`/category/${link?._id}`}
                  className="text-xl font-semibold"
                  onClick={handleLinkClick}
                >
                  {link?.name}
                </Link>
                {link.subCategories && link?.subCategories?.length > 0 && (
                  <>
                    {openDropdown === index ? (
                      <AiOutlineMinus className="text-black text-2xl" />
                    ) : (
                      <AiOutlinePlus className="text-black text-2xl" />
                    )}
                  </>
                )}
              </div>
              {openDropdown === index && link.subCategories && (
                <div className="pl-4">
                  {link.subCategories.map((sublink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`/subcategory/${sublink?._id}`}
                      className="block text-black py-1"
                      onClick={handleLinkClick}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
