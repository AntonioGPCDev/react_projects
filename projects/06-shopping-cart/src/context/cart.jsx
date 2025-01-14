/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useReducer } from "react"
import { cartReducer, cartInitialState } from "../reducers/cart.js"

// 1.Crear contexto
export const CartContext = createContext()


function useCartReducer() {

    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type:'ADD_TO_CART',
        paylaod: product
    })

    const removeFromCart = product => dispatch({
        type:'REMOVE_FROM_CART',
        paylaod: product
    })

    const clearCart = () => dispatch({ type:'CLEAR_CART'})

    return(state, addToCart, removeFromCart, clearCart)

}


// 2.Crear provider
//la dependecia de usar React Context es mínima
export function CartProvider ({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()
  
    return (
      <CartContext.Provider value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart
      }}
      >
        {children}
      </CartContext.Provider>
    )
  }