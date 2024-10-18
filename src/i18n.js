import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          happyShopping: "Happy Shopping!!!",
          signInMessage: "Sign In and get 20% off your first order.",
          signInNow: "Sign In Now",
          shop: "Shop",
          onSale: "On Sale",
          newArrivals: "New Arrivals",
          brands: "Brands",
          searchPlaceholder: "Search for products...",
        },
      },
      es: {
        translation: {
          happyShopping: "¡Feliz compra!",
          signInMessage: "Inicie sesión y obtenga un 20 % de descuento en su primer pedido.",
          signInNow: "Inicia sesión ahora",
          shop: "Tienda",
          onSale: "En venta",
          newArrivals: "Nuevas llegadas",
          brands: "Marcas",
          searchPlaceholder: "Buscar productos...",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
