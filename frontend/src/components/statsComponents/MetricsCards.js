function MetricsCards({ metrics }) {
  const cardStyle = {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    width: "220px",
    background: "#fafafa",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <div style={cardStyle}>
        <h3>Проверено сегодня</h3>
        <p>{metrics.totalReviewedToday}</p>
      </div>

      <div style={cardStyle}>
        <h3>За неделю</h3>
        <p>{metrics.totalReviewedThisWeek}</p>
      </div>

      <div style={cardStyle}>
        <h3>За месяц</h3>
        <p>{metrics.totalReviewedThisMonth}</p>
      </div>

      <div style={cardStyle}>
        <h3>Одобрено (%)</h3>
        <p>{metrics.approvedPercentage}%</p>
      </div>

      <div style={cardStyle}>
        <h3>Отклонено (%)</h3>
        <p>{metrics.rejectedPercentage}%</p>
      </div>

      <div style={cardStyle}>
        <h3>Среднее время проверки</h3>
        <p>{metrics.averageReviewTime} сек</p>
      </div>
    </div>
  );
}

export default MetricsCards;
