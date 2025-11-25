import React from "react";

function SellerInfo({ seller }) {
  if (!seller) return <p>Продавец неизвестен, подозрительно...</p>;

  return (
    <div>
      <p>Имя: {seller.name}</p>
      <p>Рейтинг: {seller.rating} ⭐</p>
      <p>Объявлений: {seller.adsCount}</p>
      <p>Дата регистрации: {new Date(seller.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default SellerInfo;
