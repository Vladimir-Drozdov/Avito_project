import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ActivityChart({ data = [] }) {
  return (
    <Bar
      data={{
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: "Одобрено",
            data: data.map((d) => d.approved),
            backgroundColor: "#16a34a",
          },
          {
            label: "Отклонено",
            data: data.map((d) => d.rejected),
            backgroundColor: "#dc2626",
          },
          {
            label: "На доработку",
            data: data.map((d) => d.requestChanges),
            backgroundColor: "#f59e0b",
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}

export default ActivityChart;
