import React from "react";
import { BsWhatsapp } from "react-icons/bs";

function Whatsapp() {
  return (
    <div className="fixed bottom-20 right-5">
      <a
        href="https://wa.me/+918005922946"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 p-5 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <span className="text-2xl text-white">
          <BsWhatsapp />
        </span>
      </a>
    </div>
  );
}

export default Whatsapp;
