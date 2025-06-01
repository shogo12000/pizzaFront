export default function PizzaSize({ myPizza, setMyPizza, PizzaObj }) {
 
  return (
    <div className="flex flex-col gap-2 px-[16px] w-full bg-amber-100">
      <div className="flex w-full gap-2">
        <div className="flex flex-col flex-1">
          <h3>Size</h3>
          <select
            name="pizzaSize"
            id="pizzaSize"
            className="bg-white p-2 border-1 border-gray-400 h-10 rounded"
            onChange={(e) => {
              const [size, price] = e.target.value.split("-");

              setMyPizza((prev) => ({
                ...prev,
                pizzaSize: size,
                price: price,
              }));
            }}
            defaultValue="defaultValue"
          >
            <option value="defaultValue" disabled hidden>
              Select an Option
            </option>
            {PizzaObj.price.map((e, index) => {
              return (
                <option key={index} value={e.size + "-" + e.price}>
                  {e.size} - {e.price}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col w-[50px]">
          <h3>Qty:</h3>
          <input
            type="text"
            className="text-center  bg-white border-1 border-gray-400 h-10 rounded "
            value={myPizza.qty}
            onChange={(e) =>
              setMyPizza((prev) => ({ ...prev, qty: e.target.value }))
            }
          />
        </div>
      </div>

      { PizzaObj.crust.length > 0 && (
        <select
          name="selectCrust"
          id="selectCrust"
          className="bg-white p-2 border-1 border-gray-400 h-10 rounded w-full"
          onChange={(e) =>
            setMyPizza((prev) => ({
              ...prev,
              crust: e.target.value,
            }))
          }
        >
          <option value="Crust">Select Crust</option>
          {PizzaObj.crust.map((e, index)=>{
  
            return(
              <option key={index} value={e}>{e}</option>
            )
          })}
 
        </select>
      ) }
    </div>
  );
}
