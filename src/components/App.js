import { Header } from "./Header/Header.js";
import { Banner } from "./Banner/Banner.js";
import { Display } from "./Display/Display.js"
import { Footer } from "./Footer/Footer.js";


export function App() {

  let display = {
    "productId": 1
  };

  return(
    `
      <link rel="stylesheet" href="../src/assets/boxicons-2.1.4/css/boxicons.min.css">
      <link rel="stylesheet" href="../src/css/index.css">
    `
    + Header()
    + Banner()
    + Display(display)
    + Footer()
  ); 
}