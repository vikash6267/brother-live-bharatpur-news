import React from "react";
import logo from "../../../assests/logo.jpg";
function LogoSpace() {
  return (
    <div className=" max-w-7xl p-4 mx-auto  ">
      <div className=" flex justify-center mb-8 ">
        <img src={logo} alt="" className="lg:max-h-[150px] max-h-[100px]" />
      </div>
    </div>
  );
}

export default LogoSpace;
