import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

export const handleLogout = async (setUserLoggedIn) => { 
 
  try {
    const response = await fetch("https://pizzabackend-t2rz.onrender.com/api/logout", {
      method: "POST",
      credentials: "include", // necessário para enviar o cookie
    });

    const data = await response.json();
 

    setUserLoggedIn(false);
 
  } catch (err) {
    console.error("Erro no logout:", err);
  }
};
