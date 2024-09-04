import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assests/logo.jpg";
const Footer = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <footer className="bg-black text-white ">
      <div className="container mx-auto p-5 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-16 bg-white" />
        </div>

        {/* Slogan and Contact */}
        <p className="mb-4">
          BLB 24 News is the best news website. It provides news from many
          areas.
        </p>
        <p className="mb-4">
          Contact us:{" "}
          <a
            href="mailto:divyanirdhar@gmail.com"
            className="text-red-600 hover:underline"
          >
            blbnews@gmail.com
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://www.facebook.com/BLB24NEWS?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.youtube.com/@BLBNEWS24"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="mailto:Brotherlivebharatpur@gmail.com"
            className="text-blue-500"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://wa.me/+918005922946"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>

        {/* Bottom Links */}
        <div className="flex justify-center items-center py-4 border-t border-gray-600">
          <div className="flex space-x-4 text-sm">
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <span>|</span>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/disclaimer" className="hover:underline">
              Disclaimer
            </Link>
            <span>|</span>

            {token ? (
              <Link to="/admin/dashboard" className="hover:underline">
                Admin Login
              </Link>
            ) : (
              <Link to="/login" className="hover:underline">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black text-white text-center py-2 text-xs border-t border-gray-700">
        All Right Reserved. Designed and Developed by <br />
        <br />
        <a
          href="https://inextets.online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline"
        >
          Made
        </a>{" "}
        by - I Next Ets
      </div>
    </footer>
  );
};

export default Footer;
