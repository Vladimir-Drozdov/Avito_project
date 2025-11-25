import { useEffect, useState } from "react";
import axios from "axios";
import MetricsCards from "../components/statsComponents/MetricsCards";
import ActivityChart from "../components/statsComponents/ActivityChart";
import DecisionPieChart from "../components/statsComponents/DecisionPieChart";
import CategoryChart from "../components/statsComponents/CategoryChart";

function StatsPage() {
  const [metrics, setMetrics] = useState(null);
  const [activity, setActivity] = useState([]);
  const [decisions, setDecisions] = useState(null);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [summary, activity, decisions, categories] = await Promise.all([
          axios.get("/api/v1/stats/summary"),
          axios.get("/api/v1/stats/chart/activity"),
          axios.get("/api/v1/stats/chart/decisions"),
          axios.get("/api/v1/stats/chart/categories"),
        ]);

        setMetrics(summary.data);
        setActivity(activity.data);
        setDecisions(decisions.data);
        setCategories(categories.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) return <p>Подождите...</p>;

  return (
    <div style={{ padding: "20px" }}>
        <h1>Статистика модератора</h1>

        <MetricsCards metrics={metrics} />

        <h2>Активность по дням</h2>
        <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}>
            <ActivityChart data={activity}/>
        </div>      

        <h2>Распределение решений</h2>
        <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}>
            <DecisionPieChart data={decisions} />
        </div>

        <h2>Категории проверенных объявлений</h2>
        <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}>
            <CategoryChart data={categories} />
        </div>
    </div>
  );
}

export default StatsPage;
