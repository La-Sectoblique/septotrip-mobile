import { useState } from "react";
import { Route } from "../type_tmp";

export default function useRoutes(): [Route[], (ar0: Route) => void, (ar0: Route) => void] {

  const [routes, setRoutes] = useState([] as Route[]);

  const addRoute = (route: Route) => {
    setRoutes(((old: Route[]) => [...old, route]))
  };

  const removeRoute = (route: Route) => {
    setRoutes(routes.filter((item) => item != route));
  };

  return [routes, addRoute, removeRoute];
}