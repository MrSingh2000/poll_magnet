import React from "react";

function Home() {
  return (
    <>
      <div className="container m-auto">
        <div className="container flex justify-evenly p-2 mt-5 w-full">
          <div className="w-1/2">
            <p className="text-4xl font-semibold">
              Interactive live polling
            </p>
            <p className="">
              Mentimeter gives you the power to design a wide variety of interactive polls. Polling your audience can be the most effective way to increase engagement and make a presentation dynamic and memorable.
            </p>

            <button type="button" class="py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
              Valider
            </button>

          </div>
          <div className="h-[20rem]">
            <video playsInline src="//videos.ctfassets.net/rvt0uslu5yqp/7MrcvEuf6K6OlURKX3QJyG/8d41a1b2e4805a3e4c8b482f84c1b11a/Features_Polling_small.mp4" className="w-full h-full"></video>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
