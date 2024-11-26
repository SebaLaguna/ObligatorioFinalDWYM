import React from "react";
import { Link } from "react-router-dom";
import "../../styles/NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="go-home-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
