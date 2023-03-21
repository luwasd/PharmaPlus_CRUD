import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return (
    <>
      <div className="container mt-5">
        <h1>404 Page Not Found</h1>
        <hr />
        <div className="alert alert-danger">
          {error.statusText || error.message}
        </div>
        <Link className="btn btn-primary w-100" to="/welcome">
          Back to home
        </Link>
      </div>
    </>
  );
};

export default NotFound;