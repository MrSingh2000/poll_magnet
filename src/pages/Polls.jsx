import React, { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

function Preview(props) {
  return <div className="bg-red-200 grow p-5">Preview</div>;
}

function Modifications(props) {
  const { pollInfo, setPollInfo } = props;

  const [options, setOptions] = useState([
    {
      name: "Option 1",
      value: ""
    }
  ])

  const optionsblockRef = useRef(null);

  const addOption = () => {
    console.log('option added')
    setOptions((prev) => {
      const index = options.length;
      return [...prev, {
        name: `Option ${index + 1}`,
        value: ""
      }]
    })
  }

  const deleteOption = (index) => {
    const temp = options.slice();
    temp.splice(index, 1);

    for (let i = index; i < temp.length; i++)
      temp[i].name = `Option ${i + 1}`;

    setOptions(temp);
  }

  const handleOptionValueChange = (e, key) => {
    console.log("onchange: ", e.target.value);
    const temp = [...options];
    temp[key] = { ...temp[key], value: e.target.value };
    console.log("temp: ", temp)
    console.log("val: ", e.target.value)
    setOptions(temp);
  }

  return (
    <div className="bg-green-200 grow p-5">
      <div className="bg-gray-100 rounded-xl p-3">
        <p className="text-xl font-semibold my-2">Content</p>
        <p>
          <span className="font-semibold">Type:</span> Multiple Choice Question
        </p>
      </div>
      <div className="p-3">
        <div>
          <p className="font-semibold mb-1">Question</p>
          <input type="text" id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="What is your age" />
        </div>
        <hr className="bg-gray-100 my-3" />
        <div>
          <p className="font-semibold mb-1">Options</p>
          <div>
            <div className="flex flex-col gap-2" ref={optionsblockRef}>
              {
                options.map((item, index) => {
                  return (

                    <div class="flex relative flex-row-reverse" key={index}>
                      <span onClick={() => deleteOption(index)} class=" cursor-pointer rounded-r-md inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <MdOutlineCancel />
                      </span>
                      <input onChange={(e) => handleOptionValueChange(e, index)} type="text" id="rounded-email" className="rounded-l-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={item.value}
                        name={item.name}
                        placeholder={item.name} />
                    </div>
                    // <input key={index} type="text" id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder={item.name}
                    //   value={item.value}
                    //   name={item.name}
                    // />
                  )
                })
              }
            </div>

            <button onClick={addOption} type="button" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-pink-200 text-white w-fit transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full my-3">
              Add Option
            </button>

          </div>
        </div>
        <hr className="bg-gray-100 my-3" />
        <div>
          <p className="font-semibold mb-1">Image</p>
          <input type="file" />
        </div>
      </div>
    </div>
  );
}

function Polls() {
  const [pollInfo, setPollInfo] = useState({
    question: "",
    options: {},
  });

  return (
    <div className="container m-auto flex w-full">
      <Preview pollInfo={pollInfo} />
      <Modifications pollInfo={pollInfo} setPollInfo={setPollInfo} />
    </div>
  );
}

export default Polls;
