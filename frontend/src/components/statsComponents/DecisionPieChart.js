import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DecisionPieChart({ data = {} }) {
  return (
    <Pie
      data={{
        labels: ["Одобрено", "Отклонено", "На доработку"],
        datasets: [
          {
            data: [
              data.approved ?? 0,
              data.rejected ?? 0,
              data.requestChanges ?? 0,
            ],
            backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
          },
        ],
      }}
    />
  );
}

export default DecisionPieChart;
