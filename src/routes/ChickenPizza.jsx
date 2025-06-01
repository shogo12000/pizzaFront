import PizzaCard from "../components/PizzaCard";
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

export default function ChickenPizza() {
  const { pizza, objPizza } = useContext(PizzaContext);

  return (
    <>
      <h1>Chicken Pizza</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {objPizza.Chicken.map((e) => {
          return (
            <div key={e.id}>
              <PizzaCard PizzaObj={e} />
            </div>
          );
        })}
      </div>
    </>
  );
}
