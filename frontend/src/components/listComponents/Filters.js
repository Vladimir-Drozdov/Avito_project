import React, { useEffect, useState } from "react";
import axios from "axios";

function Filters({ filters, setFilters }) {
  const [statusOptions, setStatusOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/ads");
        const ads = res.data.ads || [];
        const statuses = [...new Set(ads.map(ad => ad.status))];
        setStatusOptions(statuses);
        const categories = [...new Map(
          ads.map(ad => [ad.categoryId, { id: ad.categoryId, name: ad.category }])
        ).values()];
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Ошибка при загрузке фильтров:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value, page: 1 });
  };

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    let newStatus = [...filters.status];
    if (checked) {
      newStatus.push(value);
    } else {
      newStatus = newStatus.filter(s => s !== value);
    }
    setFilters({ ...filters, status: newStatus, page: 1 });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, categoryId: value ? Number(value) : null, page: 1 });
  };

  const resetFilters = () => {
    setFilters({
      status: [],
      categoryId: null,
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
      limit: 10,
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder="Поиск по названию"
        style={{margin: "5px"}}
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleInputChange}
        placeholder="Мин. цена"
        style={{margin: "5px"}}
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleInputChange}
        placeholder="Макс. цена"
        style={{margin: "5px"}}
      />

      <div style={{ marginTop: "10px" }}>
        <strong>Статус:</strong>
        {statusOptions.map(status => (
          <label key={status} style={{ marginLeft: "10px", display: "inline-flex", alignItems: "center" }}>
            <input
              type="checkbox"
              value={status}
              checked={filters.status.includes(status)}
              onChange={handleStatusChange}
              style={{ marginRight: "3px" }}
            />
            {status}
          </label>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <strong style={{margin: "5px"}}>Категория:</strong>
        <select value={filters.categoryId || ""} onChange={handleCategoryChange}>
          <option value="">Все</option>
          {categoryOptions.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>     
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value, page: 1 })}
        style={{margin:"5px", marginLeft:"2.5px"}}
      >
        <option value="createdAt">Дата создания</option>
        <option value="price">Цена</option>
        <option value="priority">Приоритет</option>
      </select>

      <select
        name="sortOrder"
        value={filters.sortOrder}
        onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value, page: 1 })}
        style={{margin:"5px", marginLeft:"2.5px"}}
      >
        <option value="desc">По убыванию</option>
        <option value="asc">По возрастанию</option>
      </select>
      <button onClick={resetFilters} style={{ marginTop: "10px" }}>
        Сбросить фильтры
      </button>

    </div>
  );
}

export default Filters;
