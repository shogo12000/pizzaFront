import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import Main from "./routes/Main.jsx";
import MainNoLink from "./routes/MainNoLink.jsx";
import SpecialsPizza from "./routes/SpecialsPizza.jsx";
import PageMain from "./routes/PageMain.jsx";
import Salad from "./routes/Salad.jsx";
import ChickenPizza from "./routes/ChickenPizza.jsx";
import Cart from "./routes/Cart.jsx";
import BeefPizza from "./routes/BeefPizza.jsx";
import { PizzaFContext } from "./context/PizzaContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="475376767328-soku8p9dl739un1ggshsnfijo5bjcc3m.apps.googleusercontent.com">
      <PizzaFContext>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="home" element={<MainNoLink />}>
              <Route index element={<PageMain />} />
            </Route>

            <Route path="menu" element={<Main />}>
              <Route index element={<SpecialsPizza />} />
              <Route path="chickenPizza" element={<ChickenPizza />} />
              <Route path="beefPizza" element={<BeefPizza />} />
              <Route path="salad" element={<Salad />} />
            </Route>

            <Route path="about" element={<MainNoLink />}>
              <Route index element={<About />} />
            </Route>

            <Route path="Cart" element={<MainNoLink />}>
              <Route index element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </PizzaFContext>
    </GoogleOAuthProvider>
  </StrictMode>
);
