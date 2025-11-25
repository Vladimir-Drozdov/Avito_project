function ImageGallery({ images }) {
  if (!images?.length) return <p>Картинок нет</p>;

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Фото ${i + 1}`}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      ))}
    </div>
  );
}

export default ImageGallery;
