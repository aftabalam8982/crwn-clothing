import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

import React from "react";
import { useSelector } from "react-redux";
import { selectCategoriesLoading } from "../../store/categories/categories.selector";
import Spinner from "../spinner/spinner.component";

const CategoryPreview = ({ title, products }) => {
  const loading = useSelector(selectCategoriesLoading);
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {loading ? (
          <Spinner />
        ) : (
          products
            .filter((_, i) => i < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default CategoryPreview;
