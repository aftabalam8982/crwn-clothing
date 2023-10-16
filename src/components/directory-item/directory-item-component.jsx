import React from "react";
import "./directory-item-styles.scss";
import { Link } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;
  return (
    <div className="directory-item-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <Link to={`shop/${title}`} className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default DirectoryItem;
