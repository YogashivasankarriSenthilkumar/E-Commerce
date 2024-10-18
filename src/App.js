import React from 'react';
import './App.css';
import Main from './Components/Main/Main';
import Product from './Components/Product/product';
import PdpList from './Components/Product/PdpList';
import { CartProvider } from './Components/context/CartContext';
import Cart from './Components/context/Cart';
import Profile from "./Components/Profile/Profile";
import Signup from './Components/googlesignin/Signup';
import Register from './Components/googlesignin/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './i18n'; 
import { useTranslation } from 'react-i18next';
import { ScrollRestoration } from 'react-router-dom';
import SuccessPage from './Components/Product/success';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/products/:productName",
    element: <PdpList />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/success",
    element: <SuccessPage/>
  }
]);

function App() {
  const { t } = useTranslation();

  return (
    <CartProvider>
      <RouterProvider router={router}>
        <ScrollRestoration />
        <div className="App">
          {/* You can include any layout components or context providers here */}
        </div>
      </RouterProvider>
    </CartProvider>
  );
}

export default App;
