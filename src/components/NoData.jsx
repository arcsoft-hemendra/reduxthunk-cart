import React from "react";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { FiHome } from "react-icons/fi";

const NoData = ({ type }) => {
  useEffect(() => {
    if (type === "favourite") {
      const para = document.getElementsByTagName("p")[0];
      para.style.transform = "translate(-12%,0)";
    }
  });

  const typeCheck = {
    "favourite": <MdFavorite />,
    "cart": <AiOutlineShoppingCart />,
    "product": <FiHome />,
  };

  const typePara = {
    "favourite": "No Favourite items.",
    "cart": "No Items in Cart.",
    "product": "No products available.",
  };

  return (
    <div className="Nodata d-flex justify-content-center align-items-center">
      <div>
        {typeCheck[type]}
        <p>{typePara[type]}</p>
      </div>
    </div>
  );
};

export default NoData;
