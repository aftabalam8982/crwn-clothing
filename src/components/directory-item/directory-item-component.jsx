import React from "react";
import "./directory-item-styles.scss";

const DirectoryItem = ({ category }) => {
  const { id, imageUrl, title } = category;
  return (
    <div className="directory-container" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
