import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import BarGraph from "../components/BarGraph";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "../redux/features/loaderSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { firebaseAddPollInCollection } from "../firebase/functions";

function Preview(props) {
  const { pollInfo, question } = props;
  return (
    <div className="bg-indigo-100 rounded-xl grow p-5 h-[85vh] max-w-[50%] overflow-y-hidden">
      <p className="font-semibold text-2xl py-3 ">
        {question || "what is your age"}?
      </p>
      <BarGraph pollInfo={pollInfo} />
    </div>
  );
}

function Modifications(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.user);

  const { pollInfo, setPollInfo, question, setQuestion } = props;

  const addOption = () => {
    setPollInfo((prev) => {
      const index = pollInfo.length;
      return [
        ...prev,
        {
          label: `Option ${index + 1}`,
          data: [
            {
              name: "",
              likes: 0,
            },
          ],
        },
      ];
    });
  };

  const deleteOption = (index) => {
    const temp = pollInfo.slice();
    temp.splice(index, 1);

    for (let i = index; i < temp.length; i++) temp[i].label = `Option ${i + 1}`;

    setPollInfo(temp);
  };

  const handleOptionValueChange = (e, key) => {
    const temp = [...pollInfo];
    temp[key] = {
      ...temp[key],
      data: [
        {
          name: e.target.value,
          likes: 0,
        },
      ],
    };
    setPollInfo(temp);
  };

  const handleSavePoll = async () => {
    dispatch(updateLoading(true));
    firebaseAddPollInCollection({
      question,
      pollInfo,
      userId: userDetails.userId,
      users: [],
    })
      .then((res) => {
        console.log("poll save res: ", res);
        dispatch(updateLoading(false));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("poll save error: ", err);
        dispatch(updateLoading(false));
      });
  };

  return (
    <div className=" grow p-5 overflow-y-auto h-[85vh]">
      <div className="bg-gray-100 rounded-xl p-3">
        <p className="text-xl font-semibold my-2">Content</p>
        <p>
          <span className="font-semibold">Type:</span> Multiple Choice Question
        </p>
      </div>
      <div className="p-3">
        <div>
          <p className="font-semibold mb-1">Question</p>
          <input
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            id="rounded-email"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="What is your age"
            value={question || ""}
          />
        </div>
        <hr className="bg-gray-100 my-3" />
        <div>
          <p className="font-semibold mb-1">Options</p>
          <div>
            <div className="flex flex-col gap-2">
              {pollInfo.map((item, index) => {
                return (
                  <div className="flex relative flex-row-reverse" key={index}>
                    <span
                      onClick={() => deleteOption(index)}
                      className=" cursor-pointer rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
                    >
                      <MdOutlineCancel />
                    </span>
                    <input
                      onChange={(e) => handleOptionValueChange(e, index)}
                      type="text"
                      id="rounded-email"
                      className="rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={item.data[0].name}
                      name={item.label}
                      placeholder={item.label}
                    />
                  </div>
                );
              })}
            </div>

            <button
              onClick={addOption}
              type="button"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-pink-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full my-3"
            >
              Add Option
            </button>
          </div>
        </div>
        <hr className="bg-gray-100 my-3" />
        <div>
          <p className="font-semibold mb-3">Image</p>
          <label
            htmlFor="file-upload"
            className="p-3 relative cursor-pointer bg-white rounded-md font-medium border border-gray-300 hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
          >
            <span className="inline-block py-2 px-4 rounded-md text-sm leading-5 font-medium text-gray-700">
              Choose a file
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </div>

        <button
          onClick={handleSavePoll}
          type="button"
          className="py-2 px-4 mt-6 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function CreatePolls() {
  const loading = useSelector((store) => store.loading.value);

  //   [
  //     {
  //         label: 'Option 1',
  //         data: [
  //             {
  //                 name: 'Option 1',
  //                 likes: 230,
  //             }
  //         ],
  //     },
  //     {
  //         label: 'Option 2',
  //         data: [
  //             {
  //                 name: 'Option 2',
  //                 likes: 200,
  //             }
  //         ],
  //     },
  // ]

  const [pollInfo, setPollInfo] = useState([]);
  const [question, setQuestion] = useState("What is your age?");

  return loading ? (
    <Loader />
  ) : (
    <div className="container m-auto flex w-full">
      <Preview pollInfo={pollInfo} question={question} />
      <Modifications
        pollInfo={pollInfo}
        setPollInfo={setPollInfo}
        question={question}
        setQuestion={setQuestion}
      />
    </div>
  );
}

export default CreatePolls;
