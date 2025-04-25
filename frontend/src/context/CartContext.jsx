/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useEffect } from "react";

// create context
export const CartContext = createContext();

// localStorage key
const CART_STORAGE_KEY = "nm-cart";

// action types
export const ACTIONS = {
  ADD_ITEM: "add-item",
  UPDATE_QUANTITY: "update-quantity",
  DELETE_ITEM: "delete-item",
  CLEAR_CART: "clear-cart",
};

// reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    }
    case ACTIONS.UPDATE_QUANTITY:
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case ACTIONS.DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case ACTIONS.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

// load cart data from localStorage
const getLocalStorageCart = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

// context provider
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getLocalStorageCart);

  // save cart to localStorage when cart data is modified
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
