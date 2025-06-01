import { GoogleLogin } from "@react-oauth/google";

export default function FGoogleLogin({ setUserLoggedIn, setLogin }) {
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("USUARIO LOGADO COM SUCESSO GOOGLE");

    try {
      const res = await fetch("https://pizzabackend-t2rz.onrender.com/api/google", {
        method: "POST",
        credentials: "include", // <- necessário para enviar cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      console.log(res);
      console.log(data);
      if (res.ok) { 
        setUserLoggedIn((e) => ({
          ...e,
          logged: true,
          email: data.email,
          username: data.username,
        }));
        setLogin(false);
        // setUser(data.user);
      } else {
        alert("Erro ao logar: " + data.error);
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  };
  return (
    <div className="App" style={{ padding: 20 }}>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Erro no login")}
      />
    </div>
  );
}
