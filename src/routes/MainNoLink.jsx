import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
 

export default function MainNoLink() {
  return (
    <>
      <TopBar />
      <NavBar />
      <Outlet />
    </>
  );
}
