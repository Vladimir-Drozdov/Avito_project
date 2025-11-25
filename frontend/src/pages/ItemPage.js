import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/itemComponents/ImageGallery";
import CharacteristicsTable from "../components/itemComponents/CharacteristicsTable";
import SellerInfo from "../components/itemComponents/SellerInfo";
import ModerationHistory from "../components/itemComponents/ModerationHistory";
import ModeratorActions from "../components/itemComponents/ModeratorActions";
import styles from "./ItemPage.module.css"
function ItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`/api/v1/ads/${id}`);
        setAd(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  const API_BASE = "/api/v1";

  const approveItem = async (id) => {
    await fetch(`${API_BASE}/ads/${id}/approve`, { method: "POST" });
  };

  const rejectItem = async (id, reason, comment = "") => {
    await fetch(`${API_BASE}/ads/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, comment }),
    });
  };

  const requestChanges = async (id, reason, comment = "") => {
    await fetch(`${API_BASE}/ads/${id}/request-changes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, comment }),
    });
  };

  const goToPrev = () => {
    if (numericId > 1) navigate(`/item/${numericId - 1}`);
  };

  const goToNext = () => {
    navigate(`/item/${numericId + 1}`);
  };

  if (loading) return <p style={{ fontSize: "1.6vw" }}>Загружается...</p>;
  if (!ad) return <p style={{ fontSize: "1.6vw" }}>Объявление не найдено</p>;

  return (
    <div className={styles.itemPageContainer}
      style={{
        padding: "1.5vw",
        maxWidth: "95%",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/list")}
        style={{
          padding: "0.6vw 1vw",
          borderRadius: "0.6vw",
          marginBottom: "1vh",
          cursor: "pointer",
        }}
      >
        ← Назад к списку
      </button>

      <div
        style={{
          display: "flex",
          gap: "1vw",
          margin: "1vh 0",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={goToPrev}
          disabled={numericId <= 1}
          style={{
            flex: "1 1 45%",
            padding: "0.8vh 0",
            borderRadius: "0.6vw",
            cursor: numericId <= 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Предыдущее
        </button>
        <button
          onClick={goToNext}
          style={{
            flex: "1 1 45%",
            padding: "0.8vh 0",
            borderRadius: "0.6vw",
            cursor: "pointer",
          }}
        >
          Следующее →
        </button>
      </div>

      <h1 style={{margin: "1vh 0" }}>{ad.title}</h1>
      <p style={{margin: "0.5vh 0" }}>Цена: {ad.price} ₽</p>
      <p style={{margin: "0.3vh 0" }}>Категория: {ad.category}</p>
      <p style={{margin: "0.3vh 0" }}>Статус: {ad.status}</p>
      <p style={{margin: "0.3vh 0" }}>Приоритет: {ad.priority}</p>

      <ImageGallery images={ad.images} />      

      <h2 style={{margin: "1vh 0 0.5vh" }}>Описание</h2>
      <p>{ad.description}</p>

      <h2 style={{ margin: "1vh 0 0.5vh" }}>Характеристики</h2>
      <CharacteristicsTable characteristics={ad.characteristics} />

      <h2 style={{margin: "1vh 0 0.5vh" }}>Информация о продавце</h2>
      <SellerInfo seller={ad.seller} />

      <h2 style={{margin: "1vh 0 0.5vh" }}>История модерации</h2>
      <ModerationHistory history={ad.moderationHistory} />

      <h2 style={{margin: "1vh 0 0.5vh" }}>Действия модератора</h2>
      <ModeratorActions
        id={id}
        onApprove={() => approveItem(id)}
        onReject={(reason) => rejectItem(id, reason)}
        onSendBack={(reason) => requestChanges(id, reason)}
      />
    </div>
  );
}

export default ItemPage;
