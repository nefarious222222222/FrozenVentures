import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Sales",
      data: [15, 30, 80, 50, 20, 40, 100],
      backgroundColor: "cyan",
      borderColor: "black",
      borderWidth: 1,
    },
    {
      label: "Orders",
      data: [10, 40, 30, 50, 60, 20, 90],
      backgroundColor: "violet",
      borderColor: "black",
      borderWidth: 1,
    },
  ],
};

export const BarChart = () => {
  const options = {
    responsive: true,
  };

  return <Bar options={options} data={BarChartData}></Bar>;
};
