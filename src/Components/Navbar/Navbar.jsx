import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useCombobox } from "downshift";
import Fuse from "fuse.js";
import { casualData } from "../../assets/data/dummyData";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);
    }
  }, []);

  const fuse = new Fuse(casualData, {
    keys: ["name", "category"],
    includeScore: true,
    threshold: 0.3,
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const result = fuse.search(value);
    setFilteredItems(result.map((res) => res.item));
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    inputValue: searchQuery,
    items: filteredItems,
    onInputValueChange: ({ inputValue }) => {
      setSearchQuery(inputValue);
      const result = fuse.search(inputValue);
      setFilteredItems(result.map((res) => res.item));
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        const encodedProductName = selectedItem.name
          .toLowerCase()
          .replaceAll(" ", "-");
        navigate(`/products/${encodedProductName}`);
      }
    },
  });

  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div className="bg-black p-2 w-full">
        <h3 className="text-white text-2xl tracking-normal leading-none text-center">
          {isLoggedIn ? (
            t("happyShopping")
          ) : (
            <>
              {t("signInMessage")}
              <Link
                to="/signup"
                className="text-white font-bold underline ml-2"
              >
                {t("signInNow")}
              </Link>
            </>
          )}
        </h3>
      </div>
      <div className="flex justify-center items-center p-2">
        <a href="/">
          <img className="h-28 w-full mb-4" src={logo} alt="store" />
        </a>
        <div className="flex items-center space-x-4 ml-4 mb-6">
          <h4>
            <Link to="/products">{t("shop")}</Link>
          </h4>
          <h4>{t("onSale")}</h4>
          <h4>{t("newArrivals")}</h4>
          <h4>{t("brands")}</h4>
          <div className="relative ml-4">
            <input
              {...getInputProps({
                placeholder: t("searchPlaceholder"),
                className:
                  "border rounded-full pl-10 pr-20 py-1 bg-white text-gray-600 placeholder-gray-400 focus:border-2 focus:border-black focus:outline-none",
              })}
              onChange={handleInputChange}
            />
            <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />

            <ul
              {...getMenuProps()}
              className="absolute z-10 mt-1 bg-white border w-full max-h-60 overflow-y-auto"
            >
              {isOpen &&
                filteredItems.map((item, index) => (
                  <li
                    key={item.id}
                    {...getItemProps({
                      item,
                      index,
                      className: `p-2 cursor-pointer ${
                        highlightedIndex === index ? "bg-gray-300" : "bg-white"
                      }`,
                    })}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
          <Link to="/cart" className="ml-4 text-2xl">
            <FaShoppingCart />
          </Link>

          <div
            onClick={handleAccountClick}
            className="ml-4 text-2xl cursor-pointer"
          >
            <VscAccount />
          </div>
          <select
            className="ml-4 p-1 bg-gray-200 rounded"
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
