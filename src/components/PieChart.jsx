import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ pollStats }) {
  const data = {
    labels: ["Unique users", "Repeated users"],
    datasets: [
      {
        label: "# of users",
        data: [pollStats.uniqueUsers, pollStats.repeatedUsers],
        backgroundColor: ["#bde0fe", "#cdb4db"],
        borderColor: ["#5FACF0", "#9A5EBD"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[15rem] flex items-center justify-center">
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
