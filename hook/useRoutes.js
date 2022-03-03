import { useState } from "react";

export default function useRoutes(initialRoutes) {

  const [routes, setRoutes] = useState(initialRoutes);

  const addRoute = (route) => {
    setRoutes(((old) => [...old, route]))
  };

  const removeRoute = (route) => {
    setRoutes(routes.filter((item) => item != route));
  };

  return [routes, addRoute, removeRoute];
}