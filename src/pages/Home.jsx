import React from "react";
import { banners, icons } from "../assets";
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <div className="container m-auto">
        <div className="container flex flex-col items-center sm:flex-row justify-evenly p-2 mt-5 w-full">
          <div className="w-2/3 md:w-1/2">
            <p className="text-4xl font-semibold p-2">
              Interactive live polling
            </p>
            <p className=" p-2">
              Mentimeter gives you the power to design a wide variety of interactive polls. Polling your audience can be the most effective way to increase engagement and make a presentation dynamic and memorable.
            </p>

            <Link to={'/login'}>
              <button type="button" className="py-2 px-4 mt-5 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Create
              </button>
            </Link>


          </div>
          <div className="h-[20rem]">
            <video playsInline src="//videos.ctfassets.net/rvt0uslu5yqp/7MrcvEuf6K6OlURKX3QJyG/8d41a1b2e4805a3e4c8b482f84c1b11a/Features_Polling_small.mp4" className="w-full h-full"></video>
          </div>
        </div>

        <div className="container my-3 bg-slate-100 p-4 rounded-lg md:items-start items-center justify-center flex flex-col">
          <div className="w-2/3 md:w-1/2">
            <p className="text-4xl font-semibold p-2">
              Create polls in no time
            </p>
            <p className=" p-2">No matter how complex the questions or how numerous the options are, our polls are quick and easy to build. Responses from your audience will appear in real-time as dynamic visualizations.</p>
          </div>
          <div className="flex sm:flex-row flex-col justify-evenly mt-2 items-center gap-4 w-full">
            <div>
              <img src={icons.icon1} className="h-[10rem]" alt="icon" />
              <p className="font-semibold max-w-[10rem] text-center mt-1">
                Ask Multiple Choice questions
              </p>
            </div>
            <div>
              <img src={icons.icon2} className="h-[10rem]" alt="icon" />
              <p className="font-semibold max-w-[10rem] text-center mt-1">
                Try Innovative visualizations
              </p>
            </div>
            <div>
              <img src={icons.icon3} className="h-[10rem]" alt="icon" />
              <p className="font-semibold max-w-[10rem] text-center mt-1">
                Add Images as options
              </p>
            </div>
            <div>
              <img src={icons.icon4} className="h-[10rem]" alt="icon" />
              <p className="font-semibold max-w-[10rem] text-center mt-1">
                See Trends with segmentations
              </p>
            </div>
          </div>
        </div>

        <div className="container my-6 flex sm:flex-row flex-col gap-2">
          <div className="h-full w-full max-h-[30rem]">
            <img src={banners.banner1} className="w-full h-full" alt="banner" />
          </div>
          <div className="container flex flex-col justify-center text-start p-2 mt-5 w-full">
            <p className="text-4xl font-semibold p-2">
              Word clouds
            </p>
            <p className="p-2">
              Create word clouds that highlight the most popular responses. Use this question type in the classroom, in meetings, or in trainings to gather audience input and to wow them with impressive visuals.
            </p>
          </div>
        </div>

        <div className="container my-6 flex flex-col sm:flex-row-reverse gap-2">
          <div className="h-full w-full max-h-[30rem]">
            <img src={banners.banner2} className="w-full h-full" alt="banner" />
          </div>
          <div className="container flex flex-col justify-center text-start p-2 mt-5 w-full">
            <p className="text-4xl font-semibold p-2">
              Multiple choice polls
            </p>
            <p className="p-2">
              Collects answers, thoughts, opinions, and data with simple multiple choice questions. Use them in a live setting or as part of a survey to hear what your audience has to say. Add images and GIFs to your questions for an extra element of engagement.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
