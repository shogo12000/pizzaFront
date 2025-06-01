import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState, useEffect } from "react";
import { PizzaContext } from "../context/PizzaContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginForm from "./LoginForm";
import { handleLogout } from "./AllFunctions";

 

export default function NavBar() {
  const { cart, userLoggedIn, setUserLoggedIn } = useContext(PizzaContext);
  const [login, setLogin] = useState(false);



  useEffect(() => {
    if (login) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [login]);

  return (
    <>
      <div
        className={`absolute flex items-center justify-center bg-black/80 w-screen h-screen left-0 right-0 bottom-0 z-[120] transition-all duration-500 ${
          login ? "top-0" : "top-[-100%]"
        }`}
      >
        <LoginForm setLogin={setLogin} />
      </div>

      <div className="relative w-full px-3 py-5 flex justify-between items-center bg-amber-100 z-100">
        <ul className="flex gap-3 font-medium w-full bg-amber-100  ">
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Menu">Menu</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>Special</li>
          <li>Contact</li>
        </ul>
        { !userLoggedIn.logged ? (
          <span
            className="flex  gap-1 pr-10 font-semibold"
            onClick={() => setLogin((e) => !e)}
          >
            <AccountCircleOutlinedIcon />
            Login
          </span>
        ) : (
          <span className="flex  gap-1 pr-10 font-semibold">
            {userLoggedIn.username}
            <LogoutIcon onClick={()=>handleLogout(setUserLoggedIn)}/>            
          </span>
        )}
        <span className="text-[12px] font-bold text-green-600">
          {cart.length}
        </span>{" "}
        <Link to="/Cart">
          <ShoppingCartIcon fontSize="small" />
        </Link>
      </div>
    </>
  );
}
