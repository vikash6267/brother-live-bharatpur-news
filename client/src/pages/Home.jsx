import React from "react";
import LatestNews from "../components/core/Home/LatestNews";
import CategoryWise from "../components/core/Home/CategoryWise";
import PolllAns from "./PollAns";
import AddSlideBar from "../components/core/Home/AddSlideBar";
import ButtomAdd from "../components/core/Home/ButtomAdd";

function Home() {
  return (
    <div className=" max-w-9xl p-4 lg:px-10 mx-auto">
      <LatestNews />
      <AddSlideBar />
      <br />
      <br />
      <CategoryWise />
      <ButtomAdd />
      {/* <PolllAns /> */}
    </div>
  );
}

export default Home;
