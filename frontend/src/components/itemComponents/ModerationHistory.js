function ModerationHistory({ history }) {
  if (!history?.length) return <p>История пуста</p>;

  return (
    <ul>
        {history.map((item, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
            <strong>{item.moderatorName}</strong> — {item.action}  
            <br />
            {new Date(item.timestamp).toLocaleString()}
            {item.comment && <p>Комментарий: {item.comment}</p>}
            </li>
        ))}
    </ul>
  );
}

export default ModerationHistory;
