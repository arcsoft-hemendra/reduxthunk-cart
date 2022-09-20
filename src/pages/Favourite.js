import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { removeFavourite } from "../redux/slicefunc/Favourite";
import NoData from "../components/NoData";

const Favourite = () => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite);
  const products = useSelector((state) => state.products.products);

  const removeFavouriteItem = (id) => {
    dispatch(removeFavourite(id));
  };

  return (
    <>
      <Header />
      {favourite && favourite.length > 0 ? (
        <Container>
          <div className="fs-3 text-center my-3">Favourite</div>
          {products
            .filter((item) => favourite.includes(item.id))
            .map((item, i) => (
              <>
                <div className="main-items favourite-item" key={i}>
                  <div className="image-div">
                    <img src={item.image} alt="cart-items" />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div
                    className="favourite-heart"
                    onClick={() => removeFavouriteItem(item.id)}
                  >
                    <AiFillHeart fill="red" />
                  </div>
                </div>
                <hr />
              </>
            ))}
        </Container>
      ) : (
        <NoData type="favourite" />
      )}
    </>
  );
};

export default Favourite;
