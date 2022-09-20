import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorDiv d-flex justify-content-center align-items-center">
      <div>
        <p>No page present !</p>
        <Link to="/">
        <button className="btn btn-success m-auto d-block">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
