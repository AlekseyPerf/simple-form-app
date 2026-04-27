import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useFormContext } from "../context/FormContext";

export const useCategories = () => {
  const { categories, setCategories } = useFormContext();
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      (async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://dummyjson.com/products/category-list",
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Ошибка загрузки категорий:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [setCategories]);

  return { categories, loading };
};
