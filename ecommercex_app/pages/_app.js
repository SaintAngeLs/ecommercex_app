import { CartContextProvider } from "@/components/CartContext";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
  body{
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #eee;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles/>
      <CartContextProvider>
        <Component {...pageProps} /> 
      </CartContextProvider>

    </>
  );
}
