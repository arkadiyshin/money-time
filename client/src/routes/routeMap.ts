import { PageNotFound  } from "../pages/PageNotFound";

export enum locations {
  ROOT = "/",
  SIGNUP = "/signup",
  LOGIN = "/login",

}

export interface RouteProps {
  path: locations;
  component: React.ComponentType;
  name?: string;
  description?: string;
  children?: React.ReactNode;
}

export const routeMap : RouteProps[] = [
  {
    path: locations.ROOT,
    component: PageNotFound,
    name: "Main",
    description: "Main",
    children: []
  }
]