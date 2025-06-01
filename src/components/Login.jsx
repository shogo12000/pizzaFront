import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { Field } from "./Components";
import { useState } from "react";
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";
import FGoogleLogin from "./GoogleLogin";

export default function Login({ setLogin, setLoginForm }) {
  const { setUserLoggedIn } = useContext(PizzaContext);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });

  const btnLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://pizzabackend-t2rz.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formField),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login error:", data.message);
        return;
      }

      console.log("Login successful:", data); // Aqui você pode guardar os dados no estado global ou local

      setUserLoggedIn((e) => ({
        ...e,
        logged: true,
        email: data.email,
        username: data.username,
      }));

      setLogin(false);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h2>Login</h2>
        <HighlightOffIcon
          className="float-right cursor-pointer hover:text-red-500 transition duration-1000"
          onClick={() => setLogin((e) => !e)}
        />
      </div>

      <Field
        label={"email"}
        type={"text"}
        value={formField.email}
        setFormField={setFormField}
      />

      <Field
        label={"password"}
        type={"password"}
        value={formField.password}
        setFormField={setFormField}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{
          fontWeight: "bold",
          backgroundColor: "green",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
        onClick={btnLogin}
      >
        Login
      </Button>

      <span className="text-right" onClick={() => setLoginForm((e) => !e)}>
        Register
      </span>

      <FGoogleLogin setUserLoggedIn={setUserLoggedIn} setLogin={setLogin}/>
    </form>
  );
}
