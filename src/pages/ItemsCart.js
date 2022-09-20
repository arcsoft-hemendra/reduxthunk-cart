import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { increment, remove, decrement } from "../redux/slicefunc/Cart";
import NoData from "../components/NoData";

const ItemsCart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const totalCost = data.reduce((p, c) => p + c.price * c.quantity, 0);

  useEffect(() => {
    const scroller = () => {
      if (window.scrollY > 50) {
        let div = document.getElementsByClassName("main-items-heading")[0];
        div.style.color = "white";
        div.style.backgroundColor = "#212529";
      } else {
        let div = document.getElementsByClassName("main-items-heading")[0];
        div.style.color = "#212529";
        div.style.backgroundColor = "white";
      }
    };
    window.addEventListener("scroll", scroller);
    return () => {
      window.removeEventListener("scroll", scroller);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const removeItem = (id) => {
    dispatch(remove(id));
    alert("Item removed from cart");
  };

  const incrementItem = (id) => {
    dispatch(increment(id));
  };

  const decrementItem = (id) => {
    dispatch(decrement(id));
  };

  return (
    <>
      <Header />
      {data && data.length > 0 ? (
        <>
          <Container className="my-5 main-container">
            <>
              <div className="main-items-heading">
                <p>Image</p>
                <p>Title</p>
                <p>Price</p>
                <p>Numbers</p>
                <p>Actions</p>
              </div>
            </>
          </Container>
          <Container className="my-5">
            {data.map((item, i) => (
              <>
                <div className="main-items" key={i}>
                  <div className="image-div">
                    <img src={item.image} alt="cart-items" />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="button-div">
                    <button onClick={() => decrementItem(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => incrementItem(item.id)}>+</button>
                  </div>
                  <div
                    className="removebtn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Button>Remove</Button>
                  </div>
                </div>
                <hr />
              </>
            ))}
            <div className="total-item">
              <p>Total: ${totalCost.toFixed(2)}</p>
            </div>
          </Container>
        </>
      ) : (
        <NoData type="cart" />
      )}
    </>
  );
};

export default ItemsCart;
