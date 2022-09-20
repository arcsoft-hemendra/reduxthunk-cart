import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleItem } from "../redux/slicefunc/Product";
import { Button, Container } from "react-bootstrap";
// import ReactImageMagnify from "react-image-magnify";
import StarRatings from "react-star-ratings";

const SingleItem = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.products);
  const singleData = useSelector((state) => state.products.singleItem);
  const [star, setStar] = useState(singleData?.rating?.rate);

  useEffect(() => {
    if (productsData.length > 0) {
      dispatch(singleItem(params.id));
    }
  });

  const { title, price, description, category, image, rating } = singleData;

  const imageProps = {
    smallImage: {
      alt: "Phasellus laoreet",
      isFluidWidth: true,
      src: image,
    },
    largeImage: {
      src: image,
      width: 1100,
      height: 1500,
    },
  };

  const changeRating = (data) => {
    setStar(data);
  };

  return (
    <>
      <Header />
      <Container>
        <div className="single-main-div">
          <div className="single-image-div">
            {/* <ReactImageMagnify {...imageProps} /> */}
            <img src={image} />
            <div className="single-button-div">
              <Button>Add to Favourite</Button>
              <Button className="btn btn-success">Add to Cart</Button>
            </div>
          </div>
          <div className="single-content-div">
            <p>Title : {title}</p>
            <div className="rating-div">
              <div>Rating : </div>
              <StarRatings
                rating={star}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="40px"
                starHoverColor="yellow"
              />
            </div>
            <p>Price : {price}</p>
            <p>Description : {description}</p>
            <p>Category : {category}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleItem;
