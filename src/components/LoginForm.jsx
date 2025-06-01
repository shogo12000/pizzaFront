import Registerum from "./Registerum";
import { useState } from "react";
import Login from "./Login";

export default function LoginForm({ setLogin }) {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="bg-amber-100 p-8 w-full max-w-[400px] rounded">
      {loginForm ? (
        <Login setLogin={setLogin} setLoginForm={setLoginForm} />
      ) : (
        <Registerum setLogin={setLogin} setLoginForm={setLoginForm} />
      )}
    </div>
  );
}
