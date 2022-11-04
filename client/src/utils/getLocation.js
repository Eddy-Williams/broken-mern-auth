import { useLocation } from "react-router-dom";

export function getUrl() {
  const location = useLocation();
  return location.pathname;
}