import { useState, createContext, useEffect } from "react";

export const PizzaContext = createContext();

export function PizzaFContext({ children }) {
  const [objPizza, setObjPizza] = useState({
    Special: [],
    Chicken: [],
    Beef: [],
    Salad: [],
  });

  const [cart, setCart] = useState([]);
 

  const [userLoggedIn, setUserLoggedIn] = useState({
    logged: false,
    email: "",
    username: "",
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(
        "cart",
        JSON.stringify({ value: cart, expire: Date.now() + 60 * 60 * 1000 })
      );
      console.log("SALVO LOCAL STORAGE");
    }

    console.log("LOCALSTORAGE");
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem("cart") !== null) {
      const storageCart = localStorage.getItem("cart");
      const item = JSON.parse(storageCart);

      if (Date.now() > item.expire) {
        localStorage.removeItem("cart");
      }

      setCart(item.value);
      console.log(item);
    }

    const getProducts = async () => {
      try {
        const res = await fetch("https://pizzabackend-t2rz.onrender.com/api/products", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json(); 

          const dataSpecialPizza = data.filter(
            (pizza) => pizza.special === true || pizza.Special === true
          );
          const chickenPizzas = data.filter((p) => p.category === "Chicken");
          const beefPizzas = data.filter((p) => p.category === "Beef");
          const Salad = data.filter((p) => p.category === "Salad");

          setObjPizza({
            Special: dataSpecialPizza,
            Chicken: chickenPizzas,
            Beef: beefPizzas,
            Salad: Salad,
          });
        }
      } catch (err) {
        console.error("Erro ao verificar login:", err);
      }
    };

    getProducts();

    console.log("USECONTEXT");
    //TEM Q FAZER O BACKEND PARA PEGAR TODAS AS PIZZAS!!!!!!

    const checkLogin = async () => {
      try {
        const res = await fetch("https://pizzabackend-t2rz.onrender.com/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUserLoggedIn((e) => ({
            ...e,
            logged: true,
            email: data.user.email,
            username: data.user.username,
          }));
        }
      } catch (err) {
        console.error("Erro ao verificar login:", err);
      }
    };

    checkLogin();
  }, []);

  return (
    <PizzaContext.Provider
      value={{ objPizza, cart, setCart, userLoggedIn, setUserLoggedIn }}
    >
      {children}
    </PizzaContext.Provider>
  );
}

// const dbPizza = [
//   {
//     id: 1,
//     title: "White Beef",
//     description:
//       "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
//     price: [
//       { size: "small", price: "19.00" },
//       { size: "medium", price: "19.00" },
//       { size: "large", price: "19.00" },
//       { size: "xlarge", price: "19.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     Special: false,
//     image:
//       "https://img.freepik.com/free-photo/mixed-ingredient-pizza-with-cheese-tomatoes_114579-3585.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 2,
//     title: "Spicy BBQ Beef",
//     description:
//       "Smoky BBQ sauce with tender beef strips, onions, and red chili for an extra kick.",
//     price: [
//       { size: "small", price: "20.00" },
//       { size: "medium", price: "22.50" },
//       { size: "large", price: "25.00" },
//       { size: "xlarge", price: "27.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 3,
//     title: "Garlic Mushroom Beef",
//     description:
//       "Juicy beef combined with garlic sautéed mushrooms and a creamy white sauce.",
//     price: [
//       { size: "small", price: "18.50" },
//       { size: "medium", price: "20.00" },
//       { size: "large", price: "22.00" },
//       { size: "xlarge", price: "24.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 4,
//     title: "Cheesy Pepper Beef",
//     description:
//       "Loaded with ground beef, bell peppers, and a double layer of mozzarella cheese.",
//     price: [
//       { size: "small", price: "19.50" },
//       { size: "medium", price: "21.50" },
//       { size: "large", price: "24.00" },
//       { size: "xlarge", price: "26.50" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/top-view-sausage-pizza-with-tomato-red-bell-pepper-cheese-top-view_140725-7089.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 5,
//     title: "Beef Lovers Deluxe",
//     description:
//       "The ultimate beef feast with steak strips, ground beef, bacon, and cheddar cheese.",
//     price: [
//       { size: "small", price: "21.00" },
//       { size: "medium", price: "23.50" },
//       { size: "large", price: "26.00" },
//       { size: "xlarge", price: "29.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/crispy-mixed-pizza-with-olives-sausage_140725-3095.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 6,
//     title: "Truffle Beef Delight",
//     description:
//       "Premium beef slices paired with a touch of truffle oil, caramelized onions, and parmesan flakes for a gourmet experience.",
//     price: [
//       { size: "small", price: "22.00" },
//       { size: "medium", price: "24.50" },
//       { size: "large", price: "27.00" },
//       { size: "xlarge", price: "30.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Beef",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/mix-pizza-table_140725-7404.jpg?ga=GA1.1.1275452407.1748386115&semt=ais_items_boosted&w=740",
//   },
//   {
//     id: 7,
//     title: "Spicy Buffalo Chicken",
//     description:
//       "Grilled chicken tossed in spicy buffalo sauce, topped with red onions and a drizzle of ranch.",
//     price: [
//       { size: "small", price: "18.00" },
//       { size: "medium", price: "20.00" },
//       { size: "large", price: "22.50" },
//       { size: "xlarge", price: "25.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Chicken",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/front-view-delicious-chicken-pizza_23-2148784936.jpg?w=740",
//   },
//   {
//     id: 8,
//     title: "Creamy Garlic Chicken",
//     description:
//       "Roasted chicken with creamy garlic sauce, mushrooms, and mozzarella on a golden crust.",
//     price: [
//       { size: "small", price: "17.50" },
//       { size: "medium", price: "19.50" },
//       { size: "large", price: "22.00" },
//       { size: "xlarge", price: "24.50" },
//     ],
//     crust: ["Regular Crust", "Pan Crust"],
//     category: "Chicken",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/pizza-with-tomatoes-chicken-cheese-board_140725-6101.jpg?w=740",
//   },
//   {
//     id: 9,
//     title: "BBQ Chicken Classic",
//     description:
//       "Tangy BBQ sauce base with grilled chicken, onions, and cheddar cheese for a smoky flavor.",
//     price: [
//       { size: "small", price: "18.50" },
//       { size: "medium", price: "21.00" },
//       { size: "large", price: "23.50" },
//       { size: "xlarge", price: "26.00" },
//     ],
//     crust: ["Thin Crust", "Stuffed Crust"],
//     category: "Chicken",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/top-view-pizza-with-chicken-mushrooms-tomatoes-cheese_140725-5701.jpg?w=740",
//   },
//   {
//     id: 10,
//     title: "Mediterranean Chicken",
//     description:
//       "Chicken breast with black olives, red onions, feta cheese, and a hint of oregano.",
//     price: [
//       { size: "small", price: "19.00" },
//       { size: "medium", price: "21.50" },
//       { size: "large", price: "24.00" },
//       { size: "xlarge", price: "27.00" },
//     ],
//     crust: ["Regular Crust", "Thin Crust"],
//     category: "Chicken",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/mediterranean-pizza-with-chicken-feta-olives_140725-5682.jpg?w=740",
//   },
//   {
//     id: 11,
//     title: "Chicken Alfredo",
//     description:
//       "Creamy Alfredo sauce layered with grilled chicken, spinach, and parmesan for a rich flavor.",
//     price: [
//       { size: "small", price: "20.00" },
//       { size: "medium", price: "22.00" },
//       { size: "large", price: "25.00" },
//       { size: "xlarge", price: "28.00" },
//     ],
//     crust: ["Pan Crust", "Stuffed Crust"],
//     category: "Chicken",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/side-view-pizza-with-chicken-mushrooms-cream_140725-6100.jpg?w=740",
//   },
//   {
//     id: 12,
//     title: "Sweet Chili Chicken",
//     description:
//       "A sweet and spicy combination of chili sauce, grilled chicken, pineapple, and green peppers.",
//     price: [
//       { size: "small", price: "18.00" },
//       { size: "medium", price: "20.50" },
//       { size: "large", price: "23.00" },
//       { size: "xlarge", price: "25.50" },
//     ],
//     crust: ["Regular Crust", "Thin Crust", "Pan Crust"],
//     category: "Chicken",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/pizza-with-chicken-pineapple-sweet-chili-sauce_140725-6095.jpg?w=740",
//   },

//   {
//     id: 101,
//     title: "Caesar Salad",
//     description:
//       "Fresh romaine lettuce tossed with Caesar dressing, croutons, and grated parmesan cheese.",
//     price: [
//       { size: "small", price: "8.00" },
//       { size: "medium", price: "10.00" },
//       { size: "large", price: "12.00" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/caesar-salad-with-chicken-croutons-parmesan_2829-18845.jpg?w=740",
//   },
//   {
//     id: 102,
//     title: "Greek Salad",
//     description:
//       "A refreshing mix of tomatoes, cucumbers, red onions, olives, and feta cheese, dressed in olive oil.",
//     price: [
//       { size: "small", price: "7.50" },
//       { size: "medium", price: "9.50" },
//       { size: "large", price: "11.50" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/greek-salad-with-feta-cheese-olives-tomatoes_2829-14469.jpg?w=740",
//   },
//   {
//     id: 103,
//     title: "Chicken Garden Salad",
//     description:
//       "Grilled chicken breast on a bed of mixed greens, cherry tomatoes, carrots, and cucumbers.",
//     price: [
//       { size: "small", price: "9.00" },
//       { size: "medium", price: "11.00" },
//       { size: "large", price: "13.00" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/chicken-salad-healthy-food-with-lettuce-tomatoes-cucumbers-wooden-bowl_1150-42399.jpg?w=740",
//   },
//   {
//     id: 104,
//     title: "Tuna Nicoise",
//     description:
//       "A classic French salad with seared tuna, green beans, potatoes, olives, and eggs.",
//     price: [
//       { size: "small", price: "10.00" },
//       { size: "medium", price: "12.00" },
//       { size: "large", price: "14.00" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/tuna-nicoise-salad-with-green-beans-olives-egg_114579-3062.jpg?w=740",
//   },
//   {
//     id: 105,
//     title: "Quinoa Avocado Salad",
//     description:
//       "Nutrient-packed salad with quinoa, avocado, cherry tomatoes, black beans, and lemon vinaigrette.",
//     price: [
//       { size: "small", price: "9.50" },
//       { size: "medium", price: "11.50" },
//       { size: "large", price: "13.50" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: false,
//     image:
//       "https://img.freepik.com/free-photo/quinoa-salad-with-vegetables_1339-120601.jpg?w=740",
//   },
//   {
//     id: 106,
//     title: "Asian Sesame Salad",
//     description:
//       "Crunchy lettuce, mandarin oranges, grilled chicken, wonton strips, and sesame-ginger dressing.",
//     price: [
//       { size: "small", price: "9.00" },
//       { size: "medium", price: "11.00" },
//       { size: "large", price: "13.00" },
//     ],
//     crust: [],
//     category: "Salad",
//     special: true,
//     image:
//       "https://img.freepik.com/free-photo/flat-lay-salad-bowl-table_23-2148782541.jpg?w=740",
//   },
// ];
