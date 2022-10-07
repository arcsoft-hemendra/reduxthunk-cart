import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { conditionType } from "../redux/slicefunc/Product";
import { getProducts } from "./../redux/slicefunc/Product";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slicefunc/Cart";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFilterLeft } from "react-icons/bs";
import { addRemoveFavourite } from "../redux/slicefunc/Favourite";
import Products from "./../utils/Products.json";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  let productData = useSelector((state) => state.products.products);
  const condition = useSelector((state) => state.products.condition);
  const selector = useSelector((state) => state.cart);
  const favouriteItem = useSelector((state) => state.favourite);
  const [filterRange, setFilterRange] = useState(500);
  const [searchItem, setSearchItem] = useState("");
  const [filterDiv, setFilterDiv] = useState(false);

  useEffect(() => {
    // dispatch(getProducts());
    if(productData.length === 0){
      dispatch(getProducts(Products));
    }
  }, []);

  if (condition === conditionType.loading) {
    return "Loading";
  }

  if (condition === conditionType.error) {
    return "Oops Something went wrong";
  }

  const handleCart = (e, product) => {
    e.preventDefault();
    const cartItem = selector.find((item) => item.id === product.id);
    if (cartItem) {
      alert("Product already in Cart");
    } else {
      dispatch(add(product));
      // alert("Item added to Cart")
    }
  };

  const handleFavourite = (e, id) => {
    e.preventDefault();
    dispatch(addRemoveFavourite(id));
  };

  const handleFilter = (e, type) => {
    if (type === "searchBox") {
      setSearchItem(e.target.value);
    } else {
      setFilterRange(e.target.value);
    }
  };

  return (
    <Container>
      <div className="fs-3 my-3 filter-product">
        <div onClick={() => setFilterDiv(!filterDiv)} className="filter-icon">
          <BsFilterLeft />
        </div>
        <div className="mx-4">Products</div>
        <div>
          <Form.Control
            type="search"
            placeholder="Search"
            className=""
            aria-label="Search"
            value={searchItem}
            onChange={(e) => handleFilter(e, "searchBox")}
          />
        </div>
        {filterDiv && (
          <div className="main-range">
            Filter
            <div className="">
              <span className="span-intial-range">{0}</span>
              <span className="mx-3">
                <input
                  id="range"
                  value={filterRange}
                  onChange={handleFilter}
                  min={0}
                  max={999}
                  type="range"
                />
              </span>
              <span className="filter-range">{filterRange}</span>
            </div>
          </div>
        )}
      </div>
      <div className="main-products mb-5">
        {productData
          .filter(
            (item) =>
              item.price < filterRange &&
              item.title.toLowerCase().includes(searchItem.toLowerCase())
          )
          .map((item, i) => (
            <Link to={`/${item.id}`} key={i}>
              <Card>
                <div className="main-img-div">
                  <Card.Img variant="top" src={item.image} />
                </div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="text-uppercase">
                    Category : {item.category}
                  </ListGroup.Item>
                  <ListGroup.Item>Price : {item.price}</ListGroup.Item>
                  <ListGroup.Item>Rating : {item.rating.rate}</ListGroup.Item>
                </ListGroup>
                <div className="button-heart">
                  <Button
                    className="btn btn-dark"
                    onClick={(e) => handleCart(e, item)}
                  >
                    Add to Cart
                  </Button>

                  <div onClick={(e) => handleFavourite(e, item.id)}>
                    {favouriteItem.includes(item.id) ? (
                      <AiFillHeart fill="red" />
                    ) : (
                      <AiOutlineHeart fill="red" />
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default Body;
