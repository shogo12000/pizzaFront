import PizzaCard from "../components/PizzaCard";
import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";

export default function SpecialsPizza() {
  const {  objPizza } = useContext(PizzaContext);

  return (
    <>
      <h1>Special Pizza</h1>
      <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {objPizza.Special.map((e) => {
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
