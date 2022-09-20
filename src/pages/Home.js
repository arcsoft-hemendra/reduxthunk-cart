import React, { lazy } from "react";
const Header = lazy(() => import("./../components/Header"));
const Body = lazy(() => import("./../components/Body"));

const Home = () => {
  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
};

export default Home;
