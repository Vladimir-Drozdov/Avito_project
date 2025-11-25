import React from "react";
import { useNavigate } from "react-router-dom";

function AdCard({ ad }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "200px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/item/${ad.id}`)}
    >
      <img
        src={ad.images?.[0] || "https://via.placeholder.com/150"}
        alt={ad.title}
        style={{ width: "100%", height: "120px", objectFit: "cover" }}
      />
      <h3>{ad.title}</h3>
      <p>Цена: {ad.price} ₽</p>
      <p>Категория: {ad.category}</p>
      <p>Дата создания: {new Date(ad.createdAt).toLocaleDateString()} {new Date(ad.createdAt).toLocaleTimeString()}</p>
      <p>Статус: {ad.status}</p>
      <p>Приоритет: {ad.priority}</p>
    </div>
  );
}

export default AdCard;
