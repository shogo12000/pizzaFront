import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PizzaSize from "./PizzaSize";
import { useState } from "react";
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";
import { v4 as uuidv4 } from "uuid";

export default function PizzaCard({ PizzaObj }) {
  const { cart, setCart } = useContext(PizzaContext);
  const myOrderNumber = uuidv4();
  const [myPizza, setMyPizza] = useState({
    id: PizzaObj.id,
    orderNumber: "",
    title: PizzaObj.title,
    pizzaSize: "",
    qty: "0",
    price: "",
    crust: "",
    instructions: "",
  });

  const btnAddPizzaCart = () => {
    if (myPizza.pizzaSize == "") {
      alert("Please Choose Pizza Size");
      return;
    }

    if (myPizza.qty === "0") {
      alert("Please Choose Pizza Quantity");
      return;
    }

    if (PizzaObj.category != "Salad") {
      if (myPizza.crust === "") {
        alert("Please chose Pizza Crust");
        return;
      }
    }

    console.log("MyOrderNumber");
    console.log(myOrderNumber);

    const updatedPizza = {
      ...myPizza,
      orderNumber: myOrderNumber,
    };

    console.log(updatedPizza);
    console.log(cart);
    setCart((e) => [...e, updatedPizza]);
  };

  const btnEditPizza = () => {
    console.log("EDIT PIZZA");
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ aspectRatio: "16 / 9" }}
        image={PizzaObj.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {PizzaObj.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <PizzaSize
        myPizza={myPizza}
        setMyPizza={setMyPizza}
        PizzaObj={PizzaObj}
      />

      <CardActions sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
        <Button
          onClick={btnEditPizza}
          sx={{ backgroundColor: "gray", color: "white", width: "100%" }}
        >
          EDIT
        </Button>
        <Button
          onClick={btnAddPizzaCart}
          sx={{ backgroundColor: "red", color: "white", width: "100%" }}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
}
