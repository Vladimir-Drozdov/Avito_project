import { Bar } from "react-chartjs-2";

function CategoryChart({ data = {} }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Количество",
            data: values,
            backgroundColor: "#4ade80",
            borderColor: "#166534",
            borderWidth: 1,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}

export default CategoryChart;
