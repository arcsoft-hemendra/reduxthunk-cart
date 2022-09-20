import { configureStore } from "@reduxjs/toolkit";
import Favourite from "../slicefunc/Favourite";
import Product  from "../slicefunc/Product";
import Cart from './../slicefunc/Cart'

export const store = configureStore({
    reducer: {
        products:Product,
        cart:Cart,
        favourite:Favourite
    },
})