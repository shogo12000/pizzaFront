import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { Field } from "./Components";
import { useState } from "react";

export default function Registerum({ setLogin, setLoginForm }) {
  const [formField, setFormField] = useState({
    email: "",
    username: "",
    password: "",
  });
  return (
    <form className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h2>Register</h2>
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
        label={"username"}
        type={"text"}
        value={formField.username}
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
        onClick={() => console.log(formField)}
      >
        Register
      </Button>

      <span className="text-right" onClick={() => setLoginForm((e) => !e)}>
        Login
      </span>
    </form>
  );
}
