import { useParams } from "react-router-dom";
import "./category.styles.scss";
import React, { Fragment, useEffect, useState } from "react";
import ProductCard from "../product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const loading = useSelector(selectCategoriesLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
