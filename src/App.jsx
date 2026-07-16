import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouters from "./routes/AppRouters";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouters />
    </BrowserRouter>
  );
}
