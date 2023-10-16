import { Route, Routes } from "react-router-dom";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../../store/categories/categories.reducer";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const categoriesMap = async () => {
      dispatch(fetchCategoriesStart());

      try {
        const categoriesArray = await getCategoriesAndDocuments("categories");
        dispatch(fetchCategoriesSuccess(categoriesArray));
      } catch (error) {
        dispatch(fetchCategoriesFailed(error));
      }
    };
    categoriesMap();
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
