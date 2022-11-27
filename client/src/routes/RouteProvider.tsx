import { Route, Routes } from "react-router-dom";
import { routeMap } from "./routeMap";

export const RouteProvider: React.FC = () => {
  return (
    <>
      <Routes>
        {routeMap.map( ( route ) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.component />}
            children={ route.children }
          />
        ))}
      </Routes>
    </>
  );
};
