import React, { memo } from "react";

import "./style.scss";

const ErrorPage: React.FunctionComponent = memo(() => {
 return (
  <div className="error-page">
   <div className="error-page__section">
    <div className="error-page__code">404</div>
    <h1 className="error-page__title">Resource not found</h1>
   </div>
  </div>
 );
});

export default ErrorPage;
