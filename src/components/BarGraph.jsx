import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "react-charts";
import ResizableBox from "./ResizableBox";

function BarGraph(props) {
  const { pollInfo } = props;
  // const data = [
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
  const [data, setData] = useState([
    {
      label: "Option 1",
      data: [
        {
          name: "Option 1",
          likes: 0,
          user: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    if (pollInfo[0]) setData(pollInfo);
  }, [pollInfo]);

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.name,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.likes,
        min: 0,
      },
    ],
    []
  );

  return (
    <>
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            initialHeight: 10,
          }}
        />
      </ResizableBox>
    </>
  );
}

export default BarGraph;
