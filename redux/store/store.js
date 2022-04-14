import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../reducers/cart.slice";
import { messageReducer } from "../reducers/message.slice";

const reducer = {
    cart: cartReducer,
    message: messageReducer,
}

const store = configureStore({
    reducer,
})

export default store
