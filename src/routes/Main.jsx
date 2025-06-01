import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <TopBar />

      <NavBar />

      <div className="w-full max-w-[1200px]  mx-auto my-5">
        <div className="flex gap-5 items-start min-h-screen">
          <div className="w-[160px] bg-amber-300 sticky top-0 self-start  ">
            <ul>
              <li>
                <Link to="/menu">Specials</Link>
              </li>
              <li>
                <Link to="/menu/chickenPizza">Chicken</Link>
              </li>
              <li>
                <Link to="/menu/beefPizza">Beef</Link>
              </li>
              <li>
                <Link to="/menu/salad">Salad</Link>
              </li>
              <li>link1</li>
              <li>link1</li>
              <li>link1</li>
            </ul>
          </div>
          <div className="flex-1 bg-amber-50">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
