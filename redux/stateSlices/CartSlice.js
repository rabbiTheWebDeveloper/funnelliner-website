import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { useToast } from "../../hooks/useToast";

const showToast = useToast()
const initialState = {
  cartItems: Cookies.get('cartItems')
    ? JSON.parse(Cookies.get("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        // toast.info("Increased product quantity", {
        //   position: "top-right",
        // });
        showToast("Increased product quantity")
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        showToast("Product added to cart")
        // toast.success("Product added to cart", {
        //   position: "top-right",
        // });
      }
      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        // toast.info("Decreased product quantity", {
        //   position: "top-right",
        // });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        // toast.error("Product removed from cart", {
        //   position: "top-right",
        // });
      }

      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          // toast.error("Product removed from cart", {
          //   position: "top-right",
          // });
        }
        Cookies.set("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state?.cartItems?.reduce(
        (cartTotal, cartItem) => {
          const { discounted_price, cartQuantity } = cartItem;
          const productPrice = discounted_price;
          const itemTotal = productPrice * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      Cookies.set("cartItems", JSON.stringify(state.cartItems));

    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
