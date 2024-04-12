import { Header } from "../../components/Header/Header.js";
import { Banner } from "../../components/Banner/Banner.js";
import { Display } from "../../components/Display/Display.js"
import { Footer } from "../../components/Footer/Footer.js";


function App() {

  let display = {
    "productId": 1
  };

  return(
    `
      <link rel="stylesheet" href="/src/assets/boxicons-2.1.4/css/boxicons.min.css">
      <link rel="stylesheet" href="/src/css/index.css">
    `
    + Header()
    + Banner()
    + Display(display)
    + Footer()
  ); 
}

document.querySelector("#root").innerHTML = App();