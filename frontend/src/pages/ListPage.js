import { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../components/listComponents/Filters";
import AdsList from "../components/listComponents/AdsList";
import Pagination from "../components/listComponents/Pagination";

function ListPage() {
  const [ads, setAds] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
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

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/ads", {
          params: filters,
        });
        setAds(response.data.ads);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Ошибка при загрузке объявлений:", error);
      }
    };
    fetchAds();
  }, [filters]);

  return (
    <div>
      <h1>Список объявлений</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <AdsList ads={ads} />
      <Pagination pagination={pagination} setFilters={setFilters} filters={filters} />
    </div>
  );
}

export default ListPage;
