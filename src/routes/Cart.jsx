import { useContext, useEffect, useState } from "react";
import { PizzaContext } from "../context/PizzaContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";

export default function Cart() {
  const { cart, setCart } = useContext(PizzaContext);
  const [totalPrice, setTotalPrice] = useState("");

  const btnDelItem = (e) => {
    if (cart.length === 1) {
      localStorage.removeItem("cart");
    }

    setCart((unit) =>
      unit.filter((item) => item.orderNumber !== e.orderNumber)
    );
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const qty = parseInt(item.qty);
      return acc + price * qty;
    }, 0);

    const formattedSubtotal = total.toFixed(2);
    setTotalPrice(formattedSubtotal);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center z-0">
        <h1 className="text-xl font-bold">Cart Empty</h1>
      </div>
    );
  }

  return (
    <div className="w-full  max-w-[1200px]  mx-auto my-5">
      <div className="w-full bg-gray-50">
        <div className="max-w-[350px] mx-auto">
          <div className="flex items-center gap-2  bg-gray-200 mx-auto p-2">
            <ShoppingCartIcon />
            <span className="font-bold">ITEMS ({cart.length})</span>
            <span className="font-bold pl-5">${totalPrice}</span>
          </div>
          <div className="px-5 bg-gray-200">
            <hr className="h-[1px] bg-gray-300 border-0 w-full" />
          </div>
          <div className="flex max-w-[350px] bg-gray-200 mx-auto p-2">
            <span className="flex-1 font-bold">Item</span>
            <span className="w-12 text-center ">Qty</span>
            <span className="w-16 text-right ">Cost</span>
          </div>
          <div className="px-5 bg-gray-200">
            <hr className="h-[1px] bg-gray-300 border-0 w-full" />
          </div>

          {cart.map((e, index) => {
            return (
              <div
                key={index}
                className="flex items-center max-w-[350px] bg-amber-50 mx-auto p-2"
              >
                <DeleteForeverIcon onClick={() => btnDelItem(e)} />
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold">{e.title}</span>
                  <span className="text-xs">
                    {e.pizzaSize} - {e.crust}
                  </span>
                </div>
                <span className="w-12 text-center ">{e.qty}</span>
                <span className="w-16 text-right ">
                  ${(parseFloat(e.price) * parseInt(e.qty)).toFixed(2)}
                </span>
              </div>
            );
          })}

          <div className="flex flex-col gap-2 items-center max-w-[350px] bg-gray-300 mx-auto p-2">
            <span className="w-full font-bold ">SUBTOTAL ${totalPrice}</span>
            <Button
              variant="contained"
              fullWidth
              sx={{
                fontWeight: "bold",
                backgroundColor: "#9b111e",
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
            <div className="flex justify-between gap-5">
              <div>
                <input
                  type="radio"
                  id="html"
                  name="fav_language"
                  value="HTML"
                />
                <label for="html">Pickup</label>
              </div>

              <div>
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label for="css">Delivery</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
