import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  const { pathname } = useLocation()
  return (
    props.isLoggedIn ? (
      Component ? <Component {...props} /> : null
    ) : (
      <Navigate to="/sign-in" state={{ backUrl: pathname }} />
    )
  )
}
